import drinks from './db.json' assert { type: 'json'}

let globalId = 4;

const handlerFunctions = {
    sayHello: (req,res) => {
        res.send({
           message: "Hello There"
        })
},

getAllDrinks: (req, res) => {
    res.send({
        message: "Here are the drinks",
        allDrinks: drinks
    })
},

addDrink: (req, res) => {
    //Create a new drink object, passing in the values from the req object
    //add that new drink to our drink array (drinks)
    const drinkName = req.body.drinkName
    const drinkPic = req.body.drinkPic

    const newDrink = {
        id: globalId,
        picture: drinkPic,
        name: drinkName,
        votes: 0,

    };

    drinks.push(newDrink)

    globalId++

    res.send({
        message: "Drink added successfully",
        allDrinks: drinks,
    })
},

deleteDrink: (req, res) => {
    const drinkId = req.params.id;

//find the drink objects with the matching id from our drinks array 
//then remove it from the drinks array

    for (let i = 0; i < drinks.length; i++) {
        //iterate through drinks, if a drink's id 
        //is a match, then we will delete with a splice
        if (drinks[i].id === +drinkId) {
            // +"5" === Number("5")
            drinks.splice(i, 1)
            break
        }
    }
    
    res.send({
        message: "Drink deleted",
        allDrinks: drinks,
    })
},

updateDrink: (req, res) => {
    //grab the id from re.params
const drinkId = req.params.id;

const voteType = req.body.voteType;

const drinkIdx = drinks.findIndex((drink) => {
    return drink.id === +drinkId
})

console.log("Got here")
//based on vote type increment or decrement the drinks.votes roperty

if (voteType === "upvote") {
    drinks[drinkIdx].votes += 1

} else if (voteType === "downvote") {
    drinks[drinkIdx].votes -= 1
}

res.send ({
    message: "Vote Count Updated",
    allDrinks: drinks
})

}, 


};

export default handlerFunctions;