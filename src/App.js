import React from "react";
import Title from "./components/TitleH";
import Form from "./components/Form";
import W from "./components/Weatherinfo";

const API_KEY = "f27d05564c7fbe9ad364d58a4ad09e5f";
class App extends React.Component 
{
  state = {    
    city: undefined,
    country: undefined,
    temperature: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
}
getWeather = async (e) => {
  e.preventDefault();
  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;
  const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
  const data = await api_call.json();
  console.log(data);
  if (city && country) {
  this.setState({  
  city: data.name,
  country: data.sys.country,
  temperature: data.main.temp,
  humidity: data.main.humidity,
  description: data.weather[0].description,
  error: ""
}
);
  } else {
    this.setState({    
    city: undefined,
    country: undefined,
    temperature: undefined,
    humidity: undefined,
    description: undefined,
    error: "Вы забыли указать значения"
    });
    }
}
  render() {
    return (
    <div>
    <div className="wrapper">
    <div className="main">
    <div className="container">
    <div className="row">
    <div className="col-xs-5 title-container">
    <Title />
    </div>
    <div className="col-xs-7 form-container">
    <Form getWeather={this.getWeather} />
    <W      
    city={this.state.city}
    country={this.state.country}
    temperature={this.state.temperature}
    humidity={this.state.humidity} 
    description={this.state.description}
    error={this.state.error}
    />
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    );
  }
};
export default App;