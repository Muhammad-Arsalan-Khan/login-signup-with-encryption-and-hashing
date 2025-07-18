# 🔐 Secure Login & Signup System - Node.js

Yeh project ek secure **Login** aur **Signup** system implement karta hai using **Node.js** and **Express.js**, jisme password ko **hash** aur **encrypt** kiya jata hai before saving to database.

---

## 📌 Features

- ✅ User **Signup** with:
  - Password **hashing** using bcrypt
  - Password **encryption** using AES (or crypto module)
- ✅ User **Login** with:
  - Encrypted password **decryption**
  - Password hash **matching**
- ✅ Strong **Password Generator** button with:
  - Minimum **8 characters**
  - At least **1 lowercase letter**
  - At least **1 uppercase letter**
  - At least **1 number**
  - At least **1 special character**

---

## ⚙️ How it Works

### 🔐 Signup

1. User enters a password or clicks **Generate Password**.
2. Password is:
   - Hashed using `bcrypt`
   - Encrypted using AES or `crypto`
3. Encrypted password is saved to the database.

### 🔓 Login

1. User inputs their password.
2. System:
   - Decrypts the stored password
   - Hashes the decrypted password
   - Hashes the input password
3. If both hashes **match**, login is successful.

### 🔑 Password Generator

A "Generate Password" button allows users to generate a strong password that contains:

- ✅ Minimum **8 characters**
- ✅ At least **1 lowercase letter**
- ✅ At least **1 uppercase letter**
- ✅ At least **1 digit**
- ✅ At least **1 special character** (e.g., `@`, `#`, `!`, etc.)

---

## 🛠 Technologies Used

- Node.js
- Express.js
- MongoDB (or any DB)
- bcrypt (password hashing)
- crypto (password encryption/decryption)
- dotenv (environment variables)

---

## 📁 Clone Project
```bash
https://github.com/Muhammad-Arsalan-Khan/login-signup-with-encryption-and-hashing.git
```

