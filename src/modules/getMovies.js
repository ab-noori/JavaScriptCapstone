export const getMovie = async () => {
  const getMovie = await fetch('https://api.tvmaze.com/shows');
  const result = await getMovie.json();
  return result;
};


const api = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/kGrjdjNcrGMNvlVKgo0w/likes'

export const getLikes = async () => {
  const likesApi = await fetch(api);
  const likesArray = await likesApi.json();
  return likesArray;
 //console.log(likesArray);
};

export const postLikes = async (item_id, likes) => {
  const settings = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ item_id, likes }),
  };  
    const fetchRes = await fetch(api, settings);
    const data = await fetchRes.json();
    return data;
    //console.log(data); 
};









