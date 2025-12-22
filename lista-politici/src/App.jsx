import { useState, useEffect, useMemo, memo } from 'react';
import './App.css';


function PoliticianCard ({name, image, position, biography}){
  console.log("Card");
  return (
    <div className="card">
      <img src={image} alt={name} />
      <div className="card-content">
        <h2>{name}</h2>
        <span className="position-tag">{position}</span>
        <p className="biography">{biography}</p>
      </div>
    </div>
  );
}

const MemoizedPoliticianCard = memo(PoliticianCard);

function App() {
  const [politicians, setPoliticians] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  
  useEffect(() => {
    fetch("http://localhost:3333/politicians")
      .then((res) => res.json())
      .then((data) => setPoliticians(data))
      .catch((error) => console.error("Errore nel caricamento:", error));
  }, []);

 
const filteredPoliticians = useMemo(() => {
  return politicians.filter((p) => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.biography.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [politicians, searchTerm]);

  return (
    <div className="container">
      <h1>Lista dei Politici</h1>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Cerca per nome o biografia..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="politicians-list">
        {filteredPoliticians.map(politician => (
          <MemoizedPoliticianCard key={politician.id} {...politician} />
        ))}
      </div>
    </div>
  );
}

export default App;