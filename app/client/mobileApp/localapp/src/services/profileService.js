import axios from 'axios';


const apiUrl = Platform.OS === 'ios'
  ? 'http://localhost:8080/users'
  : 'http://192.168.192.10:8080/users';

const profileService = {
  
  async updateUserDetails(token, userId, userDetails) {
    try {
      const response = await axios.put(`${apiUrl}/update-profile/${userId}`, userDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to update user details. Please try again.');
    }
  },
};

export default profileService;
