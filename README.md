# vetclinic-uol-api
VetClinic is an API service of a veterinary clinic.


# How to start the vet-clinic API?
## downloading dependencies
You will notice the repository you cloned only have .ts files in a src folder. Don't panic.
First you'll have to run the npm install command to install all the project's dependencies, such as dotenv, express and mongoose. Without this all you have is a bunch of useless code.

## Connecting to database
After ran the command you should have all the dependencies downloaded in the `node_modules` folder. But, before start our application you need to enter the `.env.example` file and change the <USERNAME> and <PASSWORD> placeholders to your own mongodb's user name and password. You can also use your localhost database. After, remember to rename `.env.example` to `.env`.

## Transpiling the typescript folder
All the application was wrote in TypeScript, you'll need to run `tsc -w` in the terminal in order to convert all TypeScript to JavaScript code, so node.js can execute this. When you make this you'll notice the command will not exit, you'll need to open a new terminal to run the next command.

## Running the application
Finally, to start the application all you have to do is run `npm start` in the terminal and wait the "server listening" message to appear.

# How to use the vet-clinic API?

## The routes
All the available routes start with `/api/v1/vetclinic/` and ends with:
1. `/tutors` to retrieve all registered tutors.
2. `/tutor` to create a new tutor.
3. `/tutor/:id` to update a existing tutor's info
4. `/tutor/:id` to delete a tutor
5. `/pet/:tutorId` to create a new pet and associate with a registered tutor's id
6. `/pet/:petId/tutor/:tutorId` to update a pet info
7. `/pet/:petId/tutor/:tutorId` to delete a pet

## The body data
you have to pay attention to your body data since some of its informations have to follow a given structure. You can see the cheat sheet JSON-like bellow

### When creating a tutor

name {<br>
  &ensp;&emsp;type: string<br>
  &ensp;&emsp;required: yes<br>
  &ensp;&emsp;maxlength: 55<br>
}

phone {<br>
  &ensp;&emsp;type: string<br>
  &ensp;&emsp;required: yes<br>
  &ensp;&emsp;maxlength: 11<br>
  &ensp;&emsp;format: only number<br>
}

email {<br>
  &ensp;&emsp;type: string<br>
  &ensp;&emsp;required: yes<br>
}

date_of_birth {<br>
  &ensp;&emsp;type: string<br>
  &ensp;&emsp;required: yes<br>
  &ensp;&emsp;format: yyy/mm/dd hh:mm. Only numbers<br>
}

zipcode {<br>
  &ensp;&emsp;type: string<br>
  &ensp;&emsp;required: true<br>
  &ensp;&emsp;maxlenght: 8<br>
  &ensp;&emsp;format: only numbers<br>
}

Example:

{<br>
    &ensp;&emsp;"name": "Albert Einstein",<br>
    &ensp;&emsp;"phone": "12345678901",<br>
    &ensp;&emsp;"email": "albert.einsten@gmail.com",<br>
    &ensp;&emsp;"date_of_birth": "1879-03-14 11:23",<br>
    &ensp;&emsp;"zipcode": "20031006"<br>
}

### when creating a pet


name {<br>
  &ensp;&emsp;type: string<br>
  &ensp;&emsp;required: yes<br>
  &ensp;&emsp;maxlength: 55<br>
}

species {<br>
  &ensp;&emsp;type: string<br>
  &ensp;&emsp;required: yes<br>
  &ensp;&emsp;maxlength: 55<br>
}

carry* {<br>
  &ensp;&emsp;type: string\n<br>
  &ensp;&emsp;required: yes\n<br>
  &ensp;&emsp;options: 'Small', 'Medium', 'Large' or 'Giant'  <br>
}

weight {<br>
  &ensp;&emsp;type: number<br>
  &ensp;&emsp;required: yes<br>
}

date_of_birth { <br>
  &ensp;&emsp;type: string <br>
  &ensp;&emsp;required: yes<br>
  &ensp;&emsp;format: yyy/mm/dd hh:mm. Only numbers<br>
}

Example:

{ <br>
    &ensp;&emsp;"name": "Laika", <br>
    &ensp;&emsp;"species": "Spitz", <br>
    &ensp;&emsp;"carry": "Small", <br>
    &ensp;&emsp;"weight": 5, <br>
    &ensp;&emsp;"date_of_birth": "1957-11-03 11:23" <br>
}

* Carry is a autocompleted option, it means that if you not provide a value for this, the system will give on based in this table:

| Pet's Weight  | Corresponding size |
| ------------- | ------------------ |
| < than 10kg   |        Small       |
| < than 27kg   |       Medium       |
| < than 45kg   |        Large       |
| > than 45kg   |       Giant        |


* The autocomplete feature works best with kilogram values

