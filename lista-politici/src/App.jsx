import './App.css';
import { useState, useEffect, useMemo } from 'react'

function App() {
  const [politicians, setPoliticians] = useState([]) 
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetch("http://localhost:3333/politicians")
    .then((res) => res.json())
    .then((data) => setPoliticians(data))
    .catch((error) => console.error("Errore nel recupero dati:", error));
  }, []);

  const filteredPoliticians = useMemo(() => {
    return politicians.filter((p) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        p.name.toLowerCase().includes(searchLower) || 
        p.biography.toLowerCase().includes(searchLower)
      );
    });
  }, [politicians, searchTerm]);

  return (
    <div>
      <h1>Lista dei Politici</h1>
      
      {/* AGGIUNGI QUESTO: Il campo di ricerca */}
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Cerca politico..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="politicians-list">
        {/* MODIFICA QUESTO: usa filteredPoliticians invece di politicians */}
        {filteredPoliticians.map(politician => (
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