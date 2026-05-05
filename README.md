# 📋 Team Task Manager

A full-stack team task management application with role-based access control (Admin/Member).

## 🌐 Live Demo

- **Frontend:** [https://taskmanager-kapi.vercel.app](https://taskmanager-kapi.vercel.app)
- **Backend API:** [https://kind-harmony.up.railway.app](https://kind-harmony.up.railway.app)

## ✨ Features

- 🔐 **Authentication** - Register/Login with JWT
- 👥 **Role-Based Access** - Admin and Member roles
- 📁 **Project Management** - Create projects (Admin only)
- ✅ **Task Management** - Create, assign, and track tasks
- 📊 **Dashboard** - View task statistics
- 🎨 **Modern UI** - Clean and responsive design

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Axios
- CSS3
- Deployed on **Vercel**

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Deployed on **Railway**

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/taskmanager.git
cd taskmanager

# Setup Backend
cd backend
npm install
npm run dev

# Setup Frontend (new terminal)
cd ../frontend
npm install
npm run dev
```

📁 Project Structure
```
taskmanager/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProjectList.jsx
    │   │   └── TaskList.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

🔧 Environment Variables
Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
Frontend (Vercel)
Add this in Vercel dashboard → Settings → Environment Variables:
```
env
VITE_API_URL=https://kind-harmony.up.railway.app/api
```
📡 API Endpoints
Method              	Endpoint	                        Description
POST            	/api/auth/register	                Register new user
POST          	  /api/auth/login                        	Login user
GET	               /api/auth/users	                    Get all users
GET	              /api/projects	                        Get all projects
POST	            /api/projects	                        Create project
GET              	/api/tasks	                          Get user tasks
POST             	/api/tasks	                          Create task
PUT            	/api/tasks/:id	                      Update task status

🚀 Deployment
Backend (Railway)
1-Push code to GitHub
2-Connect repository to Railway
3-Set root directory to backend
4-Add environment variables
5-Deploy

Frontend (Vercel)
```bash
cd frontend
vercel --prod
Or connect GitHub repository to Vercel with:

Root Directory: frontend

Environment Variable: VITE_API_URL
```

👥 User Roles
Admin
*Create/Delete projects
*Create tasks for any user
*View all users
*Delete tasks

Member
*View assigned tasks
*Update task status (Pending/Completed)


📄 License
MIT License

👨‍💻 Author
Your Name 

GitHub: @Kapirajkr

🙏 Acknowledgments
*React Team
*Node.js Team
*MongoDB Atlas
*Railway for backend hosting
*Vercel for frontend hosting
