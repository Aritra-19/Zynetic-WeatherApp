"use client";

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Droplets, Wind, Calendar, CloudSun, CloudRain, Cloud, Sun, Snowflake } from 'lucide-react';

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState('celsius');

  const WEATHER_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? 'City not found. Please check the spelling and try again.'
            : 'Error fetching weather data. Please try again later.'
        );
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather('India');
  }, []);

  const getWeatherIcon = (weatherId) => {
    if (!weatherId) return <Cloud />;
    if (weatherId >= 200 && weatherId < 300) return <CloudRain className="h-12 w-12" />;
    if (weatherId >= 300 && weatherId < 600) return <CloudRain className="h-12 w-12" />;
    if (weatherId >= 600 && weatherId < 700) return <Snowflake className="h-12 w-12" />;
    if (weatherId >= 700 && weatherId < 800) return <Cloud className="h-12 w-12" />;
    if (weatherId === 800) return <Sun className="h-12 w-12" />;
    return <CloudSun className="h-12 w-12" />;
  };

  const convertTemp = (temp, unit) => {
    if (unit === 'fahrenheit') {
      return ((temp * 9 / 5) + 32).toFixed(1);
    }
    return temp.toFixed(1);
  };

  const getTempUnit = () => temperatureUnit === 'celsius' ? '°C' : '°F';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar
        onSearch={fetchWeather}
        temperatureUnit={temperatureUnit}
        toggleTemperatureUnit={() => setTemperatureUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius')}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Weather</h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading weather data...</p>
          </div>
        ) : error ? (
          <div className="p-6 border border-red-300 bg-red-50 dark:bg-red-900/20 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Error</h3>
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        ) : weatherData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main Weather Card */}
            <Card className="bg-white dark:bg-gray-800 shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span className="text-2xl">{weatherData.name}, {weatherData.sys.country}</span>
                  <span className="text-4xl font-bold">
                    {convertTemp(weatherData.main.temp, temperatureUnit)}{getTempUnit()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="flex items-center">
                    {getWeatherIcon(weatherData.weather[0].id)}
                    <span className="text-lg capitalize ml-2">{weatherData.weather[0].description}</span>
                  </div>

                  <div className="flex flex-1 justify-around gap-4 mt-4 md:mt-0">
                    <div className="flex items-center gap-2">
                      <Droplets className="text-blue-500" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Humidity</div>
                        <div className="font-medium">{weatherData.main.humidity}%</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Wind className="text-blue-500" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Wind Speed</div>
                        <div className="font-medium">{(weatherData.wind.speed * 3.6).toFixed(1)} km/h</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Feels Like</p>
                      <p className="font-medium">
                        {convertTemp(weatherData.main.feels_like, temperatureUnit)}{getTempUnit()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Pressure</p>
                      <p className="font-medium">{weatherData.main.pressure} hPa</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Min Temp</p>
                      <p className="font-medium">
                        {convertTemp(weatherData.main.temp_min, temperatureUnit)}{getTempUnit()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Max Temp</p>
                      <p className="font-medium">
                        {convertTemp(weatherData.main.temp_max, temperatureUnit)}{getTempUnit()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info Card */}
            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Sunrise</p>
                      <p className="font-medium">
                        {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], {
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Sunset</p>
                      <p className="font-medium">
                        {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], {
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Visibility</p>
                      <p className="font-medium">{(weatherData.visibility / 1000).toFixed(1)} km</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Clouds</p>
                      <p className="font-medium">{weatherData.clouds.all}%</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-blue-500" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Last Updated</div>
                        <div className="font-medium">
                          {new Date(weatherData.dt * 1000).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="p-12 text-center border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <p className="text-lg text-gray-700 dark:text-gray-300">Enter a city name to see the current weather</p>
          </div>
        )}
      </main>

      <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
          <p>See the Weather of your desire location</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
