# DineFlow API

DineFlow API is a backend service built with Express.js designed to manage the flow of orders and interactions between customers, waiters, and chefs in a restaurant setting. The API facilitates user authentication, order management, and real-time communication between staff members.

## Project Structure
project-root/
│
├── src/
│ ├── config/
│ │ └── ...
│ │
│ ├── controllers/
│ │ └── ...
│ │
│ ├── middlewares/
│ │ └── ...
│ │
│ ├── models/
│ │ └── ...
│ │
│ ├── routes/
│ │ └── ...
│ │
│ ├── services/
│ │ └── ...
│ │
│ ├── sockets/
│ │ └── ...
│ │
│ ├── utils/
│ │ └── ...
│ │
│ ├── app.js
│ └── server.js
│
├── tests/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── ...
├── public/
│   ├── img/
│   └── ...
├── .env
├── .gitignore
├── package.json
└── README.md


## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/RicardoArsv/dineflow-api.git
    cd dineflow-api
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and configure your environment variables. For example:
    ```env
    DATABASE_URL=your_database_url
    PORT=3000
    ```

4. **Run the development server**:
    ```bash
    npm run dev
    ```

## Scripts

- **`npm run dev`**: Starts the development server with Nodemon.

## Dependencies

- **express**: Web framework for Node.js.
- **picocolors**: Minimal color library for terminal output.
- **swagger-jsdoc**: Utility to generate Swagger documentation.
- **swagger-ui-express**: Middleware to serve Swagger UI.

## Dev Dependencies

- **nodemon**: Automatically restarts the server on file changes.
- **standard**: JavaScript style guide, linter, and formatter.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for more details.

---

Developed by **RicardoArsv**.