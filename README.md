# Real-Time Chat Application
A full-stack real-time chat app built with React.js, Node.js, Express.js, MongoDB, and Socket.io, featuring authentication, live messaging, and modern UI.

🚀 Live Demo: https://chat-app-fndy.onrender.com/

#  Features
🔐 Secure Authentication – JWT + HttpOnly cookies + Samesite
💬 Real-Time Messaging – Powered by Socket.io
🎭 User Presence – Online / Offline indicators
🎨 Themes Support – Switch between dark & light mode and many more
📱 Responsive Design – Works on desktop & mobile
⚡ Scalable Backend – REST APIs with Express.js
☁️ Deployed – Frontend & backend hosted on Render

# Tech Stack
Frontend: React.js (Vite), Axios ,TailwindCSS / Shadcn UI, Socket.io-client
Backend: Node.js, Express.js, MongoDB + Mongoose, Socket.io, JWT Authentication, bcrypt

# Deployment:
Render (Frontend + Backend)

# 📂 Project Structure
chat-app/
│── backend/         # Express backend with API + WebSocket server
│   ├── src/
│   │   ├── routes/  
│   │   ├── controllers/  
│   │   ├── models/  
│   │   ├── middleware/  
│   │   └── index.js  
│   └── package.json  
│
│── frontend/        # React frontend
│   ├── src/  
│   │   ├── components/  
│   │   ├── pages/  
│   │   ├── store/  
│   │   └── App.jsx  
│   └── package.json  
│
└── README.md  

# 🚀 Getting Started
1️⃣ Clone the repository
git clone https://github.com/your-username/chat-app.git
cd chat-app

2️⃣ Backend Setup
cd backend
npm install
Create a .env file in backend/ with:
PORT=5001
MONGO_URI=your-mongodb-url
JWT_SECRET=your-secret-key
Start backend:
npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
Create a .env file in frontend/ with:
VITE_API_URL=http://localhost:5001/api
Start frontend:
npm run dev