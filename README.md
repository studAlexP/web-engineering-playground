# Web Engineering Coding Playground Template

This repository is designed as the foundation for coding playgrounds in the Web Engineering course. It offers a structured space for experimenting with and mastering various web development technologies and practices. 
The project is based on [this](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Accessibility_troubleshooting) repository from MDN.

The project introduces a lot of code smells for you to tackle. 
**Lets get coding!**

## Submission Details and Deadlines
* Coding playgrounds are **individual** work
* There will be 2 serparate submissions:
  * [Base Playgrounds](#base-coding-playgrounds): Submission Deadline **03.11.2024**
  * [Extended Playgrounds](#extended-coding-playgrounds): Submission Deadline **16.01.2025**
* The playgrounds will be guided through in our sessions - still there will be distance work!
* Use this base template to create your project repository.
* Each playground is linked in the corresponding course section.
* You can find the submissions at the bottom of the Moodle course.
  

## Features

- Wonderful UI-design :heart_eyes:
- Loads bear data using [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) :bear:
  - Original Wikipedia Page can be found [here](https://en.wikipedia.org/wiki/List_of_ursids)
- Worst JS coding practices :cold_sweat:
- No Build and Dependency Management at all :fire:



# Base Coding Playgrounds

## K.O. Criteria
* No JS Frameworks allowed to solve the base coding playgrounds (e.g. Vue.js, Angular, React, Svelte,...) - don't panic we will come to them!
* No CSS Libraries allowed (e.g. Bootstrap, Material, Tailwind, ...)

## Submission
Submit your coding repository link in Moodle. Send me an invitation to your repository if it is set to private:
> GitHub: leonardo1710
> 
> GitLab: leon.freudenthaler@fh-campuswien.ac.at

## 1. JS Playground (10 Pts.)
The provided base project template contains some bugs and bad JS coding practices for you to fix in your first playground. Take a look into the component files and get a grasp of the inner workings of the provided project.
> **ATTENTION: After finishing the JS Playground please create a commit or branch and link it below. Otherwise it is not possible to grade your 1. submission, since we will switch to TypeScript afterwards!**
> 
> **This is my JS Playground commit/branch:** https://github.com/studAlexP/web-engineering-playground/tree/81824f7d461bfc1f3b27e556848cbcc91aafd1f1

**Tasks:**
Fix application code and answer the questions:
* (2) Adapt the code to use ``async/await`` instead of the ``then()``-callback hell and refactor the functions to use arrow function syntax instead of ``function()``-syntax.
* (2) Add proper error handling to the code using ``try/catch`` and provide useful error messages to the users. Additionally, check the image URL availability before rendering the images in HTML. Provide placeholder images if the given URL does not exist.
* (1) Extract the range value from the provided Wikitext (response from the API). Examine the provided Wikitext format inside `extractBears` function. 
* (1) Split the code into separate modules with regards to clean separation of concerns.
* (1) Eliminate all other bad coding practices you can find. 
* (3) Answer the following questions and provide some examples inside the ``Readme.md`` file. 

>  **What bad coding practices did you find? Why is it a bad practice and how did you fix it?**

1. Usage of **var** instead of **let** or **const**

Bad because: let or const have a block-level scope, whereas var has a function scope. This can le to hoisting
and scope leakage --> Let or const will help with bug reducing.

Fixed by: changing var to let or const
```JS
var someVariable = 1 // Bad
let someVariable = 1 // Good --> used if someVariable will change/get reassigned
const someVariable = 1 // Good --> used if the value wont change
```

2. Callbacks with .then()

Bad because: makes code hard to read and maintain

Fixed by: usage of async/await

3. No or lack of error handling

Bad because: If something fails the error wont get handled the right way which could even lead to a system failure

Fixed by: Implementing try/catch especially for await operations and have a fallback mechanisms
```JS
// Before
const getBearData = async () => {
    const data = await fetchData(baseUrl, params);

    if (!data) {
      console.error("Error fetching bear data");
      return;
    }

    const wikitext = data.parse.wikitext['*'];
    const bears = await extractBears(wikitext);
    
    displayBears(bears);
};
// After
const getBearData = async () => {
  try {
    const data = await fetchData(baseUrl, params);

    if (!data) {
      console.error("Error fetching bear data");
      return;
    }

    const wikitext = data.parse.wikitext['*'];
    const bears = await extractBears(wikitext);

    if (bears && bears.length > 0) {
      displayBears(bears);
    } else {
      console.warn('No bears found.');
    }
  } catch (error) {
    console.error("Error fetching bear data");
  }
};
```

4. DOM manipulation with innerHTML

Bad because: performance issues & security risks (XSS)

Fixed by: replace innerHTML with DOM methods (e.g. document.createElement())
```JS
// Before
moreBearsSection.innerHTML += `
                  <div>
                      <h3>${bear.name} (${bear.binomial})</h3>
                      <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
                      <p><strong>Range:</strong> ${bear.range}</p>
                  </div>
              `;
// After
const bearDiv = document.createElement('div');
const bearHeading = document.createElement('h3');
const bearImage = document.createElement('img');
const bearRange = document.createElement('p');

bearHeading.textContent = `${bear.name} (${bear.binomial})`;
bearImage.setAttribute('src', bear.image);
bearImage.setAttribute('alt', bear.name);
bearImage.style.width = "200px";
bearImage.style.height = "auto";

bearRange.innerHTML = `<strong>Range:</strong> ${bear.range}`;

bearDiv.appendChild(bearHeading);
bearDiv.appendChild(bearImage);
bearDiv.appendChild(bearRange);

moreBearsSection.appendChild(bearDiv);
```
5. Modularity

Bad because: If everything is in one place its hard to maintain, test and extend the app

Fixed by: identifying different modules and split the code accordingly


## 2. Dependency- and Build Management Playground (10 Pts.)
Build the application with ``npm`` and a build and a dependency management tool of your choice (e.g. [Vite](https://vitejs.dev/), [Webpack](https://webpack.js.org/), or others). 

Here are some additional resources: [Package Management and Bundling](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2-Package-Management,-Build-Management-and-Modules), [Vite Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2.1-Vite-Web-Application-Setup), [Webpack Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2.2-Webpack-Web-Application-Setup).

**Tasks:**
* (1) Integrate `npm` and a build management tool into your project.
* (2) Configure your project to use Typescript as your primary development language and adapt the code and file extensions respectively.
* (2) Use ESLint and Prettier inside your project - rulesets can be found below.
* (1) Keep your builds clear and add dependencies to the right build (e.g. do not add dev dependencies inside the production build and vice versa).
* (1) Define the following tasks within `npm scripts`:
  * `dev`: starts the development server
  * `build`: runs the typescript compiler and bundles your application - bundling depends on your chosen build tool (e.g. Vite, Webpack) but typically bundles multiple files into one, applies optimizations like minification and obfuscation and outputs final results to a `dist` or `build` directory.
  * `lint`: runs ESLint on all  `.js` and `.ts` files in your projects `/src` directory
  * `lint:fix`: runs and also fixes all issues found by ESLint
  * `format`: formats all `.js` and `.ts` files in your projects `/src` directory
  * `format:check`: checks if the files in the `/src` directory are formatted according to Prettier's rules.
* (1) Configure a pre-commit hook that lints and formats your code using [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged). A tutorial can be found [here](https://dev.to/shashwatnautiyal/complete-guide-to-eslint-prettier-husky-and-lint-staged-fh9).
* (2) Answer the question at the end of this section inside ``Readme.md`` file: 


**ESLint Configurations**

Use ESLint configs [standard-with-typescript](https://www.npmjs.com/package/eslint-config-standard-with-typescript) and [TypeScript ESLint Plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin).
Your `.eslintrc` file should have the following extensions:
```.eslintrc.yml
...
extends:
  - standard-with-typescript
  - plugin:@typescript-eslint/recommended
  - plugin:prettier/recommended
  - prettier
...
```
 
**Prettier Configurations**

Apply the following ruleset for Prettier:
``` .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 80
}
```

>  **What improvements in your codebase were introduced by using TS instead of JS? Name at least 3 and explain why.**

1. Static Typing

Since TypeScript uses types for variables, paramters and return values like "string", it improves error detection. In this case we can see type-related errors during the compilation, whereas in JavaScript we only see them during runtime. --> Less prone to errors in production is always good

2. Better Readability

Because of the static typing as mentioned above, we also get an improved readability in our code, since we have a clear indication of the types of our values. This is useful for future developers so they can more easily and quickly understand the expected types a function takes and its also easier to understand the structure. --> A clear expectation of the function signature and object structure increases the consistency of the codebase

3. Faster refactoring

When refactoring we have to keep the functionality intact. Since we know more about variables and such, we have an easier time moving things around. This is tightly coupled with 1. and 2..

## 3.	CI/CD Pipeline Playground (5 Pts.)
Implementation of a CI/CD pipeline to automate the development and deployment process – write automated tests.

Here are some additional resources: [GitHub Actions Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/3.2-CI-CD-Pipeline-with-Github-Pages-and-Github-Actions) and [GitHub Actions Docs](https://docs.github.com/en/actions).

**Tasks:**
* (1.5) Write at least 2 meaningful unit tests (use [Vitest](https://vitest.dev/) or [Jest](https://jestjs.io/)) for your project and configure the following tasks in ``npm scripts``:
  * `test`: runs all files that include `.test.` or `.spec.`, e.g.: `example.test.ts`
  * `test:coverage`: runs tests like `test` but also creates a test coverage report
* (1) Configure **2 Workflows** in GitHub Actions, one for development and one for deployment:
  * Create a `development` branch inside your repository
  * (1) Development Workflow should at least test and lint your code when developers push to branch `development`
  * (1) Deployment Workflow is triggered when developers push into `main` branch. It should at least test, lint and build your source code. Afterwards the build artifacts of your application should be automatically deployed to Github Pages (or another hosting provider of your choice). 
* (0.5) Reuse existing workflows or jobs whenever possible! 

## 4.	Accessibility Playground (5 Pts.)
You might have noticed that the base project has a number of accessibility issues - your task is to explore the existing site and fix them.
Use the tools presented in our accessibility workshop to test the accessibility in your project.

**(0.5) Color** 

Test the current color contrast (text/background), report the results of the test, and then fix them by changing the assigned colors.

To check whether the color contrast is fine I used the accessibility tab on my browser (Firefox) and checked for issues
with the contrast. I caned the contrast accordingly. In this case to a light blue.

**(0.5) Semantic HTML**

Report on what happens when you try to navigate the page using a screen reader. Fix those navigation issues.

Screen reader usage: many of the section where not properly announced since it only said that there is a ``<div>``
but it didn't tell what the purpose of said ``<div>`` was. The new and clearer structure gives a better understanding about
the (importance) different elements like ``<nav>``

To fix the semantic HTML the ``<div>`` elements which tried to mimic an already existing HTML element have been removed
(e.g. ``<div class="nav">`` --> ``<nav>``).
Deprecated tags such as ``<font size="6">`` have been replaced with proper headings.
``<br>`` tags have been replaced with <p> tags

**(0.5) Audio** 

The ``<audio>`` player isn't accessible to hearing impaired (deaf) people — can you add some kind of accessible alternative for these users?

To make the audio player accessible I have transcribed the file and implemented a button where the user can toggle if he
wants to view the transcript. For the implementation I have used the audio transcript example from MDN

https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Multimedia#audio_transcripts

**(1) Forms** 
  * The ``<input>`` element in the search form at the top could do with a label, but we don't want to add a visible text label that would potentially spoil the design and isn't really needed by sighted users. Fix this issue by adding a label that is only accessible to screen readers.
  * The two ``<input>`` elements in the comment form have visible text labels, but they are not unambiguously associated with their labels — how do you achieve this? Note that you'll need to update some of the CSS rule as well.

To fix the inputs a visually hidden label has been added each of the added labels also has a "for="
to create an association. The search got hidden by assigning an id to the label and adding css to keep it hidden. 

**(0.5) Comment section**

The show/hide comment control button is not currently keyboard-accessible. Can you make it keyboard accessible, both in terms of focusing it using the tab key, and activating it using the return key?

Since the button was represented as a ``div`` element I assigned it a button role while also setting the tabindex to 0.
To open/close the comment section using the enter key I wait for a KeyboardEvent, check if the key is the 'Enter' key
and then activate the element this is implemented in TypeScript.

https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML#good_semantics

**(1) The table**

The data table is not currently very accessible — it is hard for screen reader users to associate data rows and columns together, and the table also has no kind of summary to make it clear what it shows. Can you add some features to your HTML to fix this problem?

To make the table more accessible I have added a summary using the ``caption`` tag.
The ``th`` elements now have a scope (col), additionally both bear types (Wild, Urban) have been replaced with a ``th``
and a row scope instead of the previous ``td``.

https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML#accessible_data_tables

**(1) More Findings**

Font was horrible (e.g. overuse of cursive and bold text). Fixed by choosing another font-family removed necessary
cursive and bold text. 

# Extended Coding Playgrounds
Please create a new independent Repository for these playgrounds and submit a link to it in the Moodle submission. 
Additionally, provide a description of how to start your frontend and backend services inside the `README.md`.

## Submission
Submit your coding repository link in Moodle. Send me an invitation to your repository if it is set to private:
> GitHub: leonardo1710
> 
> GitLab: leon.freudenthaler@fh-campuswien.ac.at

## 5. Migrate to a Frontend Framework (10 pts.)
In this playground you will migrate your application to a frontend framework of your choice.

**Tasks**:
* Migrate your application to a frontend framework of your choice (e.g. React, Angular, Vue.js, Svelte,...)
  * All previous features should still work
  * The application still should use build and dependency management
* Adapt your `npm scripts` if necessary

## 6. Integrate a Backend Framework (10 pts.)
In this playground you will use a backend framework of your choice and connect it with an API to your frontend application. 

**Tasks**:
* (3) Setup a backend framework of your choice
* (2) Create an API your frontend will be connected to (REST, GraphQL, gRPC, you choose...)
* (2) Your backend should now request the bear data from presented Wikipedia API
* (3) Replace the frontend Wikipedia API calls with calls to your backend - the functionality of your frontend should work as before!
* (Optional): you may want to introduce some sort of caching layer for Wikipedia API requests


## 7. Containerize your application (10 pts.)
Dockerize your frontend and backend applications. It should be possible to start all services in the corresponding mode (development, production) with a single command (e.g. use Docker Compose for this).

**Tasks**:
* (6) Create **multi-stage Dockerfiles** for your applications (depending on your frameworks):
  * The frontend Dockerfile should: 1. run the app in a development environment 2. build the app 3. serve build artefacts over Nginx
  * The backend Dockerfile should: 1. run the app in a development environment 2. build the app if there is a build step in your framework (optional) 3. serve the app 
* (4) Create two docker-compose files to orchestrate you applications in ``development`` and ``production`` mode:
  * Define ports and dependencies
  * Define corresponding stage (development, production)
  * Use environment variables if possible
* Your application should start with the following commands:
  * Development: `docker-compose -f docker-compose.yml up --build`
  * Production: `docker-compose -f docker-compose.prod.yml up --build`