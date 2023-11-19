const API_BASE_URL = `http://${import.meta.env.VITE_API_IP || 'localhost'}:3000/api/v1/`;

export async function fetchBME680Data() {
  try {
    const response = await fetch(`${API_BASE_URL}bme680`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return undefined;
  }
}
