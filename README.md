# Getting Started with Flying cloud

Go to [the rocket-map page](http://marcosmiani.github.io/rocket-map)

## Basic choices and why's

Since the requirement was 3 hours (last half for documentation right?) I tried to achieve a MVP with the basic functionalities, taking in consideration the order described on the requirements:
- Search by dates
- Control loading and error
- Show map and points

The fundation: create react app with typescript option
The map library: simple, documentation with examples, clear and easy to use
The state: Redux with the tools and easy thunk actions that reduce into loading, error and data, plus normal state for the form params
No component library: True, it could help implementing better form validation, but since is a MVP, seemed like an overkill
Basic tests: Testing the whole async state could take half an hour, and functionality in this case was more important for me, and since the number of features is small, normal manual functional tests seemed suficient

# Improvements I would like to add

- Proper designs: what application doesnt benefit of that??
- Icons, metadata, better accesibility
- Tests on the state, specially the reducers, they can be splitted and tested individually, despite the types help
- Better map navigation: zoom controls, center, tooltips
- Add links to the details: agency wikis
- Better details (mission, cost, etc)
- Add more filters

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

