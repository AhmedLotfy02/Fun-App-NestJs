
<h1>FunApp</h1>

<div class="toc">
  <h2>Table of Contents</h2>
  <ul>
      <li><a href="#overview">Overview</a></li>
      <li><a href="#prerequisites">Prerequisites</a></li>
      <li><a href="#getting-started">Getting Started</a>
          <ul>
              <li><a href="#clone-the-repository">Clone the Repository</a></li>
              <li><a href="#configure-the-database">Configure the Database</a></li>
              <li><a href="#run-the-application">Run the Application</a></li>
              <li><a href="#access-the-api">Access the API</a></li>
              <li><a href="#swagger-documentation">Swagger Documentation</a></li>
          </ul>
      </li>
      <li><a href="#api-endpoints">API Endpoints</a>
          <ul>
              <li><a href="#user">User</a>
                  <ul>
                      <li><a href="#get-user-by-id">Get User by ID</a></li>
                      <li><a href="#create-user">Create User</a></li>
                  </ul>
              </li>
          </ul>
      </li>
      <li><a href="#database-schema">Database Schema</a></li>
      <li><a href="#error-handling">Error Handling</a></li>
      <li><a href="#running-tests">Running Tests</a>
          <ul>
              <li><a href="#controller-tests">Controller Tests</a></li>
              <li><a href="#service-tests">Service Tests</a></li>
          </ul>
      </li>
      <li><a href="#contribution">Contribution</a></li>
      <li><a href="#contact">Contact</a></li>
  </ul>
</div>

<h2 id="overview">Overview</h2>
<p>FunApp is a NestJS application designed for managing users, including operations for creating and retrieving user profiles. The application uses PostgreSQL for the database and TypeORM as the ORM. The system includes secure API endpoints for various CRUD operations, and it is fully tested with JestJS.</p>

<h2 id="prerequisites">Prerequisites</h2>
<ul>
  <li>Node.js v14 or later</li>
  <li>npm v6 or later</li>
  <li>PostgreSQL v12 or later</li>
  <li>NestJS CLI (optional)</li>
  <li>Postman or any API testing tool (optional)</li>
</ul>

<h2 id="getting-started">Getting Started</h2>

<h3 id="clone-the-repository">Clone the Repository</h3>
<pre><code>git clone https://github.com/your-username/FunApp.git
cd FunApp</code></pre>

<h3 id="configure-the-database">Configure the Database</h3>
<ol>
  <li>Make sure PostgreSQL is installed and running on your machine.</li>
  <li>Create a new PostgreSQL database:</li>
  <pre><code>psql -U postgres
CREATE DATABASE funapp_db;</code></pre>
  <li>Update the <code>app.module.ts</code> file with your PostgreSQL database configuration:</li>
  <pre><code>TypeOrmModule.forRoot({
type: 'postgres',
host: 'localhost',
port: 5432,
username: 'postgres',
password: 'your_password',
database: 'funapp_db',
entities: [__dirname + '/**/*.entity{.ts,.js}'],
synchronize: true,  // Set to false in production
})</code></pre>
</ol>

<h3 id="run-the-application">Run the Application</h3>
<p>Use npm to install dependencies and run the application:</p>
<pre><code>npm install
npm run start</code></pre>

<h3 id="access-the-api">Access the API</h3>
<p>The application will start on <code>http://localhost:3000</code>.</p>

<h3 id="swagger-documentation">Swagger Documentation</h3>
<p>The application uses Swagger for API documentation. Swagger is automatically set up when you start the application, allowing you to interact with and explore the API directly from your browser.</p>
<p>You can access the Swagger UI at <code>http://localhost:3000/api</code>.</p>
<p>The Swagger UI provides a user-friendly interface where you can:</p>
<ul>
  <li>View all available API endpoints</li>
  <li>See detailed information about each endpoint, including parameters and response formats</li>
  <li>Test API endpoints directly from the browser</li>
</ul>

<h2 id="api-endpoints">API Endpoints</h2>

<h3 id="user">User</h3>

<h4 id="get-user-by-id">Get User by ID</h4>
<ul>
  <li><strong>Endpoint:</strong> <code>/user/{user_id}</code></li>
  <li><strong>Method:</strong> <code>GET</code></li>
  <li><strong>Description:</strong> Retrieves a user by their ID.</li>
  <li><strong>Response:</strong></li>
  <pre><code>{
"id": 1,
"name": "John Doe",
"email": "johndoe@example.com",
"city": "Cairo"
}</code></pre>
</ul>

<h4 id="create-user">Create User</h4>
<ul>
  <li><strong>Endpoint:</strong> <code>/user/signup</code></li>
  <li><strong>Method:</strong> <code>POST</code></li>
  <li><strong>Description:</strong> Creates a new user.</li>
  <li><strong>Request Body:</strong></li>
  <pre><code>{
"name": "Jane Doe",
"email": "janedoe@example.com",
"latitude": 30.0444,
"longitude": 31.2357
}</code></pre>
  <li><strong>Response:</strong></li>
  <pre><code>{
"id": 2,
"name": "Jane Doe",
"email": "janedoe@example.com",
"city": "Cairo"
}</code></pre>
</ul>

<h2 id="database-schema">Database Schema</h2>
<p>The FunApp database schema includes the following entity:</p>
<ul>
  <li><strong>User:</strong>
      <ul>
          <li><code>id</code>: Primary key</li>
          <li><code>name</code>: The name of the user</li>
          <li><code>email</code>: The email of the user (unique)</li>
          <li><code>city</code>: The city derived from the user's coordinates</li>
      </ul>
  </li>
</ul>

<h2 id="error-handling">Error Handling</h2>
<p>FunApp includes comprehensive error handling using built-in NestJS exceptions and a global exception filter to ensure consistent and informative error responses.</p>

<h3>Examples:</h3>
<ul>
  <li><strong>NotFoundException:</strong> Thrown when a user is not found in the database.</li>
  <li><strong>BadRequestException:</strong> Thrown when a user with the same email already exists or when validation fails.</li>
</ul>
<p>Global exception handling ensures that all uncaught exceptions are caught and returned with a consistent error structure.</p>

<h2 id="running-tests">Running Tests</h2>
<p>FunApp includes unit tests for both the controllers and services using JestJS. These tests ensure that the application logic works correctly and that the API endpoints behave as expected.</p>

<h3 id="controller-tests">Controller Tests</h3>
<p>These tests validate the functionality of the API endpoints:</p>
<ul>
  <li><code>getUserById</code>: Tests retrieving a user by their ID.</li>
  <li><code>createUser</code>: Tests creating a new user.</li>
</ul>

<h3 id="service-tests">Service Tests</h3>
<p>These tests validate the business logic of the services:</p>
<ul>
  <li><code>getUserById</code>: Tests retrieving a user by their ID.</li>
  <li><code>createUser</code>: Tests creating a new user.</li>
</ul>

<h3>Run Tests</h3>
<p>To run the tests, use the following command:</p>
<pre><code>npm run test</code></pre>

<h2 id="contribution">Contribution</h2>
<p>Feel free to fork this repository and contribute by submitting pull requests. Make sure to follow the project's coding standards and include tests for new features.</p>


