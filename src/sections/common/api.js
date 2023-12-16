const API_BASE_URL = `http://${import.meta.env.VITE_API_IP || 'localhost'}:${import.meta.env.VITE_PORT || '3000'}/api/v1/`;

// MQ9 (CO) API
export async function fetchMQ9Latest() {
  // try {
  //   const response = await fetch(`${API_BASE_URL}mq9/`);
  //   if (!response.ok) {
  //     throw new Error(response.statusText);
  //   }
  //   return await response.json();
  // } catch (error) {
  //   console.error('There was a problem with the fetch operation:', error);
  //   return undefined;
  // }
  return {
    "id": 1,
    "co": 1,
    "time": "2023-02-11T14:30:00.302Z"
  };
}

export async function fetchMQ9Data(n) {
  // try {
  //   const response = await fetch(`${API_BASE_URL}mq9/history/${n}`);
  //   if (!response.ok) {
  //     throw new Error(response.statusText);
  //   }
  //   return await response.json();
  // } catch (error) {
  //   console.error('There was a problem with the fetch operation:', error);
  //   return undefined;
  // }
  if (n === 1) {
    return [{
      "id": 1,
      "co": 1,
      "time": "2023-02-11T14:30:00.302Z"
    }];
  }
  return [{
    "id": 1,
    "co": 1,
    "time": "2023-02-11T14:30:00.302Z"
  },
  {
    "id": 2,
    "co": 2,
    "time": "2024-02-22T14:30:00.302Z"
  }];
}

// SEN0322 (O2) API
export async function fetchSEN0322Latest() {
  // try {
  //   const response = await fetch(`${API_BASE_URL}sen0322/`);
  //   if (!response.ok) {
  //     throw new Error(response.statusText);
  //   }
  //   return await response.json();
  // } catch (error) {
  //   console.error('There was a problem with the fetch operation:', error);
  //   return undefined;
  // }
  return {
    "id": 3,
    "o2": 3,
    "time": "2023-02-11T14:30:00.302Z"
  };
}

export async function fetchSEN0322Data(n) {
  // try {
  //   const response = await fetch(`${API_BASE_URL}sen0322/history/${n}`);
  //   if (!response.ok) {
  //     throw new Error(response.statusText);
  //   }
  //   return await response.json();
  // } catch (error) {
  //   console.error('There was a problem with the fetch operation:', error);
  //   return undefined;
  // }
  if (n === 1) {
    return [{
      "id": 3,
      "o2": 3,
      "time": "2023-02-11T14:30:00.302Z"
    }];
  }
  return [{
    "id": 3,
    "o2": 3,
    "time": "2023-02-11T14:30:00.302Z"
  },
  {
    "id": 4,
    "o2": 4,
    "time": "2024-02-22T14:30:00.302Z"
  }];
}

// SEN0159 (CO2) API
export async function fetchSEN0159Latest() {
  // try {
  //   const response = await fetch(`${API_BASE_URL}sen0159/`);
  //   if (!response.ok) {
  //     throw new Error(response.statusText);
  //   }
  //   return await response.json();
  // } catch (error) {
  //   console.error('There was a problem with the fetch operation:', error);
  //   return undefined;
  // }
  return {
    "id": 5,
    "co2": 5,
    "time": "2023-02-11T14:30:00.302Z"
  };
}

export async function fetchSEN0159Data(n) {
  // try {
  //   const response = await fetch(`${API_BASE_URL}sen0159/history/${n}`);
  //   if (!response.ok) {
  //     throw new Error(response.statusText);
  //   }
  //   return await response.json();
  // } catch (error) {
  //   console.error('There was a problem with the fetch operation:', error);
  //   return undefined;
  // }
  if (n === 1) {
    return [{
      "id": 5,
      "co2": 5,
      "time": "2023-02-11T14:30:00.302Z"
    }];
  }
  return [{
    "id": 5,
    "co2": 5,
    "time": "2023-02-11T14:30:00.302Z"
  },
  {
    "id": 6,
    "co2": 6,
    "time": "2024-02-22T14:30:00.302Z"
  }];
}

// BME680 API
export async function fetchBME680Latest() {
  // try {
  //   const response = await fetch(`${API_BASE_URL}bme680/`);
  //   if (!response.ok) {
  //     throw new Error(response.statusText);
  //   }
  //   return await response.json();
  // } catch (error) {
  //   console.error('There was a problem with the fetch operation:', error);
  //   return undefined;
  // }
  return {
    "id": 7,
    "temperature": 7,
    "humidity": 7,
    "pressure": 7,
    "gas": 7,
    "time": "2023-02-11T14:30:00.302Z"
  };
}

export async function fetchBME680Data(n) {
  // try {
  //   const response = await fetch(`${API_BASE_URL}bme680/history/${n}`);
  //   if (!response.ok) {
  //     throw new Error(response.statusText);
  //   }
  //   return await response.json();
  // } catch (error) {
  //   console.error('There was a problem with the fetch operation:', error);
  //   return undefined;
  // }
  if (n === 1) {
    return [{
      "id": 7,
      "temperature": 7,
      "humidity": 7,
      "pressure": 7,
      "gas": 7,
      "time": "2023-02-11T14:30:00.302Z"
    }];
  }
  return [{
    "id": 7,
    "temperature": 7,
    "humidity": 7,
    "pressure": 7,
    "gas": 7,
    "time": "2023-02-11T14:30:00.302Z"
  },
  {
    "id": 8,
    "temperature": 8,
    "humidity": 8,
    "pressure": 8,
    "gas": 8,
    "time": "2024-02-22T14:30:00.302Z"
  }];
}