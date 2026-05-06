import axios from 'axios';

const API_URL = 'http://localhost:8080/api/routes';

export const optimizeRoute = async (school, houses, algorithm) => {
  try {
    const response = await axios.post(`${API_URL}/optimize`, {
      school,
      houses,
      algorithm
    });
    return response.data;
  } catch (error) {
    console.error("Error optimizing route:", error);
    throw error;
  }
};
