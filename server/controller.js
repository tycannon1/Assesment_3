import Albums from './db.json' assert { type: 'json'}

let globalId = 4;

const handlerFunctions = {
    sayHello: (req,res) => {
        res.send({
           message: "Hello There"
        })
},

getAllAlbums: (req, res) => {
    res.send({
        message: "Here are the Albums",
        allAlbums: Albums
    })
},

addAlbum: (req, res) => {
    //Create a new Album object, passing in the values from the req object
    //add that new Album to our Album array (Albums)
    const albumName = req.body.albumName
    const albumArtist = req.body.albumArtist
    const AlbumPic = req.body.AlbumPic

    const newAlbum = {
        id: globalId,
        picture: AlbumPic,
        name: albumName,
        name: albumArtist,
        votes: 0,

    };

    Albums.push(newAlbum)

    globalId++

    res.send({
        message: "Album added successfully",
        allAlbums: Albums,
    })
},

deleteAlbum: (req, res) => {
    const AlbumId = req.params.id;

//find the Album objects with the matching id from our Albums array 
//then remove it from the Albums array

    for (let i = 0; i < Albums.length; i++) {
        //iterate through Albums, if a Album's id 
        //is a match, then we will delete with a splice
        if (Albums[i].id === +AlbumId) {
            // +"5" === Number("5")
            Albums.splice(i, 1)
            break
        }
    }
    
    res.send({
        message: "Album deleted",
        allAlbums: Albums,
    })
},

updateAlbum: (req, res) => {
    //grab the id from re.params
const AlbumId = req.params.id;

const voteType = req.body.voteType;

const AlbumIdx = Albums.findIndex((Album) => {
    return Album.id === +AlbumId
})

console.log("Got here")
//based on vote type increment or decrement the Albums.votes roperty

if (voteType === "upvote") {
    Albums[AlbumIdx].votes += 1

} else if (voteType === "downvote") {
    Albums[AlbumIdx].votes -= 1
}

res.send ({
    message: "Vote Count Updated",
    allAlbums: Albums
})

}, 


};

export default handlerFunctions;