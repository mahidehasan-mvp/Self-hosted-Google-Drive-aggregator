"""
Run this script to change your DrivePool dashboard PIN.
This safely updates the PIN without regenerating your database encryption keys,
which would otherwise cause you to lose access to your connected Google accounts.

Usage:
    python backend/scripts/change_pin.py
"""
import os
import sqlite3
import sys
import bcrypt

BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BACKEND_DIR, "drivepool.db")

def upsert(conn: sqlite3.Connection, key: str, value: str) -> None:
    conn.execute(
        "INSERT INTO app_config (key, value) VALUES (?, ?)"
        " ON CONFLICT(key) DO UPDATE SET value = excluded.value",
        (key, value),
    )
    conn.commit()

def main() -> None:
    if not os.path.exists(DB_PATH):
        print(f"Error: Database not found at {DB_PATH}.")
        print("Please run 'python backend/scripts/generate_secrets.py' first to initialize the database.")
        sys.exit(1)

    print("Change DrivePool Dashboard PIN\n")
    new_pin = input("Enter your NEW dashboard PIN: ").strip()
    
    if not new_pin:
        print("PIN cannot be empty. Aborted.")
        sys.exit(1)

    pin_hash = bcrypt.hashpw(new_pin.encode(), bcrypt.gensalt()).decode()

    conn = sqlite3.connect(DB_PATH)
    try:
        upsert(conn, "dashboard_pin_hash", pin_hash)
    finally:
        conn.close()

    print("\nSUCCESS: Dashboard PIN updated safely!")
    print("You can now log in using your new PIN.")

if __name__ == "__main__":
    main()
