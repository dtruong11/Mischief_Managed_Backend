# MISCHIEF MANAGED (BACKEND)

This is the backend of my Galvanize capstone project Mischief Managed. 
The frontend can be found at: https://github.com/dtruong11/Mischief_Managed_frontend

Mischief Managed (M & M) is a web application that takes away the stress of finding the right activities for parents and families. Parents can filter activities based on location, distance, cost,event type and age range. Parents can also view an interactive map of their search results. If parents are interested in any events, they can login to register and leave reviews. 

![](./MM1.gif)

Mischief Managed is also for organizers who would like to create events and share them with parents in the community. From the orgnization page, organizers can view their events, who signed up, and reviews from families. 

### Installing

Fork/ clone this repository
Create .env file in the root foler jut like env_sample
Make sure that you have PostgreSQL installed

Install the Node dependencies:

```shell
* run npm install
```

Create the development database:

```shell
* createdb capstone_dev
```

and run migrations and seeds:

```shell
* npm run knex migrate:latest
* npm run knex seed:run
```

Finally, start the server in development mode:

```shell
* npm run dev
```

## Deployment

The backend of this project has been deployed on Heroku at the address: https://capstonebackmischief.herokuapp.com

The frontend of this project has been deployed on Heroku at the address:
https://mischiefmanaged-capstone.herokuapp.com/

### Built With
* [JavaScript](https://www.javascript.com/) - The language
* [React Materialize](https://react-materialize.github.io/#/) - The css framework used
* [Semantic UI Calendar](https://github.com/arfedulov/semantic-ui-calendar-react) - Calendar
* [React Google Map](https://tomchentw.github.io/react-google-maps/) - Map 
* [React](https://reactjs.org/) - Frontend library
* [Redux](https://redux.js.org/) - State container
* [React Router](https://reacttraining.com/react-router/core/guides/quick-start) - Routing 
* [Express](http://expressjs.com/) - Backend framework
* [postgreSQL](https://www.postgresql.org/) - database
* [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
* [Node](https://nodejs.org/en/) - Package ecosystem
* [Heroku](https://www.heroku.com/) - A cloud platform to deploy your apps, whether front-end or backend.
* [Moment](https://momentjs.com/) - Npm package to manipulate dates and times in JavaScript.

## Author
* **Diep Truong**