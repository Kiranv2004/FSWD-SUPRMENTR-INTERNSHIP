// ===========================================
// IMPORTANT: SET UP YOUR API KEY
// ===========================================
// To get real weather data, follow these steps:
// 1. Go to: https://openweathermap.org/api
// 2. Create a FREE account
// 3. Generate your API key from the API Keys section
// 4. Replace 'YOUR_API_KEY_HERE' below with your actual key
// ===========================================

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'YOUR_API_KEY_HERE';
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Mock data for demo/testing
const MOCK_WEATHER_DATA = {
  london: {
    city: 'London',
    country: 'GB',
    temperature: 15,
    feelsLike: 13,
    condition: 'Cloudy',
    description: 'overcast clouds',
    icon: '04d',
    humidity: 72,
    windSpeed: 18,
    pressure: 1013,
    visibility: 10,
    clouds: 85,
    timezone: 3600,
    sunrise: 1647360000,
    sunset: 1647408000
  },
  paris: {
    city: 'Paris',
    country: 'FR',
    temperature: 14,
    feelsLike: 12,
    condition: 'Rainy',
    description: 'light rain',
    icon: '10d',
    humidity: 80,
    windSpeed: 22,
    pressure: 1010,
    visibility: 8,
    clouds: 90,
    timezone: 3600,
    sunrise: 1647360000,
    sunset: 1647408000
  },
  newyork: {
    city: 'New York',
    country: 'US',
    temperature: 12,
    feelsLike: 9,
    condition: 'Clear',
    description: 'clear sky',
    icon: '01d',
    humidity: 65,
    windSpeed: 12,
    pressure: 1015,
    visibility: 15,
    clouds: 10,
    timezone: -18000,
    sunrise: 1647360000,
    sunset: 1647408000
  },
  tokyo: {
    city: 'Tokyo',
    country: 'JP',
    temperature: 18,
    feelsLike: 17,
    condition: 'Sunny',
    description: 'clear sky',
    icon: '01d',
    humidity: 55,
    windSpeed: 8,
    pressure: 1018,
    visibility: 12,
    clouds: 5,
    timezone: 32400,
    sunrise: 1647360000,
    sunset: 1647408000
  },
  sydney: {
    city: 'Sydney',
    country: 'AU',
    temperature: 25,
    feelsLike: 26,
    condition: 'Sunny',
    description: 'clear sky',
    icon: '01d',
    humidity: 45,
    windSpeed: 15,
    pressure: 1020,
    visibility: 14,
    clouds: 8,
    timezone: 39600,
    sunrise: 1647360000,
    sunset: 1647408000
  }
};

// Using OpenWeatherMap as primary
export const getWeatherByCity = async (cityName) => {
  try {
    // Check if API key is configured
    if (OPENWEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
      console.warn('⚠️ API Key not configured. Using demo data.');
      
      // Use mock data for demo
      const mockKey = cityName.toLowerCase();
      if (MOCK_WEATHER_DATA[mockKey]) {
        return MOCK_WEATHER_DATA[mockKey];
      }
      
      // Fallback to London demo when searched city is not in mock list
      return MOCK_WEATHER_DATA.london;
    }
    
    const response = await fetch(
      `${OPENWEATHER_BASE_URL}/weather?q=${cityName}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          '🔑 Invalid API Key!\n\n' +
          'Please check your API key in src/utils/api.js\n' +
          'Get a free key at: https://openweathermap.org/api'
        );
      }
      if (response.status === 404) {
        throw new Error('City not found. Please try another city name.');
      }
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      pressure: data.main.pressure,
      visibility: Math.round(data.visibility / 1000), // Convert to km
      clouds: data.clouds.all,
      timezone: data.timezone,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch weather data');
  }
};

// Get 5-day forecast
export const getWeatherForecast = async (cityName) => {
  try {
    // If API key is not configured, return mock forecast
    if (OPENWEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
      console.warn('Using mock forecast data');
      // Return sample forecast
      return [
        { day: 'Mon', date: '3/18/2026', temp: 16, condition: 'Cloudy', icon: '04d', humidity: 75, windSpeed: 20 },
        { day: 'Tue', date: '3/19/2026', temp: 15, condition: 'Rainy', icon: '10d', humidity: 85, windSpeed: 25 },
        { day: 'Wed', date: '3/20/2026', temp: 14, condition: 'Rainy', icon: '09d', humidity: 80, windSpeed: 22 },
        { day: 'Thu', date: '3/21/2026', temp: 17, condition: 'Cloudy', icon: '02d', humidity: 70, windSpeed: 15 },
        { day: 'Fri', date: '3/22/2026', temp: 19, condition: 'Sunny', icon: '01d', humidity: 60, windSpeed: 10 }
      ];
    }
    
    const response = await fetch(
      `${OPENWEATHER_BASE_URL}/forecast?q=${cityName}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    
    const data = await response.json();
    
    // Process forecast data to get one entry per day
    const dailyForecasts = {};
    
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dateStr = date.toLocaleDateString('en-US');
      
      if (!dailyForecasts[dateStr]) {
        dailyForecasts[dateStr] = {
          day,
          date: dateStr,
          temp: Math.round(item.main.temp),
          condition: item.weather[0].main,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          windSpeed: Math.round(item.wind.speed * 3.6)
        };
      }
    });
    
    return Object.values(dailyForecasts).slice(0, 5);
  } catch (error) {
    console.warn('Forecast error (non-critical):', error.message);
    // Return mock data on error instead of throwing
    return [
      { day: 'Mon', date: '3/18/2026', temp: 16, condition: 'Cloudy', icon: '04d', humidity: 75, windSpeed: 20 },
      { day: 'Tue', date: '3/19/2026', temp: 15, condition: 'Rainy', icon: '10d', humidity: 85, windSpeed: 25 },
      { day: 'Wed', date: '3/20/2026', temp: 14, condition: 'Rainy', icon: '09d', humidity: 80, windSpeed: 22 },
      { day: 'Thu', date: '3/21/2026', temp: 17, condition: 'Cloudy', icon: '02d', humidity: 70, windSpeed: 15 },
      { day: 'Fri', date: '3/22/2026', temp: 19, condition: 'Sunny', icon: '01d', humidity: 60, windSpeed: 10 }
    ];
  }
};

// Get user's location-based weather
export const getWeatherByCoordinates = async (latitude, longitude) => {
  try {
    // If API key is not configured, return demo data
    if (OPENWEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
      console.warn('Using demo data for geolocation');
      return MOCK_WEATHER_DATA.london;
    }
    
    const response = await fetch(
      `${OPENWEATHER_BASE_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6),
      pressure: data.main.pressure,
      visibility: Math.round(data.visibility / 1000),
      clouds: data.clouds.all,
      timezone: data.timezone,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch weather data');
  }
};

// Get user's geolocation
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser'));
    }
  });
};

export default {
  getWeatherByCity,
  getWeatherForecast,
  getWeatherByCoordinates,
  getUserLocation
};
