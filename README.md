# Title
<div>
<img src='https://img.shields.io/github/license/joeldore/Employee-Management-System'>  
<img src='https://img.shields.io/github/repo-size/joeldore/Employee-Management-System'>  
<img src='https://img.shields.io/github/languages/top/joeldore/Employee-Management-System'>
<img src='https://img.shields.io/github/last-commit/joeldore/Employee-Management-System'>
</div>

### Command line application for viewing and managing departments, roles, and employees in your company
<br>

## Table of Contents  
* [Features](#Features)  
* [Installation](#Installation)  
* [Usage](#Usage)  
* [Contributing](#Contributing)  
* [Future Development](#Future-Development)  
* [Questions](#Questions)

## Features
- Add new employees, roles, departments to company
- View all employees, or filter view by role or department
- Update an employee's role

## Installation
1. Install npm packages `Inquirer`, `Mysql`, optional `console.table`:
    ```
    npm i inquirer
    npm i mysql
    npm i console.table
    ```
2. Create database in MySQL using the provided [schema](./data/Company-Schema.sql) located in `data` directory
    * Prepopulate with data from [seed.sql](./data/seed.sql) file (optional)
3. *Make sure to update the `app.js` file with your MySQL username & password*

## Usage
<!-- - -> **[Walkthrough Video](#)** <-- -->
1. Run `node app` in terminal  
2. Select an option from the menu & follow prompts to view or manage items in the company database
3. Select `Exit` on main menu to exit the app

## Contributing
Contributions welcome!
1. Fork this repository  
2. Create a new branch  
3. Commit/push your changes  
4. Create a new pull request  

## Future Development
- Update an employee's manager
- View employees by manager
- DELETE employees/roles/deptartments from database
- View total utilized budget of a department

## Questions  
If you have any questions, feel free to create an [Issue](https://github.com/JoelDore/Employee-Management-System/issues) or contact me directly at dore.joel.dore@gmail.com

## License
This project is [MIT](https://github.com/JoelDore/Employee-Management-System/blob/main/LICENSE) licensed.  
© 2020 [Joel Dore](https://github.com/JoelDore)  

---
<br>

<div align="center">

[![github](assets/github.svg)](https://github.com/JoelDore) 
[![linkedin](assets/linkedin.svg)](https://www.linkedin.com/in/joeldore) 
<a href="https://www.buymeacoffee.com/JoelDore" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-white.png" alt="Buy Me A Coffee" height="32"></a>

</div>