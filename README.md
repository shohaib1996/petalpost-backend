# PetalPost (Gardening Tips & Advice Platform)

A comprehensive full-stack web application designed for gardening enthusiasts and professionals. Users can share and discover gardening tips, care guides, seasonal advice, and engage with others through social interactions. This platform integrates premium content access via payments and encourages community interaction through upvotes, comments, and following systems.

## Live Demo

[PetalPost Live Link](https://petalpost-backend.vercel.app/)

## Features

### Core Features

1. **Full-Stack Web Application**  
   Built using Next.js, TypeScript, MongoDB, Express, and Node.js.
   
2. **User Authentication**  
   Secure JWT-based login, registration, and profile management.
   
3. **Responsive Design**  
   Works seamlessly across mobile and desktop devices.
   
4. **Rich Text Editor**  
   Users can create, edit, and share gardening tips with multimedia support (images, videos).
   
5. **Social Features**  
   - Upvote/Downvote system to rank posts.
   - Commenting and replying to posts.
   - Following other users to stay updated with their content.
   
6. **Payment Integration**  
   Premium content access via AAMARPAY or Stripe payment gateways.

7. **Advanced Search & Filter**  
   Users can filter content based on category, popularity, etc.

8. **Admin Dashboard**  
   Admin control panel to manage users, posts, and payments.

### Additional Features

- **News Feed**  
  Infinite scroll of the latest posts, sorted by upvotes.
  
- **Following System**  
  Follow/unfollow other gardeners.
  
- **Post Creation & Sharing**  
  Rich Text Editor supporting Markdown. Users can tag posts as Premium, accessible only to verified users.

- **Upvote & Downvote**  
  Sorting functionality to display the most popular content.

- **Profile Verification**  
  Verified users can unlock premium content and display a badge on their profile.

- **Favourite Posts**  
  Users can mark posts as favourites for easy access later.

- **Micro Animations**  
  Smooth transitions and hover effects for an enhanced user experience.

- **PDF Generation**  
  Generate PDFs of gardening tips for offline use.

- **Content Sharing**  
  Copy the post URL to the clipboard for easy sharing.

- **Gardening Quotes**  
  Display inspiring gardening quotes on the homepage.

## Project Setup

### Environment Variables

To run this project locally, create a `.env` file and add the following variables:

```
PORT=5000
DB_URL=mongodb+srv://petal-post-db:u3JHj5zFM7ORGSS6@cluster0.lapzl7c.mongodb.net/petal-post-db?retryWrites=true&w=majority&appName=Cluster0
JWT_ACCESS_SECRET=9174b804d5b0824161a740d01807a9698a603d850c33c5148f9875cf7f6d2805f5198805b75799ea01d53b8f446638c9c1e052425e7ce97c3278a32192461125
JWT_ACCESS_EXPIRES_IN=1d
STRIPE_SECRET_KEY=sk_test_51OEE1IHnH3ExHWvMV0Zi5APgvxBOn43R44iDuN0Xt9lUbnLPAK6ThlQ4JgpqrfNTl5DVm7uUKLkXGSosowkeD8MR00buS4ymxR
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shohaib1996/petalpost-backend.git
   cd petalpost-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

1. Start the server:
   ```bash
   npm run start:dev
   ```

2. Open your browser and go to:
   ```
   http://localhost:5000
   ```

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payments**: Stripe / AAMARPAY Integration
