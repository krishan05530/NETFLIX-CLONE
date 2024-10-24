import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode> 
     {/* as react redner twice during developemnt mode  */}
    <BrowserRouter>
    <App />
    </BrowserRouter>
  
  </StrictMode> 
)


// npm run build  to start it , as it will install node module 
// npm run start as we are in production  

/*

developmetn , jb bana rha he project 

dev:
Purpose: This command is used to start the application in development mode. 
It usually enables hot-reloading, detailed error messages, and other development-friendly features.

start:
Purpose: This command is often used to start the application in production mode. It runs the built application,
 which has been optimized for performance.

build:
Purpose: This command compiles the application into an optimized build that is ready for deployment. 
It often processes assets, minifies code, and prepares everything for production.


"scripts": {
  "dev": "NODE_ENV=development nodemon backend/server.js",
  "start": "set NODE_ENV=production&& node backend/server.js",
  "build":"npm install && npm install --prefix frontend && npm run build --prefix frontend "
},

*/




/*
now after we have deployed our code on github it will not have node module

 be on root folder:->
npm run build 
it will install node module forn frintend as well as backend and then build it and we will get dist folder in frontend
now do this , as we will start it in prodution enviroment:->
npm run start

now visit localhost:5000

*/
/*
to initiale the git be in root folder and run this command
git init
git add .
git commit -m "initial commit"

*/
/*
we are using render.com to deploy our app
*/