# Resources
We have used the resources mentioned in the google doc of this assignment. 

# Unzipping and directory structure
Unzip the tarball. Follow the steps below for running backend and frontend. Run the commands in order.

# Running backend
First of all change the details of postgres university Database in config.txt. Now run the below commands.

1. cd backend/src/Services
2. npm i
3. node index.js

# Running Frontend

1. cd frontend/iit-asc 
2. npm i
3. npm start

Now wait for a few seconds and enjoy the website peacefully.

# Instructor login
We have made the frontend interfaces for both student and instructor login. We have hence assumed 
that the instructor password hash info is present in user_password table itself. 

# No signup Feature
It is also assumed that user id and hashed password are already present in the table user_password
for successful login, since we don't have signup functionality as mentioned in doc.
