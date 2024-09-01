# Notes
Pakai argon2 untuk hashing karena bcrypt tidak bisa dijalankan dilaptop kantor (terkena carbon black punya tim security).

# API
- POST /register
    ```json
    {
        name: 'string',
        username: 'string',
        email: 'string',
        password: 'string',
        address: 'text',
        phoneNumber: 'integer'
    }
    ```
- POST /login
    ```json
    {
        email: 'string',
        password: 'string'
    }
    ```
- GET /movies (auth JWT)
- GET /movies/:movieId (auth JWT)
- POST /bookmark/:movieId (auth JWT)
- GET /mybookmark (auth JWT)

