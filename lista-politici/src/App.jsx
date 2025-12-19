import './App.css';
import { useState, useEffect } from 'react'

function App() {

  const [politicians, setPoliticians] = useState([]) 

  useEffect(() => {
    fetch("http://localhost:3333/politicians")
    .then((res) => res.json())
    .then((data) => setPoliticians(data))
    .catch((error) => console.error("Errore nel recupero dati:", error));
  }, []);

  

  return (
    <div>
      <h1>Lista dei Politici</h1>
      <div className="politicians-list">
        {politicians.map(politician => (
          <div className="card" key={politician.id}>
            <img src={politician.image} alt={politician.name} />
            <div className="card-content">
              <h2>{politician.name}</h2>
              <span className="position-tag">{politician.position}</span>
              <p className="biography">{politician.biography}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  
}

export default App