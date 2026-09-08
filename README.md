# Jira Clone

A modern and responsive Jira-inspired project management dashboard built with **React, TypeScript, Material UI, and TanStack Query**.

This project was developed as a Front-End portfolio project to demonstrate modern React development practices, component-based architecture, state management, data fetching, authentication flows, CRUD operations, and responsive UI design.

## 🚀 Live Demo

**[View Live Demo](https://jira-clone-green.vercel.app/)**

## 📦 GitHub Repository

**[View Source Code](https://github.com/AmirHosein240/jira-clone)**

---

## ✨ Features

### 🔐 Authentication

- Login page with form validation
- Protected application routes
- Persistent authentication state
- Logout functionality
- Change password functionality
- User profile management
- Update username and email
- Profile image management

### 📊 Dashboard

- Overview of project statistics
- Task statistics
- Project progress
- Recent tasks
- Responsive dashboard layout

### 📁 Projects

- Display projects in a structured table
- Create new projects
- Edit project information
- Delete projects
- Search and filter projects
- Project status management

### ✅ Tasks

- Display tasks
- Create new tasks
- Edit tasks
- Delete tasks
- Search and filter tasks
- Task status management
- Task priority management
- Task cards and table views

### 👥 Users

- Display users
- Search users
- Filter users
- Responsive users table

### 🎨 UI & UX

- Material UI component system
- Responsive layout
- Dark / Light theme
- Reusable components
- Loading states
- Skeleton loaders
- Error states
- Snackbar notifications
- Confirmation dialogs

---

## 🛠️ Tech Stack

| Technology      | Purpose                                       |
| --------------- | --------------------------------------------- |
| React           | Building the user interface                   |
| TypeScript      | Static typing and safer development           |
| Vite            | Development environment and build tool        |
| Material UI     | UI components and styling                     |
| React Router    | Client-side routing                           |
| TanStack Query  | Server-state and asynchronous data management |
| Axios           | HTTP requests                                 |
| JSONPlaceholder | Mock API / development data                   |
| Git             | Version control                               |
| GitHub          | Source code hosting                           |
| Vercel          | Deployment                                    |

---

## 🏗️ Project Architecture

The project follows a **feature-based architecture** to keep the codebase modular, scalable, and easy to maintain.

```text
src/
├── app/
│   ├── providers.tsx
│   └── router.tsx
│
├── components/
│   ├── AppSnackbar.tsx
│   ├── ProtectedRoute.tsx
│   ├── StatusMessage.tsx
│   └── TableSkeleton.tsx
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── auth.ts
│   │
│   ├── dashboard/
│   │   └── components/
│   │
│   ├── projects/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
│   │
│   ├── tasks/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
│   │
│   └── users/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       └── types/
│
├── layouts/
│   ├── DashboardLayout.tsx
│   └── components/
│
├── pages/
│   ├── Dashboard/
│   ├── Login/
│   ├── Projects/
│   ├── Tasks/
│   └── Users/
│
├── theme/
│   ├── ThemeModeContext.tsx
│   └── theme.ts
│
├── App.tsx
├── index.css
└── main.tsx
```

### Why Feature-Based Architecture?

Instead of grouping all components, hooks, services, and types into global folders, each feature owns its related logic.

For example:

```text
features/
└── tasks/
    ├── api/
    ├── components/
    ├── hooks/
    └── types/
```

This makes the project easier to:

- Maintain
- Scale
- Test
- Refactor
- Understand
- Extend with new features

---

## 🔄 Data Fetching

The application uses **TanStack Query** for asynchronous data management.

The general flow is:

```text
Component
   ↓
Custom Hook
   ↓
Service Layer
   ↓
API / Mock Data
```

For example:

```text
TaskTable
   ↓
useTasks()
   ↓
task.service.ts
   ↓
API / Mock Data
```

This keeps API logic separated from UI components and makes the application easier to maintain.

---

## 🌐 API & Mock Data

The project uses **JSONPlaceholder** as a public mock API for development purposes.

Because JSONPlaceholder is a fake REST API, some write operations such as creating, updating, or deleting resources are not intended to persist permanently on the server.

The application therefore focuses on demonstrating the **Front-End architecture and user experience** rather than implementing a production backend.

A real production version could replace the current service layer with a custom REST API or another backend without requiring major changes to the UI architecture.

---

## 🧭 Application Routes

| Route        | Description         |
| ------------ | ------------------- |
| `/login`     | Authentication page |
| `/dashboard` | Main dashboard      |
| `/projects`  | Project management  |
| `/tasks`     | Task management     |
| `/users`     | Users management    |

Protected routes are handled through a reusable `ProtectedRoute` component.

---

## 🎨 Theme

The application supports:

- Light mode
- Dark mode
- Centralized theme configuration
- Material UI theme customization

Theme state is managed through a dedicated context:

```text
theme/
├── ThemeModeContext.tsx
└── theme.ts
```

---

## 📱 Responsive Design

The interface is designed to work across different screen sizes, including:

- Desktop
- Laptop
- Tablet
- Mobile

Material UI's responsive layout system is used throughout the application.

---

## ⚡ Loading & Error States

The application provides dedicated UI states for asynchronous operations:

- Loading indicators
- Skeleton loaders
- Error messages
- Empty states
- Snackbar notifications

This improves the overall user experience and prevents abrupt UI changes while data is loading.

---

## 🧩 Reusable Components

Several reusable components are used throughout the application, including:

- Tables
- Dialogs
- Filters
- Cards
- Status messages
- Skeleton loaders
- Snackbar notifications
- Protected routes

The goal is to avoid unnecessary duplication and keep UI behavior consistent.

---

## 🖥️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AmirHosein240/jira-clone.git
```

### 2. Navigate to the project

```bash
cd jira-clone
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 📦 Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🚀 Deployment

The application is deployed using **Vercel**.

Every update pushed to the `main` branch can trigger a new deployment automatically.

**Production:**
https://jira-clone-green.vercel.app/

---

## 🔮 Future Improvements

Possible improvements for a production-ready version include:

- Real backend integration
- Database integration
- Real-time task updates
- Role-based access control
- Advanced task filtering
- Drag & drop task management
- Pagination
- Unit and integration tests
- Form validation improvements
- Optimized code splitting and lazy loading
- CI/CD pipeline
- More advanced project analytics

---

## 🎯 What This Project Demonstrates

This project demonstrates practical experience with:

- Building applications with React and TypeScript
- Creating reusable UI components
- Working with Material UI
- Client-side routing
- Protected routes
- Authentication flows
- CRUD interfaces
- API/service layer separation
- Server-state management with TanStack Query
- Responsive design
- Light/Dark themes
- Feature-based project architecture
- Git and GitHub workflow
- Production deployment with Vercel

---

## 👨‍💻 Author

**AmirHosein**

Front-End Developer focused on building modern and maintainable web applications with React and TypeScript.

### Links

- GitHub: https://github.com/AmirHosein240
- Project: https://github.com/AmirHosein240/jira-clone
- Live Demo: https://jira-clone-green.vercel.app/

---

## ⭐ Feedback

If you find this project useful or have suggestions for improvement, feel free to open an issue or submit a pull request.
