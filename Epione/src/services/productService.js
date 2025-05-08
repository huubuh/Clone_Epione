import axios from "axios";

const API_URL = "http://localhost:3000";

// Lấy danh sách sản phẩm bán chạy nhất
export const getBestSellers = async () => {
  try {
    const [chairsRes, desksRes, accessoriesRes] = await Promise.all([
      axios.get(`${API_URL}/chairs`),
      axios.get(`${API_URL}/desks`),
      axios.get(`${API_URL}/accessories`),
    ]);

    const allProducts = [
      ...chairsRes.data,
      ...desksRes.data,
      ...accessoriesRes.data,
    ];

    const bestSellers = allProducts.filter((product) => product.rating === 5);
    return bestSellers.slice(0, 5); 
  } catch (error) {
    console.error("Không thể lấy danh sách sản phẩm bán chạy:", error.message);
    return [];
  }
};

// Lấy sản phẩm theo danh mục (chairs, desks, accessories)
export const getProductsByCategory = async (category) => {
  try {
    const validCategories = ["chairs", "desks", "accessories"];
    if (!validCategories.includes(category)) {
      throw new Error("Danh mục không hợp lệ.");
    }

    const response = await axios.get(`${API_URL}/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Không thể lấy dữ liệu cho danh mục '${category}':`, error.message);
    return [];
  }
};

// Lấy chi tiết sản phẩm theo slug
export const getProductBySlug = async (slug) => {
  try {
    const [chairs, desks, accessories] = await Promise.all([
      axios.get(`${API_URL}/chairs`),
      axios.get(`${API_URL}/desks`),
      axios.get(`${API_URL}/accessories`),
    ]);

    const allProducts = [
      ...chairs.data,
      ...desks.data,
      ...accessories.data,
    ];

    const product = allProducts.find((item) => item.slug === slug);
    if (!product) {
      console.warn(`Không tìm thấy sản phẩm với slug: ${slug}`);
    }
    return product || null;
  } catch (error) {
    console.error("Không thể lấy thông tin chi tiết sản phẩm:", error.message);
    return null;
  }
};


export const getCategoryCounts = async () => {
  try {
    const [chairs, desks, accessories] = await Promise.all([
      axios.get(`${API_URL}/chairs`),
      axios.get(`${API_URL}/desks`),
      axios.get(`${API_URL}/accessories`),
    ]);

    return {
      chairs: chairs.data.length,
      desks: desks.data.length,
      accessories: accessories.data.length,
    };
  } catch (error) {
    console.error("Không thể lấy dữ liệu danh mục:", error.message);
    throw new Error("Không thể tải dữ liệu danh mục");
  }
};

// Lấy tất cả sản phẩm (ghế, bàn, phụ kiện)
export const getAllProducts = async () => {
  try {
    const [chairsRes, desksRes, accessoriesRes] = await Promise.all([
      axios.get(`${API_URL}/chairs`),
      axios.get(`${API_URL}/desks`),
      axios.get(`${API_URL}/accessories`),
    ]);
    return [
      ...chairsRes.data,
      ...desksRes.data,
      ...accessoriesRes.data,
    ];
  } catch (error) {
    console.error("Không thể lấy tất cả sản phẩm:", error.message);
    return [];
  }
};
