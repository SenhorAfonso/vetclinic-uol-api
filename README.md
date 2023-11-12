# vetclinic-uol-api
VetClinic is an API service of a veterinary clinic.


# How to use the vet-clinic API?
## downloading dependencies
You will notice the repository you cloned only have .ts files in a src folder. Don't panic.
First you'll have to run the npm install command to install all the project's dependencies, such as dotenv, express and mongoose. Without this all you have is a bunch of useless code.

## Connecting to database
After ran the command you should have all the dependencies downloaded in the `node_modules` folder. But, before start our application you need to create a file called `.env` in the program root level and, inside this file, a new variable called `MONGO_URL=<your connection string to your own mongoDB database>`. This string can be about both local or remote host.

## Transpiling the typescript folder
All the application was wrote in TypeScript, you'll need to run `tsc -w` in the terminal in order to convert all TypeScript to JavaScript code, so node.js can execute this.

## Running the application
Finally, to start the application all you have to do is run `npm start` in the terminal and wait the "server listening" message to appear.



