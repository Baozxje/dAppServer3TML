import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import User from "./models/User.js"; 

const MONGO_URI = "mongodb+srv://admin3tml:3TML@qlns.rocjrai.mongodb.net/?retryWrites=true&w=majority&appName=QLNS";

const ROLES = ["farmer", "moderator", "transporter", "manager"];

async function seedUsers() {
  await mongoose.connect(MONGO_URI);

  const users = [];

  for (let i = 0; i < 2000; i++) {
    const role = ROLES[Math.floor(Math.random() * ROLES.length)];

    users.push({
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number("0#########"),
      password: await bcrypt.hash("123456", 10),
      role,
      address: faker.location.streetAddress(),
      createdAt: new Date(),
    });
  }

  await User.insertMany(users);
  console.log("Seed xong 2000 users");
  process.exit();
}

seedUsers();
