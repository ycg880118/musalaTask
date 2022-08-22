Installation guide:
-Requirements
  Nodejs
  Mongodb (optional, you can use my mongodb server by default in the .env)

-Install dependencies:
  Navegate to project folder and run the command "npm install" in the Terminal.

-Build
  In the project folder, run the command "npm run build" in the Terminal. 

-Run
  After build is finished:
   - Navegate to "dist" folder.
   - Change mongodb server address in the .env file (optional, default value is a valid mongodb server if you want to save time).
   - Run the command "node server.js".

-Using a basic UI for testing the API.
   - Navegate to your server ip on port 3400, ex: http://102.231.25.4:3400 or http://127.0.0.1:3400.
   
   
