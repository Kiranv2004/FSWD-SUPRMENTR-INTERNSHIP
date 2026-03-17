// Weather condition icons and styling helpers

export const getWeatherIcon = (iconCode, condition) => {
  const iconMap = {
    '01d': '☀️',   // Clear sky day
    '01n': '🌙',   // Clear sky night
    '02d': '⛅',   // Few clouds day
    '02n': '🌤️',   // Few clouds night
    '03d': '☁️',   // Scattered clouds day
    '03n': '🌥️',   // Scattered clouds night
    '04d': '☁️',   // Broken clouds day
    '04n': '🌥️',   // Broken clouds night
    '09d': '🌧️',   // Shower rain day
    '09n': '🌧️',   // Shower rain night
    '10d': '🌦️',   // Rain day
    '10n': '🌧️',   // Rain night
    '11d': '⛈️',   // Thunderstorm day
    '11n': '⛈️',   // Thunderstorm night
    '13d': '❄️',   // Snow day
    '13n': '❄️',   // Snow night
    '50d': '🌫️',   // Mist day
    '50n': '🌫️'    // Mist night
  };
  
  return iconMap[iconCode] || '🌤️';
};

export const getBackgroundClass = (condition, isNight = false) => {
  const conditionLower = condition.toLowerCase();
  
  if (isNight) {
    return 'bg-night';
  }
  
  if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
    return 'bg-sunny';
  }
  
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return 'bg-rainy';
  }
  
  if (conditionLower.includes('cloud')) {
    return 'bg-cloudy';
  }
  
  if (conditionLower.includes('thunderstorm')) {
    return 'bg-night';
  }
  
  if (conditionLower.includes('snow')) {
    return 'bg-cloudy';
  }
  
  return 'bg-clear';
};

export const describeWeather = (condition) => {
  const descriptions = {
    'Clear': 'It\'s a beautiful, clear day! Perfect for outdoor activities.',
    'Cloudy': 'Cloudy skies today. Maybe bring an umbrella just in case.',
    'Rainy': 'It\'s raining. Stay dry and enjoy a cozy day indoors.',
    'Thunderstorm': 'Thunderstorm detected. Stay safe and indoors!',
    'Snowy': 'It\'s snowing! A perfect winter day.',
    'Sunny': 'Sunny and bright! Perfect time to go outside.',
    'Windy': 'It\'s quite windy today. Hold onto your hat!',
    'Foggy': 'Foggy conditions. Drive safely if you\'re going out.',
    'Mist': 'Misty surroundings. Be careful if driving.'
  };
  
  for (const [key, value] of Object.entries(descriptions)) {
    if (condition.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  
  return `Current condition: ${condition}`;
};

export const convertTemperature = (temp, toFahrenheit = false) => {
  if (toFahrenheit) {
    return Math.round((temp * 9/5) + 32);
  }
  return temp;
};

export const getWindDirection = (degrees) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(((degrees % 360) / 45));
  return directions[index % 8];
};

export const formatTime = (timestamp, timezone) => {
  const date = new Date((timestamp + (timezone / 3600)) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const getAQIColor = (aqi) => {
  if (aqi <= 50) return '#4caf50'; // Good - Green
  if (aqi <= 100) return '#8bc34a'; // Moderate - Light Green
  if (aqi <= 150) return '#ffc107'; // Unhealthy for Sensitive Groups - Yellow
  if (aqi <= 200) return '#ff9800'; // Unhealthy - Orange
  if (aqi <= 300) return '#f44336'; // Very Unhealthy - Red
  return '#9c27b0'; // Hazardous - Purple
};

export const getAQILabel = (aqi) => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};
