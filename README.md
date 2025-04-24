# Time Away - Employee Leave Management System

Time Away is a comprehensive employee leave management application that streamlines the process of requesting time off, tracking leave balances, and managing approvals.

## Features

- **Leave Request Management**: Easily submit and track leave requests
- **Interactive Calendar**: View team schedules and upcoming leave periods
- **Leave Balance Tracking**: Monitor available leave days by category
- **Role-Based Access**: Different views for employees, supervisors, and HR/admin
- **Export Functionality**: Export leave data to CSV or Excel formats
- **Microsoft Authentication**: Single Sign-On with Microsoft accounts

## Tech Stack

This project is built with:

- **React**: UI library for building component-based interfaces
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Beautifully designed components
- **Tanstack Query**: Data fetching and state management
- **date-fns**: Modern JavaScript date utility library
- **Zod**: TypeScript-first schema validation
- **React Hook Form**: Form validation and management
- **Lucide React**: Beautiful and consistent icons

## Getting Started

### Prerequisites

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Docker (optional) - [install Docker](https://docs.docker.com/get-docker/)

### Installation

#### Option 1: Local Development

1. Clone the repository:
```sh
git clone <YOUR_REPOSITORY_URL>
```

2. Navigate to the project directory:
```sh
cd time-away
```

3. Install dependencies:
```sh
npm install
```

4. Start the development server:
```sh
npm run dev
```

#### Option 2: Using Docker Compose

1. Start the application:
```sh
docker-compose up
```

2. Access the application at `http://localhost:7000`

To run in detached mode:
```sh
docker-compose up -d
```

To stop the application:
```sh
docker-compose down
```

#### Option 3: Using Docker

1. Build the Docker image:
```sh
docker build -t time-away .
```

2. Run the container:
```sh
docker run -p 7000:7000 time-away
```

3. Access the application at `http://localhost:7000`

## Project Structure

- `/src/components`: Reusable UI components
  - `/ui`: shadcn/ui components
  - `/layout`: Layout components like AppLayout, Sidebar
  - `/leave`: Leave request specific components
  - `/auth`: Authentication components
  - `/calendar`: Calendar view components
  - `/dashboard`: Dashboard specific components
- `/src/pages`: Main page components
- `/src/services`: API service functions
- `/src/hooks`: Custom React hooks
- `/src/context`: React context providers
- `/src/utils`: Utility functions
- `/src/validation`: Zod validation schemas
- `/src/types`: TypeScript type definitions

## Authentication

The application supports both:
- Traditional email/password authentication
- Microsoft OAuth2.0 authentication

## Deployment

The project can be deployed by clicking the "Publish" button in Lovable or by connecting your GitHub account to transfer the code to your own repository.

## Custom Domain

You can connect a custom domain through the Project Settings in Lovable. Navigate to Project > Settings > Domains and follow the instructions.

## License

[Specify your license here]

## Contact

[Your contact information]
