# 🌿 Ecoyaan Checkout Flow

A simplified multi-step checkout flow built for the Ecoyaan platform assessment. This project demonstrates React, Next.js App Router with Server-Side Rendering, Context API state management, and responsive UI design.

---

## 🔗 Live Demo

[View Deployed App](https://your-vercel-url.vercel.app)

---

##  Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API + sessionStorage
- **Deployment:** Vercel

---

## Features

- **Cart Screen** — Products loaded via Server-Side Rendering (SSR) from a mock API route
- **Shipping Screen** — Full address form with real-time validation
- **Payment Screen** — Order review + simulated payment with 4 payment method options
- **Success Screen** — Animated order confirmation with full order summary
- **Step Indicator** — Visual progress tracker across all 3 steps
- **Persistent State** — sessionStorage ensures data survives page refreshes
- **Responsive Design** — Works on mobile and desktop

---

## Architectural Decisions

### Why App Router over Pages Router?
App Router is the modern Next.js standard. It enables React Server Components natively, making SSR data fetching cleaner without `getServerSideProps` boilerplate.

### How SSR is implemented
The Cart page (`/cart`) is an **async Server Component** that fetches from the local `/api/cart` route on the server before sending HTML to the client. Product data is rendered server-side on every request using `cache: "no-store"`.

### Why Context API over Redux/Zustand?
The checkout flow has only 2 pieces of shared state — cart data and shipping address. Context API is perfectly sufficient and avoids unnecessary complexity for this scope.

### Why sessionStorage?
Cart and address data needs to survive page refreshes but should clear when the tab closes. sessionStorage is ideal for checkout flows — it persists through refresh but doesn't linger like localStorage.

---

## Running Locally

### Prerequisites
- Node.js 18+
- npm

### Steps
```bash
# 1. Clone the repository
git clone https://github.com/your-username/ecoyaan-checkout.git

# 2. Navigate into the project
cd ecoyaan-checkout

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

# 5. Open in browser
http://localhost:3000
```

The app will redirect to `/cart` automatically.

---

## Form Validation Rules

| Field | Rule |
|-------|------|
| Full Name | Required |
| Email | Required + valid format |
| Phone | Required + exactly 10 digits |
| Door / Flat No | Required |
| Street Name | Required |
| Area / Locality | Required |
| Landmark | Optional |
| PIN Code | Required + exactly 6 digits |
| City | Required |
| State | Required — dropdown of all Indian states |