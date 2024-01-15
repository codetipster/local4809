import axios from 'axios';

const apiUrl = Platform.OS === 'ios'
  ? 'http://localhost:8080/land-listing'
  : 'http://192.168.192.10:8080/land-listing'; // Update this with your actual backend URL

const landService = {
   async createLandListing (landDetails)  {
    try {
      const response = await axios.post(`${apiUrl}/create`, landDetails);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // fetch all listings
  async getAllLandListings() {
    try {
      const response = await axios.get(`${apiUrl}/all`);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to fetch land listings. Please try again.');
    }
  },

  // upload images to listings
   async uploadImages(images) {
    // Placeholder for image upload logic
    // Implement the logic to upload images to your server and return their URLs
    // For example, you might use a library like react-native-image-picker to handle image selection and upload them using FormData.
    // Ensure that the server endpoint for image upload is correctly implemented in your backend.
    try {
      // Placeholder URL, replace it with the actual URL after image upload is implemented
      const uploadedImageUrls = ['http://example.com/image1.jpg', 'http://example.com/image2.jpg'];
      return uploadedImageUrls;
    } catch (error) {
      throw error;
    }
  },
};

export default landService;
