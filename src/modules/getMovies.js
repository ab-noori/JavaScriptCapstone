export const getMovie = async() => {
        const getMovie = await fetch('https://api.tvmaze.com/shows');
        const result = await getMovie.json();
        return result; 
}

export const involve = async() => {
    try{
        const involveData = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/1sJhZQQrIszrR5zukipa/likes/');
        const involveResult = await(involveData).json();
        //return involveResult;

        involveResult.forEach(item => {
            console.log(item.app_id)

        });

    }catch(err){
        console.log(err);
    }
}
