# Full Stack Airbnb Clone with Next.js 13
## React, Tailwind CSS, Prisma, MongoDB, NextAuth

This repository houses a comprehensive clone of Airbnb built with Next.js, showcasing advanced features such as authentication, property management, and advanced search functionalities.

[Screenshot]


### 🌟 Features
- Design & Responsiveness: Leveraging Tailwind CSS for modern UI components and responsiveness.
- Authentication: Supports email/password, Google, and GitHub authentication using NextAuth.
- Image Handling: Utilizes Cloudinary CDN for efficient image uploads and rendering.
- Form Management: Incorporates react-hook-form for client-side form validation.
- Notifications: Uses react-toast for displaying server-side error messages.
- Date Handling: Integrated react-date-range for property booking date ranges.
- Booking System: Robust reservation and cancellation system for guests and property owners.
- Property Management: Users can create, update, or delete their properties.
- Search Functionality: Advanced filtering by category, dates, location, guests count, rooms, and more.
- Favorites: Users can bookmark their favorite properties.
- Shareable Filters: Generate URLs with applied filters to share listings view.
- Direct Database Fetch: Fetch data in server components without traditional API endpoints.
- New Next.js Features: Implements new Next.js 13 features like error.tsx, loading.tsx, and more.
- Relations Handling: Efficient management of relations between server and child components.

### 🔧 Prerequisites
Ensure you have **Node version 14.x** installed.

### 🚀 Getting Started
1. Clone the repository
```shell
git clone https://github.com/YourUsername/airbnb-clone.git
```
3. Install dependencies
Navigate to the project directory:
```shell
cd airbnb-clone
```
Then install the necessary packages:
```shell
npm install
```
3. Setup environment variables
Create a .env file in the root directory and add the following:

```js
DATABASE_URL=YOUR_MONGODB_CONNECTION_STRING
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
GITHUB_ID=YOUR_GITHUB_ID
GITHUB_SECRET=YOUR_GITHUB_SECRET
NEXTAUTH_SECRET=RANDOM_STRING_SECRET
CLOUDINARY_URL=YOUR_CLOUDINARY_URL
```
Replace placeholders (YOUR_MONGODB_CONNECTION_STRING, etc.) with actual values.

4. Initialize Prisma
Set up your database schema:
```shell
npx prisma db push
```
5. Run the application
Start the development server:
```shell
npm run dev
````
📜 Available Commands
For convenience, here are some of the primary npm scripts you can run:

|  Command	      |Description                                |
| :-------------- | :---------------------------------------- |
|  dev	          |Starts the application in development mode |
|  build          |Builds the application for production      |
|  start          |Starts the production server               |

### Server-Side Components:
These components primarily deal with direct database interactions, API route handling, authentication, and other backend operations.

#### 1. Database Models:
- User
- Account
- Listing
- Reservation
#### 2. API Routes:
- User registration, login, and social auth
- Listings (creation, retrieval, favorites functionality)
- Reservations (creation, deletion, retrieval)
#### 3. Actions/Helpers:
- getCurrentUser: Fetches the authenticated user's details.
- getListingById: Fetches a specific listing by its ID.
- getReservations: Retrieves reservations (for both the host and the guest perspective).
- Database connection setup (prismadb.ts).

### Client-Side Components:
These components handle the user interface, user experience, and direct interaction with server-side components through API calls.

#### 1. Core UI Components:
- Navbar (and its children, e.g., user menu, search bar)
- Modal: A reusable modal component for different purposes, like registration.
- ListingCard: Display for individual listings.
- HeartButton: Allows users to favorite a listing.
#### 2. Pages and Associated UI:
- Home/Listing overview (index.tsx or similar)
- Individual listing view (ListingClient).
- User's reserved listings (TripsClient).
- Host's view of their property reservations (ReservationClient).
#### 3. Hooks and State Management:
- useRegisterModal, useLoginModal: Zustand stores for managing modals.
- useFavorite: Hook for the favorite functionality.
- Others (like useCountries for location selection).
#### 4. Miscellaneous UI Components:
- Date range picker (calendar)
- Input components (Input.tsx, ImageUpload, Counter...)
- Country selector, map components, category boxes, etc.

### Others:
#### 1. Authentication:
- Using next-auth for both regular and social logins.
#### 2. External Services:
- Cloudinary: For image hosting.
- Next-auth providers (like Google and GitHub) for social logins.

### 📖 Libraries & Frameworks:
- axios for HTTP requests.
- react-hot-toast for user notifications.
- react-date-range for the calendar component.
- prisma: ORM for interacting with the database.
- next-cloudinary: For image handling.
- leaflet and react-leaflet for map functionality.


🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

License
This project is open source and available under the MIT License.




## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
