# Resource Wall

Resource Wall is a multi-page app that allows learners to save learning resources like tutorials, blogs and videos in a central place that is publicly available to any user. Users can view resources that have been contributed by other users and can review these resources accordingly.

## Final Product

!["Screenshot of form submission"](https://github.com/dreamb0yDani/resources_wall/blob/master/documentation/images/form_submission.png?raw=true)
!["Screenshot of home page"](https://github.com/dreamb0yDani/resources_wall/blob/master/documentation/images/home_page.png?raw=true)
!["Screenshot of reviews page"](https://github.com/dreamb0yDani/resources_wall/blob/master/documentation/images/reviews.png?raw=true)

The live version of this web app is currently being maintained at https://tranquil-depths-66658.herokuapp.com/

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Connect-Flash
- Express
- EJS
- Bcrypt
- body-parser
- Cookie-Session

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local db information 
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
6. Run the server: `npm run local`
7. Visit `http://localhost:8080/`
