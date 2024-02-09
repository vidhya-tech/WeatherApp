import { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";

import snow from './assets/sownandcloud.jpg'
import humidity from './assets/humidity.webp'
import wind from './assets/wind.jpg'

import clearicon from './assets/th.jpg'
import cloudicon from './assets/cloud.jpg'
import drizzleicon from './assets/drizzle.webp'
import rainicon from './assets/rain.png'
import './App.css'

const WeatherDetails = ({ icon, temp, city, country, lat, log, windSpeed, humidityValue }) => {
    return (
        <>
            <div className='image'>
                <img src={icon} alt='image' />
            </div>
            <div className="temp">{temp}°C</div>
            <div className="location">{city}</div>
            <div className="country">{country}</div>
            <div className='cord'>
                <div>
                    <span className='lat'>Latitude</span>
                    <span>{lat}</span>
                </div>
                <div>
                    <span className='log'>Longtitude</span>
                    <span>{log}</span>
                </div>
            </div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity} className='icon' alt='humidity' />
                    <div className='data'>
                        <div className='humidity-percent'>
                            {humidityValue}%
                        </div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={wind} className='icon' alt='wind' />
                    <div className='data'>
                        <div className='wind-percent'>
                            {windSpeed}km/h
                        </div>
                        <div className='text'>Windspeed</div>
                    </div>
                </div>
            </div>
        </>
    )
}

function App() {
    let api_key = 'db2649c6219a4f8cf7cb9aa51465dd9b'
    const [text, setText] = useState('chennai')
    const [icon, setIcon] = useState(snow)
    const [temp, setTemp] = useState(0)
    const [city, setCity] = useState("Chennai")
    const [country, setCountry] = useState("INR")
    const [lat, setLat] = useState(0)
    const [log, setLog] = useState(0)
    const [humidityValue, setHumidityValue] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);
    const [cityNotFound, setCityNotFound] = useState(false)
    const [loading, setLoading] = useState(false)

    const weatherIconMap = {
        "01d": clearicon, // clear sky day
        "01n": clearicon, // clear sky night
        "02d": cloudicon, // few clouds day
        "02n": cloudicon, // few clouds night
        "03d": cloudicon, // scattered clouds day
        "03n": cloudicon, // scattered clouds night
        "04d": cloudicon, // broken clouds day
        "04n": cloudicon, // broken clouds night
        "09d": drizzleicon, // shower rain day
        "09n": drizzleicon, // shower rain night
        "10d": rainicon, // rain day
        "10n": rainicon, // rain night
        "11d": rainicon, // thunderstorm day
        "11n": rainicon, // thunderstorm night
        "13d": rainicon, // snow day
        "13n": rainicon, // snow night
        "50d": drizzleicon, // mist day
        "50n": drizzleicon 
    }

    const search = async () => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&APPID=${api_key}&units=metric`

        try {
            let res = await fetch(url)
            let data = await res.json();
            if (data.cod === '404') {
                console.error('city not found')
                setCityNotFound(true);
                setLoading(false)
                return
            }
            setHumidityValue(data.main.humidity);
            setWindSpeed(data.wind.speed);
            setCity(data.name)
            setTemp(Math.floor(data.main.temp));
            setCountry(data.sys.country);
            setLat(data.coord.lat);
            setLog(data.coord.lon);
            const weatherIconCode = data.weather[0].icon;
            setIcon(weatherIconMap[weatherIconCode] || clearicon);
            setCityNotFound(false);
        } catch (error) {
            console.log("An error occurred:", error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleCity = (e) => {
        setText(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            search()
        }
    }

    useEffect(() => {
        search()
    }, []) 
    return (
      <div className='container'>
          <div className='input-container'>
              <input
                  type='text'
                  className='cityInput'
                  placeholder='Search City'
                  onChange={handleCity}
                  value={text}
              />
              <div className='search-icon' onClick={search}>
                  <CiSearch className='searchimg' />
              </div>
          </div>
          {cityNotFound ? (
              <div className="not-found-message">City not found</div>
          ) : (
              <WeatherDetails
                  icon={icon}
                  temp={temp}
                  city={city}
                  country={country}
                  lat={lat}
                  log={log}
                  humidityValue={humidityValue}
                  windSpeed={windSpeed}
              />
          )}
      </div>
  );
  
    
}

export default App
