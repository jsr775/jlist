# Task List App (jlist)

A Next.js task management application with Supabase integration.

## Features

- 📝 Create, view, and manage tasks
- 🎯 Set task priorities (low, medium, high)
- 📅 Due date tracking
- ✅ Mark tasks as completed
- 🔄 Real-time data from Supabase

## Getting Started

### Prerequisites

1. **Supabase Project**: You need a Supabase project with the environment variables set up in `.env`.
2. **Tasks Table**: Create the tasks table in your Supabase database (see setup instructions below).

### Environment Setup

Make sure your `.env` file contains:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL script from `database/setup-tasks-table.sql` to create the tasks table

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to see your task list.

## Project Structure

```
├── app/
│   ├── page.tsx          # Main task list page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── AddTaskForm.tsx   # Form for creating new tasks
│   └── ui/               # UI components (table, etc.)
├── lib/
│   ├── supabase.ts       # Supabase client configuration
│   └── utils.ts          # Utility functions
├── database/
│   └── setup-tasks-table.sql  # Database schema
└── .env                  # Environment variables
```

## Task Schema

The tasks table includes the following fields:

- `id`: UUID primary key
- `title`: Task title (required)
- `description`: Optional task description
- `completed`: Boolean status
- `priority`: 'low' | 'medium' | 'high'
- `due_date`: Optional due date
- `assigned_to`: Optional assignee
- `created_at`: Timestamp
- `updated_at`: Timestamp

## Technologies Used

- [Next.js 16](https://nextjs.org) - React framework
- [Supabase](https://supabase.io) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [TypeScript](https://typescriptlang.org) - Type safety

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
