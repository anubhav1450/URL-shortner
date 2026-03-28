# 🔗 URL Shortener with Analytics

A full-stack URL shortening service built using Node.js, Express, and MongoDB.
It allows users to generate short URLs, redirect to original links, and track visit history.

---

## 🚀 Features

* 🔗 Generate short URLs using nanoid
* 🔁 Redirect short URLs to original URLs
* 📊 Track visit history (timestamp-based analytics)
* ⚡ Fast lookup using indexed short codes
* 🛠 REST API based backend

---

## 🧱 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Utilities:** nanoid
* **API Testing:** Postman

---

## 📁 Project Structure

```
src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── db/
 ├── app.js
 └── server.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/anubhav1450/URL-shortner.git
cd URL-shortner
```

---

### 2️⃣ Install dependencies

```
npm install
```

---

### 3️⃣ Setup environment variables

Create a `.env` file in root:

```
MONGO_URI=your_mongodb_connection_string
```

---

### 4️⃣ Run the server

```
node server.js
```

Server will start on:

```
http://localhost:3000
```

---

## 📌 API Endpoints

### 🔹 Create Short URL

```
POST /url
```

**Request Body:**

```
{
  "url": "https://example.com"
}
```

**Response:**

```
{
  "shortUrl": "http://localhost:3000/url/abc123"
}
```

---

### 🔹 Redirect to Original URL

```
GET /url/:shortCode
```

👉 Redirects to the original URL and logs visit history

---

### 🔹 Get Analytics

```
GET /url/analytics/:shortCode
```

**Response:**

```
{
  "totalClicks": 5,
  "analytics": [
    { "timestamp": "..." }
  ]
}
```

---

## 🧠 How It Works

1. User submits a long URL
2. Server generates a unique shortCode
3. URL is stored in MongoDB
4. When short URL is accessed:

   * DB lookup happens
   * Visit is recorded
   * User is redirected

---

## 🔮 Future Improvements

* Custom short URLs
* Link expiration
* Authentication system
* Frontend dashboard (React)

---

## 👨‍💻 Author

**Anubhav Kulshreshtha**

---

## ⭐ If you like this project

Give it a star on GitHub ⭐
