const axios = require('axios');

const testRegistration = async () => {
  try {
    const testData = {
      username: "testuser123",
      fullName: "Test User",
      email: "test@example.com",
      password: "password123"
    };

    console.log("Sending test data:", testData);

    const response = await axios.post('http://localhost:8000/api/auth/register', testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log("Success! Response:", response.data);
  } catch (error) {
    console.log("Error:", error.response?.data || error.message);
  }
};

testRegistration(); 