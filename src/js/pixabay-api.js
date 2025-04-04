// import axios from 'axios';

// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '49372169-96077d899f4beec9c9139b15f';

// export function getImagesByQuery(query) {
//   const params = {
//     key: API_KEY,
//     q: query,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//   };

//   return axios
//     .get(BASE_URL, { params })
//     .then(response => response.data)
//     .catch(error => {
//       console.error('Error fetching images:', error);
//       throw error;
//     });
// }

import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '49372169-96077d899f4beec9c9139b15f';

export async function getImagesByQuery(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}