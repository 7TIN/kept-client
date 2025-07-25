### React Frontend (`kept-client`)

# Kept - React Frontend

This is the React frontend for the Kept interview experience sharing platform. It is built with Vite, React, and TypeScript.

**Backend Repository**: [https://github.com/7TIN/kept](https://www.google.com/search?q=https://github.com/7TIN/kept)

-----

## How to Run

To get a local copy up and running, follow these simple steps.

### Prerequisites

  * **Node.js**
  * **Bun, npm, or Yarn**

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/your_username/kept-client.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd kept-client
    ```
3.  **Install dependencies**
    ```sh
    bun install
    ```
4.  **Run the application**
    ```sh
    bun run dev
    ```

-----

## Environment Setup

You will need to create a `.env` file in the root of the project.

### `.env`

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_AUTH_BASE_URL=http://localhost:8080
```

  * `VITE_API_BASE_URL`: The URL for the API endpoints.
  * `VITE_AUTH_BASE_URL`: The base URL for authentication.

-----

