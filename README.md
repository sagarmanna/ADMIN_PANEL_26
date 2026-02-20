

# Admin Panel – DummyJSON

This project is a modern Admin Dashboard built using:

- Next.js (App Router)
- Material UI (MUI)
- Zustand (State Management)
- DummyJSON Public REST API

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sagarmanna/ADMIN_PANEL_26.git
cd ADMIN_PANEL_26
📦 Installation & Run Commands
Install Dependencies
npm install
Start Development Server
npm run dev

Open in browser:

http://localhost:3000
🔐 Environment Variables (If Using Token Storage / NextAuth)

Create a file in the root directory:

.env.local

Add the following variables:

NEXTAUTH_SECRET=your_random_secret_key
NEXTAUTH_URL=http://localhost:3000

If token is stored only in Zustand (without NextAuth), environment variables are optional.

🌐 API Used

All backend data is fetched from:

https://dummyjson.com/

🔗 GitHub Repository

https://github.com/sagarmanna/ADMIN_PANEL_26


---

After adding this file, run:

```bash
git add README.md
git commit -m "Add README for submission"
git push
