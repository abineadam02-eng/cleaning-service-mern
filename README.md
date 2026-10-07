# Cleaning Service MERN Website — V3 Inspired Theme

A responsive MERN cleaning-service website inspired by the visual direction and information architecture of the SmartDataSoft Cleaning Services V3 Demo 1. This is an original React/CSS implementation; it does not include proprietary theme source code or purchased theme assets.

## Included

### Public website
- Modern cleaning-service hero with quote CTA
- Contact / hours quick-information strip
- Service cards
- About section
- Why choose us feature band
- Dynamic Before & After gallery from admin
- Cleaning checklist
- 3-step process
- Dynamic customer reviews with star ratings
- Free quote form
- FAQ accordion
- Service areas
- Responsive mobile navigation
- Before/After lightbox

### Admin
- `/admin/login`
- JWT-protected admin dashboard
- Quote request management
- Quote status: new / contacted / booked / completed
- Customer review creation/deletion
- Before & After upload/delete
- Image upload via Multer

## Tech

- React + Vite
- React Router
- Axios
- Lucide React
- Node.js + Express
- MongoDB + Mongoose
- JWT
- Multer
- bcryptjs

## Setup

### 1. Install Node.js LTS
Download from https://nodejs.org/

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

Frontend: http://localhost:5173

### 3. Backend

Create `server/.env` from `server/.env.example`.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/cleanpro
JWT_SECRET=replace-with-a-long-secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@12345
CLIENT_URL=http://localhost:5173
```

Then:

```bash
cd server
npm install
npm run dev
```

API: http://localhost:5000

### 4. Admin

Open:

http://localhost:5173/admin/login

Use the email/password configured in `server/.env`.

## Customization

Main company details are in:

`client/src/data/site.js`

Replace the placeholder company name, phone, email, address, locations and social links before production.

## Important

The visual design is recreated with original React/CSS and freely accessible image URLs. The reference theme is used only as a design reference.
