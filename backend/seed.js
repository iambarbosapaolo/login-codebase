require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/db');

const seed = async () => {
  try {
    await connectDB();

    // Optional: clear users first
    await User.deleteMany();

    const passwordHash = await bcrypt.hash('password123', 10);

    const demoUser = new User({
      name: 'Demo User',
      email: 'demo@example.com',
      password: passwordHash,
    });

    await demoUser.save();

    console.log('Seed complete! Created user:');
    console.log('Email: demo@example.com');
    console.log('Password: password123');

    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
};

seed();
