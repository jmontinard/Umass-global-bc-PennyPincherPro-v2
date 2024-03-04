# Umass-global-bc-PennyPincherPro-v2
**Frontend (React)**

```markdown
project-root
|-- public
|   |-- index.html
|-- src
|   |-- components
|       |-- App.js
|       |-- Home.js
|       |-- Dashboard.js
|       |-- Nav.js
|       |-- LoginForm.js
|       |-- RegisterForm.js
|   |-- api
|       |-- plaid.js
|   |-- index.js
|-- package.json

**Backend (Node.js with Express)**
budget-app-backend
|-- app.js
|-- server.js
|-- package.json
|-- .env
|-- models
|   |-- User.js
|   |-- PlaidUser.js
|   |-- Budget.js
|-- routes
|   |-- plaidRoutes.js
|   |-- userRoutes.js
|   |-- authRoutes.js
|   |-- dashboardRoutes.js
|-- middleware
|   |-- auth.js


Description:

budget-app-backend: The root folder of your application.

app.js: The main application file where you set up Express, middleware, Passport.js, and routes.

server.js: The file where you start your server and connect to MongoDB.

package.json: The file that lists the packages your project depends on, information about your project, and other metadata.

.env: The file where you store environment variables, such as your Plaid client ID and secret. This file should not be committed to your repository.

models: The directory where you define your Mongoose models.

User.js: The model for your users.
PlaidUser.js: The model for the Plaid data associated with each user.
Budget.js: The model for the budget goals of each user.
routes: The directory where you define your routes.

plaidRoutes.js: The routes for Plaid functionality.
userRoutes.js: The routes for user registration.
authRoutes.js: The routes for user authentication (login and logout).
dashboardRoutes.js: The routes for the dashboard, which include fetching accounts, transactions, profile information, and budget goals, and creating budget goals.
middleware: The directory where you define your middleware functions.

auth.js: The middleware function for checking if a user is authenticated.

How to run:
for the backend create a .env file keys:
MONGODB_ATLAS_CONNECTION="your-connect-string"
SECRET_OR_KEY=yourSecret
PORT=5001


PLAID_CLIENT_ID="your-plaid-client-id"
PLAID_SECRET="your-plaid-client-secret"


NOTE:
to create a mongoDB atlas account to get the connection string follow this:
https://www.youtube.com/watch?v=bBA9rUdqmgY

For Plaidapi create a free account: Go to Plaid’s website and create an account
Click “Get API Keys” and get your keys for the Sandbox Environment.

install dependencies for both the client/client and backend npm install and the npm init to initalize the backend then to run the client its npm start and the backend is nodemon server.js

