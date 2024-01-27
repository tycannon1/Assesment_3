console.log("Hello world")

const albumDisplay = document.querySelector("#albumDisplay")
const AlbumForm = document.querySelector("form")

// Want to create "cards" for each Album from our database
// Assume that this funciton will be called passing in a Album 
// object from the database = paramater
const createAlbumCard = (albumObj) => {
    //create a new section element
    const newAlbumCard = document.createElement("section")
    //add a class name of Album card
    newAlbumCard.className = "AlbumCard";
    // add some innner html to newAlbumCard
    newAlbumCard.innerHTML = `
    <img src=${albumObj.picture} />
    <p>${albumObj.name}</p>
    <p>${albumObj.artistName}</p>

    <section>
        <button onclick="updateAlbum(${albumObj.id}, 'downvote')">-</button>
        Popularity: ${albumObj.votes}
        <button onclick="updateAlbum(${albumObj.id}, 'upvote')" >+</button>
      </section>


    <br/>

    <button onclick="deleteAlbum(${albumObj.id})">Delete Me</button>
    `;

    albumDisplay.appendChild(newAlbumCard);
}

//Create a function that takes in an array of Album 
//objects four (our database array), and invokes 
//createAlbums at each object in the array

const displayAllAlbums = (AlbumArr) => { 
    for (let i = 0; i < AlbumArr.length; i++)
    // at each iteration, create a new Album card passing in the Album object
    createAlbumCard(AlbumArr[i])

}

// create a function to make a call to our server
// to retrieve the Album array

const getAllAlbums = () => {
    axios
        .get("/Albums")
        .then((res) => {
            displayAllAlbums(res.data.allAlbums);
        })
}

const handleSubmit = (evt) => {
    evt.preventDefault();
    let name = document.getElementById("albumName")
    let nameArtist = document.getElementById("albumArtist")
    let albumImg = document.getElementById("albumImg")

    let bodyObj = {
        albumName: name.value,
        albumArtist: nameArtist.value,
        AlbumPic: albumImg.value

    }

    albumDisplay.innerHTML = "";
    name.value = "";
    albumImg.value = "";

    axios.post("/addAlbum", bodyObj)
    .then((res) => {
        displayAllAlbums(res.data.allAlbums)
    })
}

// function to delete a Album
const deleteAlbum = (id) => {

    //Send an anxious delete request 

    axios
    .delete(`/deleteAlbum/${id}`)
    .then((res) => {
        //clear Album display div and repopulate by calling all Albums
        albumDisplay.innerHTML = ""
        displayAllAlbums(res.data.allAlbums)
    });
}

//Function to update the popularity votes of a Album, this function
//should accept both the Albums id and whether we are upvoting or downvoting
const updateAlbum = (id, type) => {
    let bodyObj = {
        voteType: type
    }
    console.log(bodyObj)

    // send a put request providing the body obj and param for the Albums id
    axios
        .put(`/updateAlbum/${id}`, bodyObj)
        .then((res) => {
            albumDisplay.innerHTML = "";
            displayAllAlbums(res.data.allAlbums)
        })
}

//add event listener to the AlbumForm to fire a function (handleSubmit) when submitted
AlbumForm.addEventListener('submit',
handleSubmit)

getAllAlbums();