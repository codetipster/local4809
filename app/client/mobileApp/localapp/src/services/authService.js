import axios from 'axios';


const apiUrl = Platform.OS === 'ios'
  ? 'http://localhost:5000/api/users'
  : 'http://192.168.192.10:5000/api/users';


const authService = {
  async registerUser(email, password, role) {
    try {
      const response = await axios.post(`${apiUrl}/register`, {
        email,
        password,
        role,
      });
      return response.data; // Assuming your backend returns meaningful data upon successful registration
    } catch (error) {
      throw error.response?.data || new Error('Registration failed. Please try again.');
    }
  },

  async loginUser(email, password) {
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      },
      );
      return response.data.token; // Assuming your backend returns a token upon successful login
    } catch (error) {
      throw error.response?.data || new Error('Login failed. Please check your credentials and try again.');
    }
  },

  // Other authentication methods...
 // Other authentication methods...
async getUserDetails(token, userId) {
  try {
    const response = await axios.get(`${apiUrl}/${userId}`, {
      headers: {
        'auth-token': token, // Changed from Authorization to auth-token
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch user details. Please try again.');
  }
},


 
};

export default authService;
