"use client";

import { useRef, useState } from "react";

export default function UploadZone({ onUploadComplete }: { onUploadComplete: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [lastAccount, setLastAccount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function uploadFile(file: File) {
    setProgress(0);
    setError(null);
    setLastAccount(null);

    try {
      const initRes = await fetch("/api/files/upload/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          mime_type: file.type || "application/octet-stream",
          size: file.size,
        }),
      });
      
      if (!initRes.ok) throw new Error("Init failed");
      const { upload_url, account_index } = await initRes.json();
      
      const CHUNK_SIZE = 5 * 1024 * 1024;
      let start = 0;
      let driveFileId: string | null = null;
      let thumbnailLink: string | null = null;
      
      if (file.size === 0) {
          const chunkRes = await fetch("/api/files/upload/chunk", {
              method: "PUT",
              headers: {
                  "X-Upload-Url": upload_url,
                  "Content-Range": `bytes */0`
              }
          });
          if (!chunkRes.ok) throw new Error("Chunk empty upload failed");
          const chunkData = await chunkRes.json();
          driveFileId = chunkData.result.id;
      } else {
          while (start < file.size) {
            const end = Math.min(start + CHUNK_SIZE, file.size);
            const chunk = file.slice(start, end);
            
            const chunkRes = await fetch("/api/files/upload/chunk", {
              method: "PUT",
              headers: {
                "X-Upload-Url": upload_url,
                "Content-Range": `bytes ${start}-${end - 1}/${file.size}`,
              },
              body: chunk,
            });
            
            if (!chunkRes.ok && chunkRes.status !== 308) {
               throw new Error("Chunk upload failed: " + chunkRes.status);
            }
            
            let chunkData = null;
            if (chunkRes.status !== 308) {
                chunkData = await chunkRes.json();
            } else {
                chunkData = { status: "incomplete" };
            }
            if (chunkData.status === "complete") {
               driveFileId = chunkData.result.id;
               thumbnailLink = chunkData.result.thumbnailLink ?? null;
            }
            
            start = end;
            setProgress(Math.round((start / file.size) * 100));
          }
      }
      
      if (!driveFileId) throw new Error("Upload did not complete securely");

      const completeRes = await fetch("/api/files/upload/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          mime_type: file.type || "application/octet-stream",
          size: file.size,
          account_index,
          drive_file_id: driveFileId,
          thumbnail_link: thumbnailLink,
        }),
      });
      
      if (!completeRes.ok) throw new Error("Complete failed");
      
      setLastAccount(account_index);
      setProgress(null);
      onUploadComplete();

    } catch (e) {
      console.error(e);
      setError("Upload failed. Please try again.");
      setProgress(null);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = "";
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => progress === null && inputRef.current?.click()}
      className={`relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
        dragging
          ? "border-orange-500/60 bg-orange-500/5"
          : "border-[#21212b] hover:border-[#2e2e3d] hover:bg-[#18181e]"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileInput}
      />

      {progress !== null ? (
        <div className="space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
            <svg className="h-6 w-6 animate-pulse text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <p className="text-sm text-[#8888a4]">Uploading… <span className="font-medium text-white">{progress}%</span></p>
          <div className="mx-auto h-1.5 w-48 overflow-hidden rounded-full bg-[#21212b]">
            <div
              className="h-full rounded-full bg-orange-500 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[#21212b] bg-[#1a1a21]">
            <svg className="h-6 w-6 text-[#555568]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-[#8888a4]">
              Drag & drop or <span className="font-medium text-orange-400">browse</span>
            </p>
            <p className="mt-1 text-xs text-[#555568]">Routed to the account with most free space</p>
          </div>
        </div>
      )}

      {lastAccount !== null && progress === null && (
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <p className="text-xs text-emerald-400">Uploaded to account #{lastAccount}</p>
        </div>
      )}
      {error && (
        <p className="mt-4 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
