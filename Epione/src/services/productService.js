import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getBestSellers = async () => {
  try {
    // Fetch all products from different categories
    const [chairsResponse, desksResponse, accessoriesResponse] = await Promise.all([
      axios.get(`${API_URL}/chairs`),
      axios.get(`${API_URL}/desks`),
      axios.get(`${API_URL}/accessories`)
    ]);

    // Combine all products
    const allProducts = [
      ...chairsResponse.data,
      ...desksResponse.data,
      ...accessoriesResponse.data
    ];

    // Filter products with rating 5
    const bestSellers = allProducts.filter(product => product.rating === 5);
    
    // Return top 5 best sellers
    return bestSellers.slice(0, 5);
  } catch (error) {
    console.error('Error fetching best sellers:', error);
    return [];
  }
};

export const getProductsByCategory = async (category) => {
  try {
    // Map the category from URL to the correct endpoint
    const endpointMap = {
      'chairs': 'chairs',
      'desks': 'desks',
      'accessories': 'accessories'
    };
    
    const endpoint = endpointMap[category];
    if (!endpoint) {
      throw new Error('Invalid category');
    }

    const response = await axios.get(`${API_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    return [];
  }
}; 