# The Tree Chronicles - About

The Tree Chronicles is a travel blog powered by React and Firebase to document my observations, takeaways, and lessons I've learned while traveling and seeking discomfort and finding people and places that feel like home, hundreds or thousands of miles away. This project is a labor of love from its inception in the Hungarian countryside, to now, as my personal journal whenever I depart to find a new story.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Ask Me Anything!

The **Ask Me Anything!** page (`/ask-me`) lets visitors ask travel questions
using only information from articles published on The Tree Chronicles. It is
available from the desktop navigation and the mobile menu.

### How it works

1. The React chat sends the question and a short conversation history to the
   Firebase callable Cloud Function `askBlogBot`.
2. The function reads articles from the Firestore `blogs` collection and ranks
   them against the question using their title, tags, category, city, country,
   and description. It sends up to five matching article excerpts to Gemini.
3. Gemini (`gemini-3.5-flash-lite`) is instructed to answer only from those
   excerpts and to say when the articles don't contain an answer. The chat
   displays links to the articles used as sources. If no articles match, it
   asks the visitor to try a more specific question without calling Gemini.

The function accepts questions up to 500 characters and uses recent user
messages to help retrieve articles for follow-up questions. Article descriptions
are limited to 6,000 characters each when included in the prompt. The Gemini
API key is stored as a Firebase secret and is never sent to the browser.

### Deployment setup

Use the Firebase project associated with this app and a Gemini API key with
access to the Gemini Developer API. Set the key as a secret, then deploy the
function:

```sh
firebase functions:secrets:set GEMINI_API_KEY --project travel-blog-f05ae
firebase deploy --only functions:askBlogBot --project travel-blog-f05ae
```

Firebase Cloud Functions billing and the Gemini API's access/quota requirements
must be enabled for requests to succeed. The function's Node.js runtime is
configured in both `firebase.json` and `functions/package.json`; keep those
runtime settings aligned when changing versions.

To publish frontend changes as well, build and deploy Firebase Hosting:

```sh
npm run build
firebase deploy --only hosting --project travel-blog-f05ae
```

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
