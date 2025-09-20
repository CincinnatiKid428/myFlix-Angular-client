![Matinee navigation bar brand logo](/src/assets/images/matinee4-transparent.png) 
# myFlix-Angular-client
## 🎥 Description

This project is a rewrite of the React *Matinee* (myFlix) application using Angular.  The application will retain its key features (noted below) and will still use the API under the **movie_api** project repository.  For details on the API, see [Backend API Documentation](https://fast-taiga-09096-54ce00eca848.herokuapp.com/documentation).
<br/>

*Matinee* is a single-page application that allows movie enthusiat users to find information about movies, create accounts where they can store their favorite movies and access them through their profile view and manage their account and profile information.

## 🎬 Features
- Allows users to register (username, password, email & birthdate)
- Allows users to login with username & password, and logout
- Allows for persistent login should the user close the browser and navigate back to the app without logout
- Displays list of movies with an image & title that can be clicked for more information about the movie
- Allows users to get additional information about genre and director when viewing details about a specific movie
- Allows users to update account information (password, email & birthdate)
- Allows users to add/remove movies from a favorites list
- Allows users to deregister their account
  
## 🎛 Usage

### 👋 <ins>Welcome Page</ins>
Users will initially be presented a welcome page with buttons for options to **Sign Up** or **Log In**.  The navbar will not render until the user has logged into their account.<br> 
![Matinee Welcome Page](/src/assets/images/welcome-page.png)
<br><br>

Clicking/tapping the **Sign Up** button will open the user registration dialog where a user can enter their desired account info and register with the backend.  A success or failure message will be displayed at the bottom of the screen to indicate the response.
or they can use the navbar menu to go to a singup page to create an account:<br>
![Matinee Signup Dialog](/src/assets/images/user-registration-form.png)
<br><br>

Clicking/tapping the **Log In** button will open the login dialog where a user with an existing account can provide their Username and Password:<br>
![Matinee Login Dialog](/src/assets/images/user-login-form.png)
<br><br>

If the user was logged in and did not log out from a prior visit to the application they will keep a persistent login in the application and automatically be directed to the movies listing in the Main View.

<br><br>
### 🍿 <ins>Main View (Movie Card)</ins>
After authentication, users will be presented with a view displaying a list of movie cards, a movies filter and the navbar will render and be functional.<br>
![Matinee Movie Card Main View](/src/assets/images/screenshot1.png)

<br><br>
Depending on the screen size, the navbar may contain three buttons for **Movies**, **Profile** and **Logout** or those options will be placed into a collapsed sandwich menu button as seen below:<br>
![Matinee Navbar](/src/assets/images/nav-menu-hide-show.png)
(Left: Navbar prior to authentication; Top-Right: Authenticated sandwich menu; Bottom-Right: Authenticated button navbar)

<br><br>
The movies filter, seen above preceeding the movie card items, will allow a user to view movies that are **Favorites**, **Non-Favorites**, or **All** movies by clicking on the corresponding selector.  The filter defaults to **All** when the component renders.

<br>
Each individual movie card will have several buttons that display information or add/remove a movie from the user's favorites.  

![Matinee Movie Card Item](/src/assets/images/movie-card-item.png)

- The **Genre** button will bring up a dialog with a description of the genre of the movie.
- The **Director** button will show biographical and other information about the movie's director.
- The **Details** button will show more information about the movie itself.
- The Add/Remove Favorite toggle button (heart shape) will add the movie to favorites if the heart is toggled on (solid red heart) and remove it from favorites if toggled off (outlined gray heart).

![Matinee Genre Dialog](/src/assets/images/genre-dialog.png)
(Genre Information)
<br><br>

![Matinee Director Dialog](/src/assets/images/director-dialog.png)
(Director Information)
<br><br>

![Matinee Movie Details Dialog](/src/assets/images/movie-details-dialog.png)
(Movie Details)
<br><br>

![Matinee Favorite On/Off](/src/assets/images/favorite-toggle.png)<br>
(Favorite Toggle - Left: Favorite Off, Right: Favorite On)
<br><br>

### 📃 <ins>Profile Page</ins>
Users selecting **Profile** from the navbar will be shown their current account information, a form to update their account information and buttons to **Update Account** or **Delete Account**. 
<br>⚠*Note: All fields must be filled out to complete an account info update, even if you enter the same value as previously used:*
![Matinee Profile Page](/src/assets/images/profile-page.png)
<br><br>

## 📝 Debug Logging in *Matinee*
Simple logging is used for this application and controlled through `src/app/app-settings.ts` where you will find the following setting:
```
export const AppSettings = {
  DEBUG_LOG: false // Set to true to enable debug application logging.
};
```
*Note: The default value will be `false`, disabling debug logging.*
<br>

## 🤖 Technologies Used
- Angular
- Angular Material
- [ChatGPT](https://chatgpt.com)
- [TypeDoc](https://typedoc.org/)
### <ins>Dependencies</ins>
- movie_api - See https://fast-taiga-09096-54ce00eca848.herokuapp.com/documentation
- MongoDB

---
# MyFlixAngularClient

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

