# Features
- An easy way to track your personal daily spending.
- User can register and login through account management system (register via email). 
- User is able to review all records at home page.
- User can create, delete, edit every spending record.
- Sort by category is supported under home page. 
- User can review total amount of spending at home page.

<br/>
<br/>

# Getting Started
## **Prerequisites**
Make sure you already have `Node.js` and `npm` installed, and have `MongoDB` account.

<br>

## **Installing**
1. Clone the project
2. Go to the project directory
3. Install dependencies
```
npm install
```

<br/>

4. Prepare your `.env` file. Please refer to `.env.example` for more details. 

<br/>

5. Apply seed data.  
```
npm run seed
```

<br/>

6. Start the server
```
npm run star
```

<br/>

7. If you see  `Express is running on localhost:3000`  on terminal, it means the server is running successfully and you can enter following url to check this project:
```
http://localhost:3000
``` 

<br/>

8. Login test with seed users:  
  **email: user1@example.com**  
  **password: 12345678**

<br>

9. Stop the server
```
control + c
```
<br/>
<br/>

# Tech Stack
- Node.js
- Bootstrap ^4.3.1
- Font Awesome 5.8.1
- express ^4.16.4
- express-handlebars ^3.0.0
- handlebars-helpers ^0.10.0
- express-session ^1.17.1
- mongoose ^5.9.7
- method-override ^3.0.0
- bcryptjs ^2.4.3
- connect-flash ^0.1.1
- dotenv ^8.2.0
- passport ^0.4.1


<br/>
<br/>

# My Restaurant List
![Home Page](https://github.com/Yunya-Hsu/S3_W2_expense-tracker/blob/main/public/img/homePage.png)
---
![Create Page](https://github.com/Yunya-Hsu/S3_W2_expense-tracker/blob/main/public/img/createPage.png)
---
![Login Page](https://github.com/Yunya-Hsu/S3_W2_expense-tracker/blob/main/public/img/loginPage.png)
---