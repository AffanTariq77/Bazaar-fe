# BAZAAR — Frontend

The customer, seller, and admin web app for **BAZAAR**, a Daraz-inspired Pakistani marketplace built as a university full-stack project. This repo is the frontend; the API lives in a companion repo, [`Bazaar-be`](https://github.com/AffanTariq77/Bazaar-be) — this app has no functionality of its own without it (no product, cart, or order data is faked client-side).

## Features

- Homepage with a hero carousel, category grids (including a "Popular Categories" ranking by real product counts), and Flash Sale/Just For You/Popular/Recommended rails — all real filtered/sorted catalog queries, not hardcoded data
- Product listing with search, filters (category, brand, price, rating, discount, free shipping, in stock), sorting, and pagination, all driven by URL query params
- Product detail page with an image gallery, live stock status, reviews (with rating distribution), and related products
- Cart, wishlist, and a 4-step checkout (address → delivery → payment → review, with coupon application)
- Order history with a visual status timeline
- `/account` — profile editing, address management, review history
- Role-gated `/seller` dashboard (stats, product CRUD, order status management) and `/admin` dashboard (platform stats, charts, user/seller/product/order/category management, coupon CRUD)
- Responsive throughout, including a mobile hamburger menu carrying the auth/account links that would otherwise only live in the desktop top bar

## Architecture

Server state (products, cart, wishlist, orders, reviews, seller/admin data) lives entirely in **TanStack Query** — nothing is duplicated into client state. **Zustand** is reserved for genuine client-only state: the auth session (`store/auth.store.ts`, persisted to `localStorage`) and small UI toggles. Forms use **React Hook Form** with **Zod** resolvers, one schema per form in `schemas/`.

`services/api/client.ts` holds a single Axios instance with two interceptors: one attaches the bearer token from the auth store, the other catches a 401, silently calls `/auth/refresh` (via the httpOnly cookie), and retries the original request once — session refresh is transparent to the rest of the app.

Routes are lazy-loaded per top-level page (`React.lazy`) and role-gated via a single `<ProtectedRoute roles={[...]} />` wrapper.

## Tech stack

React 19, TypeScript, Vite, Tailwind CSS v4, React Router, TanStack Query, Axios, Zustand, React Hook Form, Zod, lucide-react, Vitest + React Testing Library, oxlint.

## Folder structure

```
src/
  components/
    common/ layout/ home/ products/ cart/ checkout/
    account/ auth/ seller/ admin/
  hooks/       services/api/   store/
  types/       schemas/        pages/
  routes/      utils/          test/
```

## Installation

Requires Node 20+ and a running instance of the backend (see [`Bazaar-be`](https://github.com/AffanTariq77/Bazaar-be)).

```bash
npm install
cp .env.example .env   # VITE_API_URL defaults to http://localhost:3000/api
npm run dev
```

The app runs at `http://localhost:5173`.

## Environment variables

See [`.env.example`](.env.example). `VITE_API_URL` is baked in at build time (Vite env vars are compile-time, not runtime) — this matters for Docker, where it's passed as a build arg rather than a container environment variable.

## Running

```bash
npm run dev       # dev server with HMR
npm run build     # typecheck + production build to dist/
npm run preview   # preview the production build locally
```

## Docker

This repo's `Dockerfile` builds a static production bundle and serves it via Nginx (with SPA fallback routing so client-side routes don't 404 on refresh). It's meant to be built as part of the full-stack `docker-compose.yml` in the `Bazaar-be` repo, which needs this repo cloned as a **sibling directory** (`../Bazaar-fe` relative to `Bazaar-be`):

```bash
# from Bazaar-be/
docker compose up --build
```

To build this image standalone (e.g. against a differently-hosted API):

```bash
docker build --build-arg VITE_API_URL=https://your-api.example.com/api -t bazaar-fe .
docker run -p 5173:80 bazaar-fe
```

## Demo accounts

Seeded by the backend (`npm run db:seed` in `Bazaar-be`), all with password `Password123!`: `admin@bazaar.test`, `seller@bazaar.test`, `customer@bazaar.test`.

## Testing

```bash
npm run test
npm run lint
```

23 tests across 5 files: discount-price math, the axios-error-message helper, Zod schema validation (including the register form's confirm-password check and the `+92` phone format), and `ProductCard` rendering (price/discount/free-shipping badges, disabled out-of-stock state).

## Build

```bash
npm run build
```

Runs `tsc -b` then `vite build`; output goes to `dist/`.
