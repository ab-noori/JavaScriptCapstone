export const getMovie = async () => {
  const getMovie = await fetch('https://api.tvmaze.com/shows');
  const result = await getMovie.json();
  return result;
};

const api = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/yGJsLE5rhYlcLOG1HopD/likes';

export const getLikes = async () => {
  const likesApi = await fetch(api);
  const likesArray = await likesApi.json();
  return likesArray;
};

export const postLikes = async (itemId) => {
  const settings = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ itemId }),
  };
  const fetchRes = await fetch(api, settings);
  return fetchRes;
};
