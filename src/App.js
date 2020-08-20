import React,{ useState}from 'react';
import './App.css';

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt  => {
    if(evt.key ==="Enter"){
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=b650b82f53ea68df8d6dafb07f73f16d`)
      .then(res=>res.json())
      .then(data => {
        setWeather(data);
        setQuery("");
        console.log(data)
      });
    }
  }

  const dateBuider = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App-warm' : 'App') : 'App'}>
      <main>
        <div className = "search-box">
          <input type="text"
              className ="search-bar"
              placeholder = "search ..."
              onChange={e=>setQuery(e.target.value)}
              value ={query}
              onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div className = "location-box">
          <div className ="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{ dateBuider(new Date())}</div>
          <div className="weather-box">
            <div className ="temp">
              {Math.round(weather.main.temp - 273.15) }°C
            </div>
            <div className="weather">
              {weather.weather[0].main}
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
