import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [label, setLabel] = useState("");

  const handleChangeLabel = (event) => {
    setLabel(event.target.value);
  }

  const handleClick = async () => {
    const response = await fetch("http://localhost:8080/api/v1/circuits");
    const products = await response.json();
    console.log(products);
  }

  const handleClick2 = async () => {
    const response = await fetch("http://localhost:8080/api/v1/circuits",{
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        label: label
      })
    });
    const json = await response.json();
    console.log(json);

    setLabel("");
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Teste</p>
        <input onChange={handleChangeLabel} value={label} />
        <button onClick={handleClick}>LISTAR PRODUTOS</button>
        <button onClick={handleClick2}>INSERIR PRODUTO</button>
      </header>
    </div>
  );
}

export default App;
