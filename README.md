# Project Structure & Tech Stack Clarification

This repository is organized into separate branches and folders to clearly separate each module of the project.

## Branch Structure
- **main branch** → Contains the **Contact Page** with both frontend and backend.
- **career-page branch**  → Contains the **Careers Page** with both frontend and backend.
  
Each page/module is developed in its own branch to keep the code clean and organized.

---

## Folder Structure (Important)

### 1️⃣ **project/** – Frontend Code  
This folder contains the complete frontend built using **React + TypeScript + Vite + Tailwind CSS**.

Key points:
- All UI pages are implemented as **React TypeScript components** (`.tsx` files).
- React applications use **only one `index.html`** (inside `/project/index.html`).  
  Additional pages are created as components, not separate HTML files.
- Main files:
  - `/src/App.tsx`
  - `/src/main.tsx`
  - `/src/components/` – All subcomponents
  - `vite-env.d.ts` – TypeScript environment declarations
- Styling is handled using **Tailwind CSS**.

---

### 2️⃣ **backend/** – Backend Code  
This folder contains the backend API (Flask).  
The backend is separate from the frontend to maintain modularity.

---

## Tech Stack Used (Frontend)
- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**

---

## Summary (For Easy Understanding)
- The project **does use TypeScript**, as all main files are `.tsx` or `.ts`.
- React projects naturally contain **multiple folders** (`src`, `components`, configs), not multiple HTML files.
- Only one `index.html` is expected and correct for React.
- Each page (Contact, Careers) is placed in a **separate branch**, and the backend/frontend are cleanly separated into their own folders.

This structure ensures the project follows modern development standards and keeps all modules well-organized.
