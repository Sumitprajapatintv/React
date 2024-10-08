
import React from "react";
import './App.css'
function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

async function getWeather(location) {
  try {
    // 1) Getting location (geocoding)

  } catch (err) {
    console.err(err);
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: "", isLoading: false, displaylocation: "", whether: "" };
    this.fetchWhether = this.fetchWhether.bind(this);
  }
  async fetchWhether() {
    try {
      this.setState({ isLoading: true })
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      this.setState({ displaylocation: `${name} ${convertToFlag(country_code)}` });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      this.setState({ whether: weatherData.daily });
    } catch (error) {
      console.log(error);
    }
    finally {
      this.setState({ isLoading: true })
    }

  }

  render() {
    return <div className="app">
      <h1>Classy Whether App</h1>
      <div>
        <input
          type="text"
          placeholder="Search for Location"
          value={this.state.location}
          onChange={(e) => this.setState({ location: e.target.value })}
        />
        <button onClick={this.fetchWhether}>Get Whether</button>
      </div>
    </div>
  }
}

export default App; 