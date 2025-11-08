# 🧑‍💻 MyProject — User Authentication and Profile Management

A simple **Node.js + Express.js + MongoDB** web application featuring **user signup, login, profile display, and profile picture upload**.  
Built with **EJS templates**, **Multer for image uploads**, and **JWT authentication**.

---

## 🚀 Features

- 🔐 **User Registration & Login**
  - Secure authentication using **JWT (JSON Web Tokens)**
  - Passwords hashed with **bcrypt**

- 👤 **User Profile**
  - Displays user information (name, username, age, etc.)
  - Shows user’s posts and likes
  - Profile picture upload with Multer

- 🖼️ **Profile Picture Upload**
  - Upload and update profile images
  - Default profile image for new users

- 🗒️ **Post Management**
  - Create, edit, and like/unlike posts
  - User-specific posts displayed on profile

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Backend** | Node.js, Express.js |
| **Frontend** | EJS Templates, Tailwind CSS |
| **Database** | MongoDB with Mongoose |
| **Authentication** | JWT (jsonwebtoken) |
| **File Uploads** | Multer |
| **Password Security** | bcrypt |
| **Environment Config** | dotenv |

---

## ⚙️ Installation & Setup

1. **Clone this repository**
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the server**
   ```bash
   npx nodemon
   ```
4. **Open your browser and go to**
   http://localhost:3000

## 🖼️ Screenshots

`/public/videos/Screen Recording 2025-11-08 233602`

## 🔒 Security Notes

- Always keep your `.env` file private (add it to `.gitignore`)
- Never commit JWT secrets or database credentials


## 💬 Future Enhancements

- Add password reset functionality  
- Add comment support under posts  
- Integrate cloud storage (e.g., Cloudinary) for image hosting  
- Improve UI with Tailwind components  


## 👩‍💻 Author

**Deshika Gupta**  
🌐 [GitHub](https://github.com/Deshikagupta)  


## 🪪 License

This project is open-source and available under the **MIT License**.
