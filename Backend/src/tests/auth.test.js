import app from "../app.js"; 
import request from "supertest";


describe("Auth Routes", () => {
  it("should signup a user successfully", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      fullName: "Test User",
      email: "test@example.com",
      password: "password123"
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.email).toBe("test@example.com");
  });
});

describe("Login Routes", () => {
  it("should login a user successfully", async () => {
    // First, signup the user
    await request(app).post("/api/auth/signup").send({
      fullName: "Test User",
      email: "test@example.com",
      password: "password123"
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.email).toBe("test@example.com");
  });
});

describe("Logout Routes", () => {
  it("should logout a user successfully", async () => {
    // First, signup the user
    await request(app).post("/api/auth/signup").send({
      fullName: "Test User",
      email: "test@example.com",
      password: "password123"
    });

    const res1 = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123"
    });

    const res = await request(app).post("/api/auth/logout").send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Logged out successfully.");
  });
});
