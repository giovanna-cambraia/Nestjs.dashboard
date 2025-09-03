# 🏨 NestJS Dashboard – Hotel Reservation API

A **NestJS + Prisma + PostgreSQL** backend for managing hotel reservations.
It includes authentication, role-based access (User/Admin), and CRUD operations for hotels and reservations.

## ✨ Features

- 🔐 **Auth & Roles**
  - Users can create and manage their own reservations.
  - Admins have access to manage hotels and view all reservations.
  - `UseGuards` + `Roles` decorators for secure access control.

- 🏨 **Hotels**
  - Create, read, update, delete hotels.
  - Map hotels to their owners.

- 📅 **Reservations**
  - CRUD operations for reservations.
  - Each reservation linked to a specific hotel and user.

- 🗄 **Database**
  - Powered by **PostgreSQL** with **Prisma ORM**.
  - Strong relational schema between users, hotels, and reservations.

## 🛠 Tech Stack

- [NestJS](https://nestjs.com/) – Node.js framework
- [Prisma](https://www.prisma.io/) – Type-safe database ORM
- [PostgreSQL](https://www.postgresql.org/) – Relational database
- [TypeScript](https://www.typescriptlang.org/) – Type safety
- JWT Authentication + Role Guards

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 16.x)
- PostgreSQL running locally or in Docker
- npm or yarn

### Installation

```bash
git clone https://github.com/giovanna-cambraia/Nestjs.dashboard.git
cd Nestjs.dashboard
npm install

Environment Variables

Create a .env file in the root:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/hoteldb"
JWT_SECRET="yourSecretKey"
PORT=3000

Run Database Migrations

npx prisma migrate dev

Start the App

npm run start:dev

📑 Example Endpoints
Hotels

POST /hotels – Create a hotel (Admin only)

GET /hotels – List all hotels

GET /hotels/:id – Get hotel by ID

PATCH /hotels/:id – Update hotel (Admin only)

DELETE /hotels/:id – Remove hotel (Admin only)

Reservations

POST /reservations – Create a reservation (User)

GET /reservations/me – Get logged-in user’s reservations

GET /reservations – Admin: get all reservations

PATCH /reservations/:id – Update reservation

DELETE /reservations/:id – Cancel reservation

👥 Roles

Admin

Full CRUD on Hotels and Reservations.

User

CRUD only on their own Reservations.

Read access to Hotels.
