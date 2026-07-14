# Algo Agritech Dashboard (Frontend)

A modern, responsive dashboard to visualize commodity price index trends.

## Features
- **Next.js (App Router):** Clean React framework configuration.
- **ApexCharts:** Custom gradient area charts with -45 degree rotated category labels.
- **React Query:** High-performance caching, state synchronization, loading spinners, and error state tracking.
- **Tailwind CSS:** Fully responsive mobile-first UI with custom spacing.

---

## Project Structure
```
frontend/
├── src/
│   ├── app/         # Next.js App Router pages and global layouts
│   ├── components/  # Visual components (Navbar, CommodityChart, UsersTable, etc.)
│   ├── hooks/       # Custom React Query fetching hook
│   ├── lib/         # Axios API client configurations
│   └── providers/   # Global QueryClientProvider wrapper
├── .env.local       # Local environment variables file
├── .env.local.example # Template environment configuration
└── package.json     # Node scripts and package dependencies
```

---

## Setup & Installation

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment (`.env.local`):**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Run Dev Server:**
   ```bash
   npm run dev
   ```

4. **Build Production:**
   ```bash
   npm run build
   ```
