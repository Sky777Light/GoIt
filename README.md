//install project

npm install

//build project

npm run build:prod

//run project

npm run server  //need running mongod

##########################################

login: superuser // or email: super@super.com
pass: 1Superpass

This credentials will create new user at start. 
 User's create/update/delete API realised, but not implemented on client side.
 
There are two authorization way - by login and by token.
If you choose "Remember me" your token will be save in local storage, if not - in session storage, so you should not worry to login again if you reload the page

Access to main application realized on client side by CanActivate, and access on server side to main API  - by passport

In app used GoogleMaps API(using angular 2 wrapper - agm module)

On load user already has all markers, and when map is loaded all markers will be shown. There are 2 btns hide/show markers.
Each click on the map will create a new marker. These markers user can save clicking on save button.
Click on any marker will show label for this marker (adding label is not implemented yet)

Also there is a list of places we want to find. Choosing place in the list will create on map markers for nearest places(google return only 20)

Using angular materials and custom theme.