const request = require("supertest");
const app = require("../app");
const { sequelize, User, Bookmark } = require("../models");
const bookmark = require("../models/bookmark");

require("dotenv").config();
const {TC1_NAME, TC1_ADDRESS, TC1_USERNAME, TC1_EMAIL, TC1_PASSWORD, TC1_PHONENUMBER, TC2_EMAIL, TC2_PASSWORD} = process.env;

let token;

afterAll(() => {
  User.destroy({ truncate: true, cascade: true })
    .then(() => {
      sequelize.close();
    })
    .catch((err) => {
      console.log(err);
    });

  Bookmark.destroy({ truncate: true, cascade: true })
    .then(() => {
      sequelize.close();
    })
    .catch((err) => {
      console.log(err);
    });
});

describe("Test Scenario", () => {
  it("Should be able to register", async () => {
    const response = await request(app)
      .post("/register")
      .set("Content-Type", "application/json")
      .send({
        name: TC1_NAME,
        username: TC1_USERNAME,
        email: TC1_EMAIL,
        password: TC1_PASSWORD,
        address: TC1_ADDRESS,
        phoneNumber: TC1_PHONENUMBER
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.email).toBe(TC1_EMAIL);



    
  });

  it("Should be able to login", async () => {
    const response = await request(app)
      .post("/login")
      .set("Content-Type", "application/json")
      .send({ email: TC1_EMAIL, password: TC1_PASSWORD });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined(); 

    token = response.body.token; //this should save JWT into variable for used later
  });

  it("Should not be able to login when email is invalid", async () => {
    const response = await request(app)
      .post("/login")
      .set("Content-Type", "application/json")
      .send({ email: TC2_EMAIL, password: TC1_PASSWORD });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("Unauthenticated");
    expect(response.body.message).toBe("Invalid email or password");
  });

  it("Should not be able to login when password is invalid", async () => {
    const response = await request(app)
      .post("/login")
      .set("Content-Type", "application/json")
      .send({ email: TC1_EMAIL, password: TC2_PASSWORD });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("Unauthenticated");
    expect(response.body.message).toBe("Invalid email or password");
  });





  it("Should not be able to see movies when JWT is invalid", async () => {
    const response = await request(app)
    .get("/movies")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer invalidtoken123")
    .send(); //this should send wrong JWT

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please Login First");
  });

  it("Should be able to see movies when JWT is valid", async () => {
    const response = await request(app)
    .get("/movies")
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .send(); //this should send token from login as JWT

    expect(response.statusCode).toBe(200);
  });




  it("Should not be able to see movies id specifically when JWT is invalid", async () => {
    const response = await request(app)
    .get("/movies/1")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer invalidtoken123")
    .send(); //this should send wrong JWT

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please Login First");
  });

  it("Should be able to see movies id specifically when JWT is valid", async () => {
    const response = await request(app)
    .get("/movies/1")
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .send(); //this should send token from login as JWT

    expect(response.statusCode).toBe(200);
  });




  it("Should not be able to bookmark a movies id when JWT is invalid", async () => {
    const response = await request(app)
    .post("/bookmark/1")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer invalidtoken123")
    .send(); //this should send wrong JWT

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please Login First");
  });

  it("Should be able to bookmark a movies id when JWT is valid", async () => {
    const response = await request(app)
    .post("/bookmark/1")
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .send(); //this should send token from login as JWT

    expect(response.statusCode).toBe(200);
  });





  it("Should not be able to see mybookmark if JWT is invalid", async () => {
    const response = await request(app)
    .get("/mybookmark")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer invalidtoken123")
    .send(); //this should send wrong JWT

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Please Login First");
  });

  it("Should be able to see mybookmark if JWT is valid", async () => {
    const response = await request(app)
    .post("/mybookmark")
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .send(); //this should send token from login as JWT

    expect(response.statusCode).toBe(200);
  });

});



