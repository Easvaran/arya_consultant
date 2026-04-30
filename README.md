# ARYA CONSULTANT - Modern Finance Platform

ARYA CONSULTANT is a full-stack fintech website built with Next.js, TypeScript, Tailwind CSS, and MongoDB. It offers personal and business loans, investment plans, and a secure user dashboard.

## 🚀 Features

- **JWT Authentication**: Secure user registration and login.
- **Loan Application**: Seamless form to apply for various loan types.
- **Secure Dashboard**: Protected routes for users to view loan status and payment history.
- **EMI Calculator**: Dynamic calculation of monthly installments and total interest.
- **Responsive Design**: Mobile-first UI inspired by modern fintech applications.
- **Clean UI/UX**: Built with Tailwind CSS and Lucide icons.

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (Node.js)
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT (JSON Web Tokens) with HttpOnly cookies
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Notifications**: React Hot Toast

## 📁 Folder Structure

- `/app`: Pages and API routes
- `/components`: Reusable UI components (Navbar, Footer, etc.)
- `/lib`: Utility functions (Auth, MongoDB connection)
- `/models`: Mongoose models (User, Loan, Payment)
- `/public`: Static assets

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB account (Atlas or local)

### Setup Instructions

1. **Clone the repository** (or copy the files).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## 🚀 Deployment (Vercel)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1.  **Push your code to GitHub**: Create a new repository on GitHub and push your local code.
2.  **Import to Vercel**: Sign in to Vercel and click "New Project", then select your GitHub repository.
3.  **Configure Environment Variables**: In the Vercel dashboard, go to Project Settings > Environment Variables and add all the variables from your `.env.local` (refer to `.env.example` for the list).
    - `MONGODB_URI`: Your MongoDB Atlas connection string.
    - `JWT_SECRET`: A secure random string for tokens.
    - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`: Your email provider settings.
    - `ADMIN_EMAIL`: The email where you want to receive notifications.
    - `BUSINESS_NAME`: Your brand name (e.g., ARYA CONSULTANT).
4.  **Deploy**: Click "Deploy". Vercel will build and host your site automatically.

## 🔐 Security

- Passwords are hashed using `bcryptjs`.
- JWT tokens are stored in `HttpOnly` cookies to prevent XSS attacks.
- Protected routes are handled via Next.js middleware.

## 📄 License

This project is licensed under the MIT License.
