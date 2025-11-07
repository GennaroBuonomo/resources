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

async function getDashboardData(query){
   console.log(`Caricamento della Dashboard per la query "${query}"`);
   const response = await fetch (`http://localhost:3333/destinations?search=${query}`);
   const destinations = await response.json();
   console.log(destinations);
}

getDashboardData('london')