import { useState } from 'react'
import { CiSearch } from "react-icons/ci";
// import clearimg from './assets/th.jpg'
import snow from './assets/sownandcloud.jpg'
import humidity from './assets/humidity.webp'
import wind from './assets/wind.jpg'


import './App.css'
const WeatherDetails =({icon,temp,city,country,lat,log,windSpeed,humidityValue}) =>{
  return(
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
      <img src={humidity} className='icon' alt='humidity'/>
        <div className='data'>
          <div className='humidity-percent'>
            {humidityValue}%
          </div>
          <div className='text'>Humidity</div>
        </div>
      </div>
      <div className='element'>
      <img src={wind} className='icon' alt='wind'/>
        <div className='data'>
          <div className='wind-percent'>
          {windSpeed}km/h
          </div>
          <div className='text'>windspeed</div>
        </div>
      </div>
    </div>
  </>
  )
}

function App() {
  let api_key ='db2649c6219a4f8cf7cb9aa51465dd9b'
  const [text,setText] =useState('chennai')
  const [icon, setIcon] = useState(snow)
  const [temp, settemp] = useState(0)
  const [city, setcity] = useState("Chennai")
  const [country, setcountry] = useState("INR")
  const [lat, setLat] = useState(0)
  const [log, setlog] = useState(0)
  const [humidityValue, setHumidityValue] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [cityNotfound ,setcityNotFound] =useState(false)
  const [loading ,setLoading] =useState(false)


  const search =async ()=>{
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&APPID=${api_key}&units=metric`

        try{
          let res= await fetch(url)
          let data =await res.json();
         if(data.cod=== '404'){
          console.error('city not found')
          setcityNotFound(true)
          setLoading(false)
          return
         }
         
        }
        catch(error){
           console.log("An error occurres:" ,error.message)
        }finally{
           setLoading(false)
        }

  }
  const handlecity =(e)=>{
   setText(e.target.value)
  }
  const handlekeydown=(e)=>{
  if(e.key === 'Enter'){
    search()
  }
   }

   
  return (
    <>
    <div className='container'>
      <div className='input-container'>
        <input type='text' 
        className='cityInput'
        placeholder='Search City' 
        onChange={handlecity}
        value={text}
      />
        <div className='search-icon' onClick={() =>search()}>
        <CiSearch className='searchimg' />
        </div>
      </div>
      <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat}
  log={log} humidity={humidityValue} wind={windSpeed}
/>

    </div>
      
    </>
  )
}

export default App
