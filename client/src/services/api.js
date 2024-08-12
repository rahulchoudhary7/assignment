const API_URL = 'https://assignment-2-eezd.onrender.com/api';

export const fetchBannerData = async () => {
  const response = await fetch(`${API_URL}/banner`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const updateBannerData = async (data) => {
  const response = await fetch(`${API_URL}/banner`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const responseData = await response.json();
  return responseData;
};
