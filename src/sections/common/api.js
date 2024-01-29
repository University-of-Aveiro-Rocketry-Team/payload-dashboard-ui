const API_BASE_URL = `http://127.0.0.1:8000/`;

// MQ9 (CO) API
export async function fetchMQ9Latest() {
  try {
    const response = await fetch(`${API_BASE_URL}mq9/`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return undefined;
  }
}

export async function fetchMQ9Data(n) {
  try {
    const response = await fetch(`${API_BASE_URL}mq9/history/${n}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return undefined;
  }
}

// SEN0159 (CO2) API
export async function fetchSEN0159Latest() {
  try {
    const response = await fetch(`${API_BASE_URL}sen0159/`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return undefined;
  }
}

export async function fetchSEN0159Data(n) {
  try {
    const response = await fetch(`${API_BASE_URL}sen0159/history/${n}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return undefined;
  }
}

// BME680 API
export async function fetchBME680Latest() {
  try {
    const response = await fetch(`${API_BASE_URL}bme680/`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return undefined;
  }
}

export async function fetchBME680Data(n) {
  try {
    const response = await fetch(`${API_BASE_URL}bme680/history/${n}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return undefined;
  }
  // if (n === 1) {
  //   return [{
  //     "id": 7,
  //     "temperature": 7,
  //     "humidity": 7,
  //     "pressure": 7,
  //     "gas": 7,
  //     "time": "2023-02-11T14:30:00.302Z"
  //   }];
  // }
  // return [{
  //   "id": 7,
  //   "temperature": 7,
  //   "humidity": 7,
  //   "pressure": 7,
  //   "gas": 7,
  //   "time": "2023-02-11T14:30:00.302Z"
  // },
  // {
  //   "id": 8,
  //   "temperature": 8,
  //   "humidity": 8,
  //   "pressure": 8,
  //   "gas": 8,
  //   "time": "2024-02-22T14:30:00.302Z"
  // }];
}

export async function fetchLogs(){
  try {
    const response = await fetch(`http://127.0.0.1:8000/logs/`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // respose has format {logs: [log1, log2, ...]}
    // return only the logs array
    return await response.json().then(data => data.logs);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return undefined;
  }
}