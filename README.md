# Expense Tracker

A modern, intelligent expense tracking application built with React, TypeScript, and Vite. This application helps users manage their expenses with interactive visualizations, AI-powered chat assistance, and a clean, intuitive interface.

## Features

- **User Authentication**: Secure login and registration system with JWT token-based authentication
- **Expense Dashboard**: Interactive dashboard with multiple chart types (Pie, Bar, Line charts)
- **AI Chat Assistant**: Intelligent chat interface for expense analysis and insights
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Mock Data Support**: Built-in mock data for development and testing without backend
- **Real-time Updates**: Dynamic expense tracking and visualization
- **Category-based Analysis**: Track expenses by different categories
- **Time-based Reports**: Daily, weekly, monthly, and yearly expense reports

## Technology Stack

### Frontend
- **React 19.1.1**: Modern UI library with hooks and context
- **TypeScript 5.8.3**: Type-safe JavaScript
- **Vite 7.1.7**: Fast build tool and dev server
- **Styled Components 6.1.19**: CSS-in-JS styling
- **React Router DOM 7.9.2**: Client-side routing
- **Recharts 3.2.1**: Charting library for data visualization
- **Axios 1.12.2**: HTTP client for API calls

### Development Tools
- **ESLint 9.36.0**: Code linting and quality
- **TypeScript ESLint**: TypeScript-specific linting rules

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (comes with Node.js)
- **Git**: For cloning the repository

To check your installed versions:
```bash
node --version
npm --version
git --version
```

## Installation

Follow these steps to set up the development environment:

### Step 1: Clone the Repository

```bash
git clone https://github.com/SaiPoornaChandraPrakash/ExpenseTracker.git
cd ExpenseTracker
```

### Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install all dependencies listed in `package.json`, including React, TypeScript, Vite, and other libraries.

### Step 3: Environment Configuration

The application uses environment variables for configuration. Create a `.env` file in the root directory:

```bash
# Optional: Backend API URL
# If not set, defaults to http://localhost:3001/api
VITE_API_URL=http://localhost:3001/api
```

**Note**: The application works with mock data by default, so no backend is required for development. If you have a backend API, set the `VITE_API_URL` variable to point to your backend.

### Step 4: Start the Development Server

Run the development server:

```bash
npm run dev
```

The application will start at `http://localhost:5173` (or another port if 5173 is busy). Open this URL in your browser.

## Available Scripts

In the project directory, you can run:

### `npm run dev`
Starts the development server with hot module replacement (HMR).
- Opens at: `http://localhost:5173`
- Changes are reflected instantly

### `npm run build`
Builds the application for production:
1. Runs TypeScript compiler (`tsc -b`)
2. Bundles with Vite
3. Outputs to `dist/` directory

```bash
npm run build
```

### `npm run preview`
Previews the production build locally:

```bash
npm run preview
```

### `npm run lint`
Runs ESLint to check code quality:

```bash
npm run lint
```

## Project Structure

```
ExpenseTracker/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, and other assets
│   ├── components/     # React components
│   │   ├── auth/       # Authentication components (Login, Register)
│   │   ├── charts/     # Chart components (Pie, Bar, Line)
│   │   ├── chat/       # Chat interface components
│   │   ├── common/     # Reusable common components
│   │   └── dashboard/  # Dashboard-specific components
│   ├── hooks/          # Custom React hooks (useAuth, etc.)
│   ├── pages/          # Page components (AuthPage, DashboardPage)
│   ├── services/       # API service layers
│   │   ├── authService.ts      # Authentication API calls
│   │   ├── expenseService.ts   # Expense data API calls
│   │   └── chatService.ts      # Chat API calls
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main app component with routing
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── eslint.config.js    # ESLint configuration
```

## Implementation Details

### Authentication Flow

1. **Login/Register**: Users can authenticate via the `/auth` page
2. **Token Storage**: JWT tokens are stored in `localStorage`
3. **Protected Routes**: Dashboard is protected and requires authentication
4. **Auto-redirect**: Authenticated users are redirected to dashboard

### Mock Data Mode

The application includes mock data generators in service files:
- `authService.ts`: Mock login/register functionality
- `expenseService.ts`: Mock expense data and charts
- `chatService.ts`: Mock AI chat responses

This allows full-featured development without a backend server.

### State Management

- **Authentication**: Managed via React Context (`useAuth` hook)
- **Component State**: Local state with `useState` and `useEffect`
- **API Responses**: Standardized `ApiResponse<T>` type for consistency

### Styling Approach

- **Styled Components**: All styling is done with CSS-in-JS
- **Theme**: Color scheme with purple/gradient theme
- **Responsive**: Mobile-first responsive design with media queries

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deployment Options

1. **Netlify**:
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Vercel**:
   - Import project from GitHub
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Static Hosting**:
   - Upload contents of `dist/` folder to any static host
   - Configure server for SPA routing (redirect all routes to `index.html`)

## Troubleshooting

### Common Issues

**Port already in use**:
```bash
# If port 5173 is busy, Vite will automatically use the next available port
# Check the terminal output for the actual port
```

**Dependencies installation fails**:
```bash
# Clear npm cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Build fails**:
```bash
# Ensure TypeScript types are correct
npm run build
# Check error messages and fix type errors
```

**Environment variables not working**:
- Environment variables must start with `VITE_`
- Restart dev server after changing `.env` file
- Variables are embedded at build time, not runtime

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Contact

For questions or support, please contact the repository owner.
