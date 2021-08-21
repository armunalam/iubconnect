# IUBConnect
A web-based application for IUB students to connect with alumni and faculties.

## Dependencies
* Python 3.8.10
* Conda Virtual Environment
* Node.js and npm
* PostgreSQL Database

## Backend
### Setup
1. Create a PostgreSQL database called `iubconnect`.
2. Open the terminal in the root folder, then enter `cd backend`.
3. Enter the following commands (one after the other):
    * `pip install -r requirements.txt`
    * `python manage.py makemigrations`
    * `python manage.py migrate`
    
### Run Server
Enter the following command in the terminal (in the backend folder) to run the backend server:
```bash
python manage.py runserver
```


## Frontend
### Setup
1. Open the terminal in the root folder, then enter `cd frontend`.
2. Enter the command: `npm install`.

### Run Server
To run the frontend development server, enter `npm start` in the terminal of the frontend folder.