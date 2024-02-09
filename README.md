# Final Integrator Project

Development of a *Purchasing Management System* to manage information on Suppliers, Products and Purchase Orders.

# How to use

*Clone repository*
------------------

Run the backend by opening the project in an IDE of your choice. The project is located in the Purchasing-Management/project-back folder. Once the project is opened, you need to perform a Maven install on the pom.xml file.

Once you have completed the Maven install, you can run the application successfully by simply running it or opening the boot dashboard and starting the application there.

When the application initializes, it will automatically create tables and insert some default data.

Once you have the backend running, you need to initialize the frontend. To do this, you need to open Visual Studio or any other app you use, open a terminal, and navigate to the folder where the project is located. That folder is located in Purchasing-Management/project

Once you are in that folder, you need to perform an npm install -g @angular/cli

Once Angular is installed, you can simply run ng serve -o, and you will be able to visualize the complete app.

# Things to keep in mind:

Once you run the backend for the first time, if you stop the execution of the backend, remember that you need to comment out these 2 lines in the application.properties file:

spring.jpa.defer-datasource-initialization=true
spring.sql.init.mode=always

and save changes. This way, if you want to use the same database again, you won't encounter any issues.

#Remember to also have Node.js and npm installed. If you encounter permission issues or any similar errors regarding machine-level execution policy, remember to execute the following command:

Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

This will ensure that you can run scripts on your machine without encountering policy-related errors.
