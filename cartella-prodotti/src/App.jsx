import { useState, useEffect, useCallback } from 'react';
import './App.css'

const debounce = (callback, delay) => {
  let timeout;
  return (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(value)
    }, delay)
  };
};



function App() {

  const [suggerimenti, setSuggerimenti] = useState([])
  const [query, setQuery] = useState ("")

  const fetchProducts = async (query) => {
    if(!query.trim()){
      setSuggerimenti([]);
      return;
    }
     
    try{
      const res = await fetch(`http://localhost:3333/products?search=${query}`);
      const data = await res.json();
      setSuggerimenti(data);
      console.log('API')
    }catch(error){
      console.error(error);
    }

  }

  const debouncedFetchProducts = useCallback(
    debounce(fetchProducts, 500)
  , []);
  

  useEffect(() => {
  debouncedFetchProducts(query)
  }, [query]);

return (
  <div className="search-wrapper"> 
    <h1>Lista Prodotti</h1>
    
    <input 
      type="text"
      placeholder="Cerca il prodotto..." 
      value={query}
      onChange={e => setQuery(e.target.value)}
    />

    {suggerimenti.length > 0 && (
      <div className="dropdown">
        {suggerimenti.map((product) => (
          <p key={product.id}>{product.name}</p>
        ))}
      </div>
    )}
  </div>
);
}

export default App
