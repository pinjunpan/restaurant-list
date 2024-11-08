# Restaurant List

Create an application server using Node.js with Express and a database server using MySQL in the local environment.

- Dev C4 M1：Connect to the MySQL database and add CRUD functionality.
- Dev C4 M2：Refactor routing, add prompt messages and implement pagination.
- Dev C4 M3：Add registration, login, and authentication functionality.

## Features

- Users can register/login using their account and password or their Facebook account.
- Users can retrieve information about all restaurants from the database.
- Users can add, edit, and delete restaurant data.
- Users can view detailed information about a specific restaurant.
- Users can find a specific restaurant by searching for its name or category.
- Users can sort restaurants using a dropdown box format.
  ![image](https://github.com/pinjunpan/restaurant-list/blob/main/public/images/main.png)
  ![image](https://github.com/pinjunpan/restaurant-list/blob/main/public/images/list.png)

## Getting Started

### Prerequisites

- Node.js v20.15.1
- Nodemon v3.1.4
- Express v4.19.2
- Express-handlebars v7.1.3
- Bootstrap v5.1.3
- Font Awesome v6.6.0
- mysql2 v3.2.0
- sequelize v6.30.0
- sequelize-cli v6.6.0
- method-override v3.0.0
- passport v0.6.0
- passport-local ^1.0.0
- bcryptjs ^2.4.3
- dotenv ^16.0.3
- passport-facebook ^3.0.0

### Installing

1. Enter in the terminal

```
git clone https://github.com/pinjunpan/restaurant-list.git
```

2. Navigate to the folder where this project is stored in the terminal

```
cd restaurants
```

3. Install NPM in the folder and Nodemon in global environment

```
npm install
npm install -g nodemon
```

4. Set environment variable

```
export NODE_ENV=development
```

5. Run the project

```
npm run dev
```

6. Enter the URL in the browser

```
http://localhost:3000
```

## Authors

[**Maxine Pan**](https://github.com/pinjunpan)
