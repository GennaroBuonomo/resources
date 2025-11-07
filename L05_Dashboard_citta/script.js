/*getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));*/

    async function fetchJson(url) {
        const response = await fetch(url);
        const obj = await response.json();
        return obj;
    }

    async function getDashboardData(query){

      console.log(`Caricando la dashboard per la query"${query}"`);

      const destinationsPromise = await fetchJson(`http://localhost:3333/destinations?search=${query}`);
      const weathersPromise = await fetchJson(`http://localhost:3333/weathers?search=${query}`);
      const airportsPromise = await fetchJson(`http://localhost:3333/airports?search=${query}`);

      const promises = [destinationsPromise, weathersPromise, airportsPromise];
      const [destinations, weathers, airports] = await Promise.all(promises);
      
      return {
        city: destinations[0].name,
        country: destinations[0].country,
        temperature: weathers[0].temperature,
        weather: weathers[0].weather_description,
        airport: airports[0].name
      }
    }

    getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));