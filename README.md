# 🚀 URL Shortener – MERN Stack

A fully functional **URL Shortener Application** built using the **MERN stack (MongoDB, Express, React, Node.js)**.
Users can shorten long URLs, manage them through a dashboard, and track click analytics.

---

## 📌 Features

### ⭐ Core Features

* Shorten long URLs
* Redirect from short URL → original URL
* Copy short URL to clipboard
* URL validation before shortening
* Prevent duplicate entries

### ⭐ User Authentication (Optional)

* Register new users
* Login/Logout functionality
* JWT-based authentication

### ⭐ User Dashboard

* View all URLs created by the user
* Delete a short URL
* Edit the destination (long URL)

### ⭐ Analytics Features

* Track number of clicks
* Track creation & last accessed timestamps
* Track referrers (optional)

### ⭐ Admin Features (Optional)

* Block malicious URLs
* Monitor system usage
* Rate limiting to prevent abuse

---

## 🏗️ Tech Stack

### **Frontend**

* React.js
* Axios
* TailwindCSS / Material UI (optional)

### **Backend**

* Node.js
* Express.js
* Mongoose
* NanoID (for generating short codes)

### **Database**

* MongoDB (Atlas or local)

### **Caching Layer (Optional)**

* Redis (for fast URL lookups)

---

## 📁 Project Structure

```
root/
│── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
│
│── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── index.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourrepo/url-shortener.git
cd UrlShortener
```

---

## 🗄️ Setup Backend

### 2️⃣ Install dependencies

```bash
cd server
npm install
```

### 3️⃣ Create `.env` file

```
PORT=5000
MONGO_URI=your_mongo_connection_string
BASE_URL=http://localhost:5000
JWT_SECRET=your_secret
REDIS_URL=optional
```

### 4️⃣ Start backend server

```bash
npm run dev
```

---

## 💻 Setup Frontend

### 5️⃣ Install dependencies

```bash
cd client
npm install
```

### 6️⃣ Start frontend

```bash
npm start
```

---

## 🔗 API Endpoints

### **POST** `/api/v1/urls/create`

Create short URL.

### **GET** `/:shortCode`

Redirect to original URL.

### **GET** `/api/v1/urls/info`

View analytics data.

---

## 🧠 Scalability & System Design

* Redis caching for high-frequency redirects
* Database sharding when URL count increases
* Rate limiting middleware to prevent abuse
* Load balancer (Nginx)
* Dockerized deployment
* CI/CD ready

---

## 🧪 Testing

Run tests using:

```bash
npm test
```

---

## 🙌 Contribution Guidelines

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Push branch & create pull request

---

## 📝 License

This project is licensed under the **MIT License**.

---

If you'd like, I can also generate:
✅ `CONTRIBUTING.md`
✅ Full folder structure
✅ API documentation (Swagger)
✅ ERD diagram

Just tell me!
