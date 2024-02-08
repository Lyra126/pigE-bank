# Requirement to Properly Run Using a Database:
1. The user must have mySQL installed, and it's recommended to use mySQL workbench or any other alternatives such as phpMyAdmin
2. It is recommended to use Intellij when running the backend, since it already supports Spring Boot
   * If you want to use VSCode, you may need to install some extensions beforehand
# How to change the database information so that the backend can run locally
Currently, the backend must run locally as is based on the users local database.\
To use a local database:
1. Go to pigEbank/src/main/resources/application.properties
2. On line 3 (spring.datasource.url) set it equal to: jdbc:mysql://localhost:3306/*Database Name\*
3. On line 4 (datasource.username), if your username is not 'root', change it to your current username\
    * You most likely won't need to change this
4. On line 5 (datasource.password)
   5. If you don't have a password, remove where it says 'password'
   6. If you have another password, change it to your password where it says 'password'
   