# Welcome to the Backend
The backend uses spring boot. What we would consider a class is split into four 
sections to allow it to read from and write into the database.

# Set up guide
* Please make sure to accept the MongoDB invite that was sent to you so that you can
see the current database. Follow the instructions on the website to view the database.
  * I recommend for you to download MongoDB compass, but use whatever you prefer
* I recommend for you to use Intellij, as it already has support for both java
  and spring boot
  * If you decide to use another IDE, please look up how to set it up for java and spring boot

# Running the backend - Intellij
* I recommend to only open the file named \*Backend\* as its own project in intellij
* Press the green arrow in the top right corner to run the backend

# Running the backend - Terminal
* use: gradle bootRun
  * Do this in the backend file

# Backend site
* The site you should go to is -> localhost:8080
    * localhost:8080/newAccounts will show you what's currently in the database
      * In AccountController, where it says @RequestMapping("/newAccounts"), the
        part where it says "/newAccounts" represents the subDirectory