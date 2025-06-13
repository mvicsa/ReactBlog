# 🖼️ ReactBlog

**ReactBlog** is a single-page application built with **React**.  
It provides a clean and responsive user interface that allows users to:

- 🔐 Sign up, log in, and manage authentication status
- ✍️ Create, edit, and delete blog posts
- 🖼️ Upload images with posts using a user-friendly form
- 🔎 Explore blog posts from other users
- 🔄 Navigate smoothly using client-side routing with **React Router**
- ⚠️ Display user-friendly error messages and loading indicators

![ReactBlog Screenshot](https://i.ibb.co/ZR1Wj5ZS/screencapture-react-blog-seven-rho-vercel-app-2025-06-12-19-21-43.png)


## 📁 Technologies Used

- **React**
- **React Router**
- **Axios**
- **Context API**
- **Tailwind CSS**

---

## 🚀 Features

### 👥 Authentication
- User login and register (client-side validation).
- Secure with JWT tokens stored in httpOnly cookies.

### 📝 Posts
- Create, edit, and delete blog posts.
- Upload images using [imgbb](https://imgbb.com/) API.
- Posts are linked to the authenticated user.
- Responsive and dark-mode friendly.

### 🔒 Authorization
- Only the creator of a post can edit/delete it.
- Routes are protected both on client and server.

---

## 🧱 Tech Stack

| Layer       | Technologies                          |
|-------------|----------------------------------------|
| Frontend    | React, React Router, Tailwind CSS      |
| Backend     | Express.js, MongoDB, Mongoose          |
| Auth        | JWT, Cookies (httpOnly)                |
| Image Upload| [imgbb API](https://api.imgbb.com/)    |
| Validation  | Zod                                    |

---

## 📂 Project Structure

```
.
├── Components/           # Reusable UI components
├── Contexts/           # Auth & Loading providers
├── Layouts/           # Pages Layouts
├── Pages/           # Page views (Home, Login, Post, etc.)
└── utils/           # Helpers like API instance, alerts, etc.
```

---

## ⚙️ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/mvicsa/ReactBlog.git
cd ReactBlog
```

### 2. Set up the frontend

```bash
npm install
npm run dev
```

---

## 🌐 Deployment
- Frontend: Vercel
- Backend: Railway
- Ensure cookies are sent with `credentials: include`
- Use `sameSite: "Lax"` or `"None"` with secure cookies

---

## 🛡️ Environment Variables

### `.env` for Frontend

```env
VITE_API_URL=http://localhost:3000
VITE_IMGBB_KEY=your_imgbb_api_key
```

---

## 💡 Future Improvements

- Add categories/tags
- Rich-text editor for posts
- Commenting system
- Profile pages

---

## 🤝 Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

MIT © [mvicsa](https://github.com/mvicsa)