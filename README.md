# Tweet Saver

Tweet Saver is a very simple and lightweight web application that has the sole purpose of enabling the user to search and locally save some tweets in his browser local storage.

### Bonus Features (not request):

Some features were not requested on the original app specification but made a lot of sense to me so I decided to go ahead and implement them:

* Ability to delete a tweet from the local storage;
* Ability to delete all the tweets from the local storage;
* A save all feature;
* Realtime sync with the storage so if the user opens the app in two (or more) different windows both windows will be always in sync.

### Compatibility

The app was tested for the following browsers:

* Internet Explorer 11
* Microsoft Edge 44
* Google Chrome 81
* Mozilla Firefox 76
* Safari 13

## How to run it

Before running the app you need to install its dependencies. For that, after cloning the repo or downloading and extracting the zip file, inside the project folder, run:


```
npm install
```

Once the dependencies are installed, there are actually a few ways to run the app:

Running in a dev server:

```
npm run start:dev
```

This will start up a dev server and the application will be exposed at http://localhost:3000.

Optionally you could use the following commands to build and run an express.js server (production version)

```
npm run build
npm run start
```

This command will generate optimized bundled javascript and CSS files which would be ideal for running the app in production. And start a server making the app available at http://localhost:8080.

This server will be used for a live demo deployed at [https://twitter-local-saver.herokuapp.com/](https://twitter-local-saver.herokuapp.com/)

