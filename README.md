# Skyfeed - A Modern Social Media Platform

A full-stack social media application built with React, Node.js, and MongoDB, featuring real-time interactions, image uploads, and a modern responsive UI.

## 🌟 Features

### Frontend (React + Vite)
- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Dark/Light Mode**: Toggle between themes with persistent preferences
- **Real-time Interactions**: Like tweets and comments with instant updates
- **Image Support**: Upload and display images with loading states
- **Responsive Grid Layout**: Adaptive design for all screen sizes
- **User Authentication**: Secure login/signup with JWT tokens
- **Protected Routes**: Route protection based on authentication status

### Backend (Node.js + Express)
- **RESTful API**: Complete CRUD operations for tweets, comments, and users
- **JWT Authentication**: Secure token-based authentication
- **File Upload**: S3 integration for image storage
- **Pagination**: Efficient data loading with offset/limit
- **MongoDB Integration**: Robust data persistence with Mongoose ODM
- **Error Handling**: Comprehensive error management and validation

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Context API** - State management for auth and theme

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Multer** - File upload handling
- **AWS S3** - Cloud storage for images

## 📁 Project Structure

```
Skyfeed/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── api/           # API client configuration
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React context providers
│   │   ├── pages/         # Page components
│   │   └── shared/        # Shared components
│   ├── package.json
│   └── tailwind.config.js
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── config/        # Database and middleware config
│   │   ├── controllers/   # Route controllers
│   │   ├── middlewares/   # Custom middleware
│   │   ├── models/        # Mongoose models
│   │   ├── repository/    # Data access layer
│   │   ├── routes/        # API routes
│   │   └── service/       # Business logic
│   ├── tests/             # Test files
│   └── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- AWS S3 bucket (for image uploads)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Skyfeed/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the server directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/skyfeed
   JWT_SECRET=your_jwt_secret_here
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=your_aws_region
   AWS_BUCKET_NAME=your_s3_bucket_name
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd ../client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/v1/signup`
Create a new user account
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST `/api/v1/login`
Authenticate user and get JWT token
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Tweet Endpoints

#### GET `/api/v1/tweets`
Get all tweets (public)

#### GET `/api/v1/tweets/:id`
Get specific tweet (requires auth)

#### POST `/api/v1/tweets`
Create new tweet (requires auth)
```form-data
content: "Hello Skyfeed!"
image: [optional file upload]
```

### Interaction Endpoints

#### POST `/api/v1/likes/toggle`
Toggle like on tweet or comment
```
Query: modelId=<id>&modelType=<Tweet|Comment>
Body: { userId: "<user_id>" }
```

#### POST `/api/v1/comments`
Add comment to tweet
```
Query: modelId=<tweet_id>&modelType=Tweet
Body: { content: "Great post!" }
```

### User Endpoints

#### GET `/api/v1/users`
Get users with pagination (requires auth)
```
Query: offset=<number>&limit=<number>
```

## 🎨 UI Features

### Responsive Design
- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly interactions

### Theme System
- Light and dark mode support
- Persistent theme preferences
- Smooth transitions

### Loading States
- Skeleton loaders for images
- Loading spinners for actions
- Error handling with user feedback

### Interactive Elements
- Hover effects and animations
- Real-time like counters
- Smooth scrolling navigation

## 🔒 Security Features

- JWT token authentication
- Protected API endpoints
- Input validation and sanitization
- Secure file upload handling
- CORS configuration

## 🧪 Testing

### Backend Tests
```bash
cd server
npm test
```

### Frontend Tests
```bash
cd client
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Configure MongoDB connection
3. Set up AWS S3 credentials
4. Deploy to your preferred platform (Heroku, Vercel, etc.)

### Frontend Deployment
1. Build the production version:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- MongoDB for the flexible database solution
- AWS for reliable cloud services

## 📞 Support

For support and questions:
- Create an issue in the repository


---

**Skyfeed** - Connect, Share, Engage! 🚀
