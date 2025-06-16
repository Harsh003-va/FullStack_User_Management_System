# 🧑‍💻 FullStack User Management System with ToDo (JWT, AuthGuard, Interceptor)

A complete full-stack application for managing users and their personal ToDo lists using:

- **Spring Boot + Spring Security (JWT-based Authentication)**
- **Angular with AuthGuard, Interceptor & Routing**
- **H2/MySQL Database, REST APIs, Bootstrap UI**

---

## 📌 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Authentication (JWT Flow)](#authentication-jwt-flow)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)
- [Author](#author)
- [License](#license)

---

## 🚀 Tech Stack

### 🔙 Backend
- Java 17+
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA + Hibernate
- ModelMapper
- H2 or MySQL

### 🔜 Frontend
- Angular 16+
- TypeScript
- Angular Router
- AuthGuard
- HTTP Interceptor
- Bootstrap

---

## ✅ Features

- 🧑 User Registration & Login with JWT token generation
- 🔐 Authentication & Role-Based Authorization
- 📝 Per-user ToDo List (Each user can manage only their own tasks)
- ✅ Angular AuthGuard for protecting routes
- 🔐 Angular HTTP Interceptor for token injection
- 🔁 Reusable API services for Users and ToDos
- 📑 REST APIs with proper request validation
- 🧠 ModelMapper for DTO conversion

---

## 🧱 Architecture

```text
Angular (UI)
  ├── Login/Register
  ├── AuthGuard (Protects routes)
  └── Interceptor (Adds JWT to headers)
       ↓
Spring Boot (REST API)
  ├── AuthController (JWT)
  ├── UserController
  └── TodoController (User-Specific)
       ↓
Spring Services → JPA Repositories → Database (H2/MySQL)
