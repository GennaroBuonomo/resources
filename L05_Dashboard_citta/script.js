const API_URL = "http://localhost:3333";
const ENDPOINT = "/users";

//getDashboardData('london')
    //.then(data => {
        //console.log('Dasboard data:', data);
        //console.log(
            //`${data.city} is in ${data.country}.\n` +
            //`Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
            //`The main airport is ${data.airport}.\n`
        //);
    //})
    //.catch(error => console.error(error));

    async function fetchJeson(url){
      const response = await fetch(url);
      const obj = await response.json();
      return obj;
    }
 


async function getDashboardData(query){
   console.log(`Caricamento della Dashboard per la query "${query}"`);
   const destinationsPromise = fetch (`http://localhost:3333/destinations?search=${query}`);
   console.log(destinationsPromise);
}   

getDashboardData('london')