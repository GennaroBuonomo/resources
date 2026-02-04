type Person = {
  readonly id: number,  // 'readonly' lo rende non modificabile
  readonly name: string,  // 'readonly' lo rende non modificabile
  birth_year: number,
  death_year?: number,  // Il '?' lo rende opzionale
  biography: string,
  image: string
};

type ActressNationality =
  | "American"
  | "British"
  | "Australian"
  | "Israeli-American"
  | "South African"
  | "French"
  | "Indian"
  | "Israeli"
  | "Spanish"
  | "South Korean"
  | "Chinese"

type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality: ActressNationality
}

function isActress(dati: unknown): dati is Actress {
 return (
  typeof dati === 'object' && dati !== null &&
  "id" in dati && typeof dati.id === 'number' && // Proprietà dell id
  "name" in dati && typeof dati.name === 'string' && // Proprietà del nome 
  "birth_year" in dati && typeof dati.birth_year === 'number' && // Proprietà del birth_year 
  "death_year" in dati && typeof dati.death_year === 'number' && // Proprietà del death_year 
  "biography" in dati && typeof dati.biography === 'string' && // Proprietà del biography 
  "image" in dati && typeof dati.image === 'string' && // Proprietà del image 
  "most_famous_movies" in dati &&
  dati.most_famous_movies instanceof Array && 
  dati.most_famous_movies.length === 3 &&
  dati.most_famous_movies.every(m => typeof m === 'string') &&
  "awards" in dati && typeof dati.awards === 'string' && 
  "ActressNationality" in dati && typeof dati.ActressNationality === 'string'
 )
} 

async function getActress(id: number): Promise<Actress | null>{
  try{
    const response = await fetch(`http://localhost:3333/actresses/${id}`);
    const dati: unknown = await response.json();
    if(!isActress(dati)){
      throw new Error('Formato dati non valido');
    }
    return dati;
  }catch(error){
    if(error instanceof Error){
      console.error('Errore durante il recupero dei dati:', error)
    }else{
      console.error('errore sconosciuto:', error)
    }
    return null
  }
}

async function getAllActresses(): Promise<Actress[]> {
  try{
   const response = await fetch(`http://localhost:3333/actresses`);
   if(!response.ok){
    throw new Error(`Errore HTTP ${response.status}: ${response.statusText}`);
   }
   const dati: unknown = response.json();
   if(!(dati instanceof Array)){
     throw new Error('Formato dei dati non valido!')
   }
   const attriciValide: Actress[] = dati.filter(isActress)
   return attriciValide


  }catch(error){
      if(error instanceof Error){
      console.error('Errore durante il recupero dei dati:', error)
    }else{
      console.error('errore sconosciuto:', error)
    }
    return [];
  }
}

async function getActresses(ids: number[]): Promise<(Actress | null)[]>{
try{
 const promises = ids.map(id => getActress(id));
 const actresses = await Promise.all(promises);
 return actresses;
}catch(error){
      if(error instanceof Error){
      console.error('Errore durante il recupero dei dati:', error)
    }else{
      console.error('errore sconosciuto:', error)
    }
    return [];
  }
}