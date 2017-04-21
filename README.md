# How to host a React app on Firebase Hosting

This is a guide that shows you how to to create a react app and host it on Firebase without a hassle.

----------------

##### Deployment

1. Create a brand-new react app with the `create-react-app` script.
   ```
   $create-react-app appname && cd appname
   ```

2. Initialize the app to be a firebase app (this will create a firebase config file).
   ```
   $firebase init
   ```

  Choose the following options while initializing.

  - What do you want to use as your public directory? **build**
  - Configure as a single-page app (rewrite all urls to /index.html)? **y**
  - Overwrite the existing public folder? **n**

  When the initialization is complete, you should see the firebase config files.
    
3. Build and deploy the app to Firebase.
   ```
   $npm run build
   $firebase deploy
   ```
   
   Done! You should see your app's address in the console.
   
   
##### Development

1. Run the development server
   ```
   $npm start
   ```
   You can access your app via `http://localhost:3000`. Note that you don't have to refresh your webpage to see the changes.
