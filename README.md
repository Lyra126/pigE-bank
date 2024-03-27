# Pig E-bank

## The Frontend
The frontend uses reactjs.

### Set up guide
* It is recommended to run the frontend on visual studio code.
* Once the file is open, run `cd .\pigEbank\frontend\` 
  * Run `npm install` if it is your first time running the coe
  * Run `npm start` to start the frontend

## The Backend
The backend uses spring boot. What we would consider a class is split into four 
sections to allow it to read from and write into the database.

### Set up guide
* Please make sure to accept the MongoDB invite that was sent to you so that you can
see the current database. Follow the instructions on the website to view the database.
  * I recommend for you to download MongoDB compass, but use whatever you prefer
* I recommend for you to use Intellij, as it already has support for both java
  and spring boot
  * If you decide to use another IDE, please look up how to set it up for java and spring boot

### Running the backend - Intellij
* I recommend to only open the file named \*Backend\* as its own project in intellij
* Press the green arrow in the top right corner to run the backend

### Running the backend - Terminal
* use: gradle bootRun
  * Do this in the backend file

### Backend site
* The site you should go to is -> localhost:8080
    * localhost:8080/newAccounts will show you what's currently in the database
      * In AccountController, where it says @RequestMapping("/newAccounts"), the
        part where it says "/newAccounts" represents the subDirectory

## References and code used to build the program:
* Frontend:
  * Setting up a cookie with an expiration date:
    * https://stackoverflow.com/questions/13154552/how-can-i-set-a-cookie-with-expire-time
    * https://stackoverflow.com/questions/40229782/react-cookie-reactjs-how-to-set-expiration-time-for-a-cookie
    * https://stackoverflow.com/questions/43744312/react-js-get-current-date
  * Adding a hyperlink:
    * https://www.altcademy.com/blog/how-to-add-hyperlink-to-button-in-reactjs/#:~:text=Method%201%3A%20Using%20the%20a%20tag,-The%20first%20method&text=tag%2C%20like%20so%3A-,import%20React%20from%20'react'%3B%20function%20App()%20%7B%20return%20(,when%20the%20button%20is%20clicked.
  * Creating the modals for the Settings page and update modals
    * https://getbootstrap.com/docs/5.3/components/modal/
    * https://www.youtube.com/watch?v=ZCvemsUfwPQ&ab_channel=PedroTech
  * Login Page:
    * https://www.youtube.com/watch?v=jwEbw0zJqiY
  * React Components:
    * https://ant.design/components/overview
    * https://react-tooltip.com/docs/getting-started
    * https://css-tricks.com/write-code-get-confetti/

* Backend:
  * Setting up the backend and the basic CRUD operations:
    * https://www.youtube.com/watch?v=O_XL9oQ1_To&t=2564s&ab_channel=CodeWithArjun
    * https://www.youtube.com/watch?v=5PdEmeopJVQ&t=1498s&ab_channel=freeCodeCamp.org
    * https://www.youtube.com/watch?v=KJHIR1oSVt8&ab_channel=TechieWorld
    * https://www.youtube.com/watch?v=qVNOw9TWwxo&ab_channel=JavaTechie
  * Mongodb Update operations:
    * https://medium.com/geekculture/types-of-update-operations-in-mongodb-using-spring-boot-11d5d4ce88cf
  * Mongodb's operations:
    * https://www.youtube.com/watch?v=c2M-rlkkT5o&t=456s&ab_channel=BroCode

* Readme:
  * https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
  * https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax