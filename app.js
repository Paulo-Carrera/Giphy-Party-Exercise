const $gifArea = $('#gif-area'); 
const $searchInput = $('#gif-input'); 
const $form = $('#input-form'); 
const $removeBtn = $('#removeBtn')

function addGif(res){
    try{
        let numResults = res.data.length;
        if (numResults){
            let randomIndx = Math.floor(Math.random() * numResults); 

            let $newCol = $("<div>", );
            let $newGif = $("<img>", {src: res.data[randomIndx].images.original.url});
            $newCol.append($newGif);
            $gifArea.append($newCol);
        }else{
            throw new Error("NO GIFS FOUND");
        }
    }catch(error){
        alert('NO GIFS FOUND');
    }
}

$form.on('submit', async function(event){
    event.preventDefault();

    let searchTerm = $searchInput.val();
    $searchInput.val(''); 

    const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
        params: {
            q: searchTerm,
            api_key: '0YIMvwHbwr9ISsHSuUZijIyjxW4cf4oN',
        }
    });
    addGif(response.data);
});

$removeBtn.on('click' , function(e){
    e.preventDefault();
    const $gifArea = $('#gif-area');
    $gifArea.empty();
});
