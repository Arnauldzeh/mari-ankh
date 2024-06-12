# API Routes Documentation

## API BASE URL = https://meri-ankh.onrender.com/

## Admin Routes

### 1. Login Admin

- **ENDPOINT:** `api/admin/login`
- **Method:** `POST`
- **Description:** Authentification de l'admin.
- **Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

### 2. Create New Publication

- **ENDPOINT:** `api/admin/newpublication`
- **Method:** `POST`
- **Description:** Créer une nouvelle publication.
- **Body:**
  ```json
  {
    "heading": "string",
    "description": "string",
    "type": "string",
    "date": "date",
    "file": "file"
  }
  ```

### 3. Get All Publications

- **ENDPOINT:** `api/admin/publications`
- **Method:** `GET`
- **Description:** Récupérer toutes les publications.

### 4. Get One Publication

- **ENDPOINT:** `api/admin/publications/:id`
- **Method:** `GET`
- **Description:** Récupérer une publication par ID.
- **Params:** `id`:ID de la publication.

### 5. Update Publication

- **ENDPOINT:** `api/admin/updatepublication/:id`
- **Method:** `PUT`
- **Description:** Mettre à jour une publication.
- **Params:** `id`:ID de la publication.
- **Body:**
  ```json
  {
    "heading": "string",
    "description": "string",
    "type": "string",
    "date": "date"
  }
  ```

### 6. Create New Event

- **ENDPOINT:** `api/admin/newEvent`
- **Method:** `POST`
- **Description:** Créer un nouvel événement.
- **Body:**
  ```json
  {
    "heading": "string",
    "description": "string",
    "eventDate": "date",
    "publishedDate": "date",
    "location": "string",
    "file": "file",
    "organiser": "string",
    "time": "string"
  }
  ```

### 7. Update Event

- **ENDPOINT:** `api/admin/updateEvent/:id`
- **Method:** `PUT`
- **Description:** Mettre à jour un événement.
- **Params:** `id`:ID de l'événement
- **Body:**
  ```json
  {
    "heading": "string",
    "description": "string",
    "eventDate": "date",
    "location": "string",
    "file": "file",
    "organiser": "string",
    "time": "string"
  }
  ```

-----------------------------------------DONORS------------------------------------

## Donor Routes

### 1. Add Donor Information

- **ENDPOINT:** `/donor`
- **Method:** `POST`
- **Description:** Enregistrement d'un donneur.
- **Body:**
  ```json
  {
    "name": "string",
    "age": "number",
    "bloodType": "string",
    "contact": "string"
  }
  ```

---------------------------------------------USERS---------------------------------------

## User Routes

### 1. Register User

- **ENDPOINT:** `api/user/register`
- **Method:** `POST`
- **Description:** Inscrire un nouvel utilisateur.
- **Body:**
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "age": "string",
    "pregnant": "string",
    "password": "string",
    "phone": "string",
    "conceptionDate": "date"
  }
  ```

### 2. View Publications

- **ENDPOINT:** `api/user/posts`
- **Method:** `GET`
- **Description:** Voir toutes les publications.

### 3. Add Favorite Publication

- **ENDPOINT:** `api/user/favorite/:publicationId`
- **Method:** `POST`
- **Description:** Ajouter une publication aux favoris.
- **Params:** `publicationId`:ID de la publication.

### 4. Add Appointment

- **ENDPOINT:** `api/user/appointment`
- **Method:** `POST`
- **Description:** Ajouter un rendez-vous.
- **Body:**
  ```json
  {
    "userId": "string",
    "appointmentDate": "date",
    "description": "string"
  }
  ```
