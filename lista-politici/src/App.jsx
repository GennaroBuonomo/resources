import { useState, useEffect, useMemo, memo } from 'react';
import './App.css';


const PoliticianCard = memo(({ politician }) => {

  console.log(`Render di: ${politician.name}`);

  return (
    <div className="card">
      <img src={politician.image} alt={politician.name} />
      <div className="card-content">
        <h2>{politician.name}</h2>
        <span className="position-tag">{politician.position}</span>
        <p className="biography">{politician.biography}</p>
      </div>
    </div>
  );
});


PoliticianCard.displayName = 'PoliticianCard';



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
    console.log("--- Eseguo il filtro dei dati ---");
    return politicians.filter((p) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        p.name.toLowerCase().includes(searchLower) || 
        p.biography.toLowerCase().includes(searchLower)
      );
    });
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
        <p className="results-count">
          Risultati trovati: <strong>{filteredPoliticians.length}</strong>
        </p>
      </div>
      <div className="politicians-list">
        {filteredPoliticians.map((politician) => (
          <PoliticianCard key={politician.id} politician={politician} />
        ))}
      </div>
      {filteredPoliticians.length === 0 && (
        <p className="no-results">Nessun politico trovato per la tua ricerca.</p>
      )}
    </div>
  );
}

export default App;