# Leon Baird Dev Test

## Running

You can use *npm* or *pnpm* to run the project (tested with npm). To set up and run the main app, do the following:

```bash
npm install
npm run dev
```

To run Jest tests for unit, React rendering and integration:

```bash
npm run test
```

To run e2e tests with Playwright:

```bash
npm run e2e
```

## Notes on development

I chose to scaffold the app and setup with Vite, rather than a full stack like NextJS or TanStack as this seemed
to fit with the brief of being a totally frontend simulation rather than a working service. I then added to this stack
tools for testing and e2e testing.

For *css* I decided to stick with simple css modules, again, not to over-complicate the setup with tools like Tailwind or
other solutions like SCSS/SASS or rendering tools like Styled-Components. For rapid prototyping I do like Tailwind, but find
the challenge with scaling to large complex and maintainable systems takes a lot of work and planning, as it can become very
messy over time due to its rapid application.

I implemented the full app as I wished it to be for this demo, and used React basic contexts with a reducer, which suits
the style of control for a shopping cart, rather than basic states. As instructed, 3rd party libraries for managing state were
not used and the basics provided by React were used instead, which, for most purposes, function fine in place of those older
state libraries.

React router is used to jump between three pages of `home`, `products` and `cart`. The cart is on a separate 
route from the rest of the app. If this were a real product for use, the main functionality of the cart could be placed 
within an interactive popup component which can be accessed anytime from any page via the nav-bar. However, showing the
scope of the contexts at play, I liked the separation to different routes to demonstrate the ease with which the data
synchronises across the app.

The following things I would like to develop further if I had more time on the project:

- theming - I have setup support for light and dark mode, but have done little on styling and animating the UI to great effect
- responsive design - I have made the nav bar slightly responsive and the design does work on smaller screens, but I have not set up viewports or correctly made work to fix the view to fully support mobile devices. The target of this demo has been mainly desktop machines.
- testing - I have tested the main logic for the shopping cart, and another component for rendering, but much work would be needed to continue to test more components and critical functionality, with some additional config for fully rendering react components in Jest.
- e2e testing - I have done a light weight test with e2e just to check the main page renders with the correct title, but would like to add e2e tests for the basic workflow of using the cart and ordering.
- networking/backend - I have created a `data-access` layer, which is where the networking would take place and simulates server responses with fake hard coded data and random generated responses. I would like to setup a real backend that would work more conventionally and show networking use and user authorisation.
- metadata - there is currently no meta data or branding with favicons and icons etc, or files like robots.txt, sitemaps, etc, to assist with directing crawlers. This would usually be added as well. 
- fallback content for old browsers - I usually add fallback content for extremely old browsers, so branding and an update message appears instead of a broken app or blank screen.


## Folder structure

The project structure is as follows:

```
project/
├── e2e/                End to End test code
├── src/
│   ├── main.tsx        Main render point for app with global css file
│   ├── index.css
│   ├── app/            Main routing for app
│   ├── assets/         Main SVG and image assets for app
│   ├── components/     Component library for the app
│   ├── contexts/       App only uses one context - store-data
│   ├── data-access/    Fake data layer where networking would be done
│   ├── layouts/        Main root layout for app
│   ├── lib/            General helper functions
│   ├── pages/          Main route pages for app (home, products and cart)
│   ├── reducers/       Main app data reducer for loaded products and cart
│   ├── sample-json/    Sample data used for products
│   ├── test/           Test setup code and sample data setup for testing
│   └── types/          Main type definitions for loading css, svg for typescript and jest, and main app data types
├── playwright-report/  generated report for e2e tests (only when run)
├── test-results/       JSON data file for test results (only when run)
... other package, index.html and config files for project
```

## Use of AI in project

The use of AI was very minimal with this project. I used ChatGPT in a seperate browser window context. It was mainly used 
as a reference when configuring the project instead of docs. I used it to generate the file `src/lib/generate-uuid.ts` to
save a little time on creating this function with fallback for older browsers / test environments. I also had some config 
files checked and tweaked with AI to fix issues with running tests and scoping imports via '@/' which can cause
issues between running and building the app / testing.


## further info

Please do get in touch if you need to know anything else about this project, or to talk over decisions and designs used.



