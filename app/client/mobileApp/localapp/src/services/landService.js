import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';


const apiUrl = Platform.OS === 'ios'
  ? 'http://localhost:5000/api/land-listing'
  : 'http://192.168.192.10:5000/api/land-listing';
 // Update this with your actual backend URL

const landService = {

  // fetch all listings
  async getAllLandListings() {
    try {
      const response = await axios.get(`${apiUrl}/all`);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to fetch land listings. Please try again.');
    }
  },

  // upload images to listings using expo-image-picker
  async uploadImages() {
    try {
      // Ask for permission to access the device's photo library
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission to access photo library denied');
      }

      // Launch the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.cancelled) {
        // User canceled the picker
        return null;
      }

      const response = await fetch(`https://firebasestorage.googleapis.com/v0/b/local4809-eb61b.appspot.com/o?uploadType=media&name=images/${Date.now()}`, {
        method: 'POST',
        body: result.base64,
        headers: {
          'Content-Type': 'image/jpeg',
        },
      });
      
      const data = await response.json();
      const url = `https://firebasestorage.googleapis.com/v0/b/local4809-eb61b.appspot.com/o/images%2F${Date.now()}?alt=media&token=${data.downloadTokens}`; // Construct the download URL
      return [url]; // Return an array containing the local URI of the selected image
    } catch (error) {
      throw error;
    }
  },

  async createLandListing (landDetails, authToken)  {
    try {
       // Ensure images is an array and price is included
    const { images, ...otherDetails } = landDetails;
    const parsedImages = typeof images === 'string' ? JSON.parse(images) : images;
    const updatedLandDetails = { images: parsedImages, ...otherDetails };

      const response = await axios.post(`${apiUrl}/create`, updatedLandDetails, {
        headers: {
          'auth-token': authToken, // Include the token in the Authorization header
        },
      });
      return response.data;
    } catch (error) {
      console.log(error.message);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  }
      throw error;
    }
  },

};

export default landService;
