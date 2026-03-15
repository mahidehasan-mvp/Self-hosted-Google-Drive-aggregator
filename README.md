# DrivePool — Self-Hosted Google Drive Aggregator

> **Multiply your free cloud storage. No subscriptions. No third-party servers. Your data stays in your own Google Drive accounts.**

DrivePool is a self-hosted web application that aggregates multiple free Google Drive accounts into a single, unified dashboard. Every upload automatically routes to the account with the most free space — giving you **N × 15 GB** of free storage with zero management overhead.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗂️ **Unified Dashboard** | One interface for all your Google Drive accounts |
| ⚡ **Smart Upload Routing** | Auto-routes each upload to the account with the most space |
| 📁 **Full Folder Navigation** | Hierarchical browsing, breadcrumbs, grid & list views |
| 🔍 **Search & Filter** | Find any file across all accounts instantly |
| 📊 **Analytics** | Storage usage charts, file type breakdown, upload trends |
| 🗑️ **Trash Management** | Restore or permanently delete files at any time |
| 🎨 **3 Themes** | Minimal Orange, Cyberpunk, Emerald — switchable at runtime |
| 🔒 **Fully Secure** | bcrypt PIN, httponly JWT cookie, OAuth tokens encrypted at rest |
| 🚀 **No Cloud Required** | Runs 100% on your local machine |
| 💰 **Free Forever** | Open source, MIT licensed |

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python · FastAPI · SQLite · Google Drive API v3 |
| Frontend | Next.js 16 · Tailwind CSS · React 19 |

---

## 📋 Prerequisites

Before you start, make sure you have the following installed:

- **Python 3.10 or higher** — [Download](https://www.python.org/downloads/)
- **Node.js 18 or higher** — [Download](https://nodejs.org/)
- **Git** — [Download](https://git-scm.com/)
- At least **one Google account**

To verify your versions, open a terminal and run:
```bash
python --version
node --version
git --version
```

---

## 🚀 Installation Guide (Step by Step)

### Step 1 — Clone the Repository

Open a terminal and clone the project to your local machine:

```bash
git clone https://github.com/mahidehasan-mvp/Self-hosted-Google-Drive-aggregator.git
cd Self-hosted-Google-Drive-aggregator
```

---

### Step 2 — Set Up Google OAuth Credentials

DrivePool uses the official Google Drive API. You only need to do this once — the same credentials work for any number of Google accounts you connect later.

1. Go to [Google Cloud Console](https://console.cloud.google.com/) and sign in.
2. Click **Select a project** → **New Project** → give it any name → **Create**.
3. In the search bar at the top, search for **"Google Drive API"** → click on it → click **Enable**.
4. In the left sidebar, go to **APIs & Services → OAuth consent screen**.
   - Choose **External** → **Create**
   - Fill in **App name** (e.g. `DrivePool`), your email for **User support email** and **Developer contact information**
   - Click **Save and Continue** on all remaining screens until you reach the **Test users** section
   - Click **+ ADD USERS** and add every Google account email you plan to connect to DrivePool
   - Click **Save and Continue** then **Back to Dashboard**
5. In the left sidebar, go to **APIs & Services → Credentials**.
   - Click **+ CREATE CREDENTIALS → OAuth client ID**
   - Application type: **Web application**
   - Name: anything you want (e.g. `DrivePool Client`)
   - Under **Authorized redirect URIs**, click **+ ADD URI** and enter: `http://localhost:8000/api/auth/callback`
   - Click **Create**
6. A popup will show your credentials. Click **DOWNLOAD JSON**.
7. Rename the downloaded file to **`credentials.json`** and place it in the `config/` folder of the project:

```
Self-hosted-Google-Drive-aggregator/
└── config/
    └── credentials.json   ← put your file here
```

> **Tip:** The `config/credentials.template.json` file shows the exact format your JSON file should be in.

---

### Step 3 — Install Python Dependencies

From the root of the project folder, run:

```bash
pip install -r backend/requirements.txt
```

This installs FastAPI, SQLAlchemy, Google API libraries, bcrypt, and all other required packages.

---

### Step 4 — Set Up Your Dashboard PIN & Secrets

Run the setup script once. It will generate your secure PIN hash, a JWT signing secret, and a database encryption key — all stored locally in `backend/drivepool.db`. No `.env` file is needed.

```bash
python backend/scripts/generate_secrets.py
```

When prompted, **Enter a PIN** of your choice. This is the password you'll use to log into your DrivePool dashboard. Remember it!

> ⚠️ **Important:** Only run `generate_secrets.py` once. Running it again will rotate your encryption key and break access to any already-connected Google accounts. To change your PIN later, see the [Changing Your PIN](#-changing-your-pin) section below.

---

### Step 5 — Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

---

### Step 6 — Start the App

#### Option A — Quick Launch (Windows only)

Simply double-click the **`start.bat`** file in the project root. It will:
- Launch the Python backend on `http://localhost:8000`
- Launch the Next.js frontend on `http://localhost:3000`
- Automatically open your browser

#### Option B — Manual Launch (Windows / macOS / Linux)

Open **two separate terminals** from the project root:

**Terminal 1 — Backend:**
```bash
cd backend
uvicorn main:app --reload
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

Wait a few seconds, then open your browser and navigate to: [http://localhost:3000](http://localhost:3000)

---

### Step 7 — Connect Your Google Accounts

1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Enter your **PIN** to log in.
3. Navigate to **Settings** in the sidebar.
4. Click **Connect another account** and sign in with your Google account.
5. Repeat for each Google account you want to add to the pool.

🎉 That's it! Each linked account adds 15 GB to your total storage pool.

---

## 📂 Project Structure

```
Self-hosted-Google-Drive-aggregator/
├── backend/
│   ├── main.py              # FastAPI app entry point
│   ├── config.py            # Loads secrets from the database
│   ├── database.py          # SQLAlchemy connection setup
│   ├── models/              # SQLAlchemy ORM models
│   ├── routes/              # API route handlers (auth, files, accounts, profile)
│   ├── services/            # Google Drive API integration logic
│   ├── scripts/
│   │   ├── generate_secrets.py   # First-time setup script
│   │   └── change_pin.py         # Safe PIN change utility
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable React components
│   ├── contexts/            # React Context (Theme, Upload)
│   └── package.json         # Node.js dependencies
├── config/
│   ├── credentials.template.json  # Template — replace with your real file
│   └── (credentials.json)         # Your real file — never commit this!
├── start.bat                # Windows quick-launch script
└── README.md
```

---

## 🔄 Daily Usage

Once installed, your daily workflow is simple:

1. **Start the app** by double-clicking `start.bat` (Windows) or running the two terminal commands.
2. Navigate to [http://localhost:3000](http://localhost:3000).
3. Log in with your PIN.
4. Upload, browse, download, and manage your files.
5. **Stop the app** by closing the two command prompt/terminal windows that were opened.

---

## ➕ Adding More Storage

To add more free storage at any time:

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services → OAuth consent screen → Test users**
2. Add the email of the new Google account you want to connect.
3. Open DrivePool → **Settings** → **Connect another account**
4. Authorize the new account.

Each new account adds **+15 GB** to your pool instantly, no restart required.

---

## 🔑 Changing Your PIN

> **Do NOT run `generate_secrets.py` again** to change your PIN — it will rotate your database encryption key and permanently break access to your connected Google accounts.

Instead, use the dedicated safe script:

```bash
python backend/scripts/change_pin.py
```

You will be prompted to enter your new PIN. The change takes effect immediately.

---

## 🎨 Switching Themes

DrivePool includes three built-in themes. You can switch between them at any time by clicking the **Theme Selector** button in:
- The top navigation bar on the **landing page**
- The top right corner of the **dashboard**

| Theme | Description |
|---|---|
| 🟠 **Minimal Orange** | Clean, minimal dark UI with orange accents (default) |
| 🟣 **Cyberpunk** | Vibrant gradient-heavy pink/purple neon aesthetic |
| 🟢 **Emerald** | Elegant dark UI with cool green/teal accents |

Your theme preference is saved automatically in your browser.

---

## 🔒 Security Notes

- Your PIN is **never stored in plain text** — it is hashed using `bcrypt` before being saved.
- All Google OAuth tokens are **encrypted at rest** in the local SQLite database using `Fernet` symmetric encryption.
- All authentication uses **httponly JWT cookies** that are not accessible from JavaScript.
- Your files **never leave your own Google Drive accounts**. DrivePool only acts as a management layer on top of the official Google Drive API.
- No telemetry, no analytics, no third-party data collection of any kind.

---

## ❓ Troubleshooting

### `ModuleNotFoundError: No module named 'database'`
Make sure you are running the backend **from inside the `backend/` folder**:
```bash
cd backend
uvicorn main:app --reload
```

### `ECONNREFUSED` error in the browser or Next.js logs
Your backend is not running. Start the backend server as described in Step 6.

### `ModuleNotFoundError: No module named 'backend'`
You ran `uvicorn backend.main:app` from the wrong directory. Use `uvicorn main:app` from inside the `backend/` folder.

### Login fails with correct PIN
Your `backend/drivepool.db` database doesn't exist yet. Run `python backend/scripts/generate_secrets.py` from the project root first.

### Google OAuth redirect error
Make sure `http://localhost:8000/api/auth/callback` is added as an **Authorized redirect URI** in your Google Cloud Console credentials, and that your Google account is listed as a **test user** on the OAuth consent screen.

### Google account not in test users
Go to [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services → OAuth consent screen → Test users** and add the Google account email before trying to connect it.

---

## 📄 License

MIT — free to use, modify, and distribute.

---

## ⭐ Support the Project

If you find DrivePool useful, please consider giving the repository a star on GitHub — it helps more people discover the project!

[https://github.com/mahidehasan-mvp/Self-hosted-Google-Drive-aggregator](https://github.com/mahidehasan-mvp/Self-hosted-Google-Drive-aggregator)
