import React from 'react';
import './App.css';

const App = () => {
  const handleClick = async () => {
    const response = await fetch("http://localhost:8080/api/v1/WeatherForecast");
    const products = await response.json();
    console.log(products);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Teste</p>
        <button onClick={handleClick}>LISTAR PRODUTOS</button>
      </header>
    </div>
  );
}

export default App;
