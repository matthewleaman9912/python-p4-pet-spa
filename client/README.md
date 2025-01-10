# Pet Spa

The following ReadMe file is describing each aspect of the Pet Spa application. Starting with a brief explanation of the app, then wrapping up wiht Client and Server file breakdowns with function explanations

## App Breakdown

This application uses a many-to-many relationship, created through two one-to-many relationships, to link a connection of pets that attend the pet spa to services that the pet spa offers through reviews left about services and from pets. This relationship represents that a service can have many pets and a pet can have many services. In the app, a user can create a new pet to recieve services or leave reviews, a new service that can be provided to pets and have a review written about it, and a new review about a service from a pet with their own rating and summary. Each of these are on their own respective pages that can be navigated to with a navigation bar at the top of the page. 

## App Client

The client in this app is serving as the frontend of the application. Below are each of the components with a brief breakdown of what is in each file. 

    * App.js
        * This component calls each of the routes and sets up all of the functions that update state of the variables used to store the information received from the fetch requests to the server. This serves as the parent component for the application.
    * EditPet.js
        * This component uses formik to create a form to edit pets with the click of a button. This form sends a patch request to the server after it is saved.
    * Logo.js
        * This component is the logo image that can be imported to the app component.
    * NavBar.js
        * This component allows the formatting and creation of the navigation bar used within the app. This uses navlinks and creates a clickable link for each route in this application.
    * NewPet.js
        * This component creates a form using formik to allow the user to create a new pet instance with the inputted information.
    * NewReview.js
        * This component creates a form using formik to allow the user to create a new review instance with the inputted information.
    * NewService.js
        * This component creates a form using formik to allow the user to create a new service instance with the inputted information.
    * Pet.js
        * This component establishes the layout of the pet component that is rendered to the application. This application also creates the function used to delete a pet.
    * PetList.js
        * This component establishes the list of pet components while calling on the pet component to feed each prop to create the pet components as well. This component also calls on the newpet component to create the form for the petlist.
    * Service.js
        * This component establishes the layout of the service component that is rendered to the application.
    * ServicesList.js
        * This component establishes the list of service components while calling on the service component to feed each prop to create the service components as well.
    * index.css
        * This component creates the styling for this application. Each classname that is attached to individual components of this application have their own styling in this file. 
    * index.js
        * This file creates a root for the application and creates the browser router that allows the navigation bar to navigate throughout the application.
    * README.md
        * This is the file that you are reading now! This creates a list of explanations for waht this application does.
    
## App Server

The server in this app is serving as the backend of this application. Below is a brief breakdown of each component and what is in each file.

    * app.py
        * This file creates the get, post, delete and update components for each of the models, allowing them to access the database.
    * config.py
        * This file instintiates the app and database, while also initializing the REST api and CORS.
    * models.py
        * This file creates each of the models and its individual attributes. This file is what allows the creation of the many-to-many relationship between the pets and services through the reviews.
    * seed.py
        * This seeds the database with information fitting the stipulations of the models. This file uses faker and fake information to create the seed without having to individually type in information.

## Conclusion

This application is a great use of flask, cors, react, python and formik to create an application usable to perform CRUD actions on the information in the database.
















