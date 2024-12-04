// @ts-nocheck
const fetchTitle = async (tconst) => {
  return fetch(`https://localhost:5002/api/title/${tconst}`)
    .then((response) => response.json())
    .then((data) => data);
};

const fetchPerson = async (url) => {
  const nconst = url.split('/').pop();
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const photoUrl = `https://api.themoviedb.org/3/find/${nconst}?external_source=imdb_id&api_key=${apiKey}`;

  return fetch(url)
    .then((response) => response.json())
    .then(async (data) => {
      return {
        ...data,
        photoUrl: await fetchPersonPhoto(photoUrl),
      };
    });
};

const fetchPersonPhoto = async (photoUrl) => {
  return fetch(photoUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.person_results[0]?.profile_path) {
        const photoPath = data.person_results[0].profile_path;
        return 'https://image.tmdb.org/t/p/original/' + photoPath;
      }
      return null;
    });
};

const getTitleAndPersons = async (tconst) => {
  const title = await fetchTitle(tconst);

  let production = [];
  let knownFors = [];
  let principals = [];

  if (title.productionPersons && title.productionPersons.length > 0) {
    production = await Promise.all(
      title.productionPersons.map(async (productionPerson) => {
        if (productionPerson.url) {
          const person = await fetchPerson(productionPerson.url);
          return {
            person,
            roleId: productionPerson.roleId,
          };
        }
        return null;
      })
    );
  }

  if (title.principals && title.principals.length > 0) {
    principals = await Promise.all(
      title.principals.map(async (principals) => {
        if (principals.personUrl) {
          const person = await fetchPerson(principals.personUrl);

          if (principals.characters) {
            const characterArray = JSON.parse(
              principals.characters.replace(/'/g, '"')
            );

            principals.characters = characterArray;
          }

          return {
            ...principals,
            person,
          };
        }
        return null;
      })
    );
  }

  if (title.knownFors && title.knownFors.length > 0) {
    knownFors = await Promise.all(
      title.knownFors.map((knownFors) => {
        if (knownFors.url) {
          return fetchPerson(knownFors.url);
        }
        return null;
      })
    );
  }

  const titleAndPersonsObject = {
    ...title,
    productionPersons: production,
    principals,
    knownFors,
  };
  console.log(titleAndPersonsObject);
  return titleAndPersonsObject;
};

export { getTitleAndPersons };
