const API_BASE_URL = `https://${import.meta.env.VITE_API_IP || 'localhost'}:${import.meta.env.VITE_PORT || '3000'}/api/v1/`;

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

export async function fetchNEO7MData() {
  try {
    const response = await fetch(`${API_BASE_URL}neo7m`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return undefined;
  }
}

export async function fetchMPU6500Data() {
  try {
    const response = await fetch(`${API_BASE_URL}mpu6500`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return undefined;
  }
}
