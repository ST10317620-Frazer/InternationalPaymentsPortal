const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load env vars
dotenv.config(); // Load env vars

mongoose.connect(process.env.MONGO_URI); // connect to DB

// some static users
const users = [
  {
    fullName: 'Jessie King',
    idNumber: '122436485',
    accountNumber: '1213141516171819',
    password: 'JessieKing123!'
  },
  {
    fullName: 'Dean Bento',
    idNumber: '246810369',
    accountNumber: '0864213579148463',
    password: 'DeanBento@67'
  }
];

// Function to import data into the database
const importData = async () => {
  try {
    // Clear existing users first to prevent duplicates
    await User.deleteMany();
    
    // The .create() method will trigger the 'save' middleware in your User model,
    // which correctly hashes the passwords.
    await User.create(users);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Function to destroy all data in the database
const destroyData = async () => {
  try {
    await User.deleteMany();
    console.log('Data Destroyed Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Logic to run the correct function based on command line arguments
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
