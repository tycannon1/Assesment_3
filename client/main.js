console.log("Hello world")

const drinkDisplay = document.querySelector("#drinkDisplay")
const drinkForm = document.querySelector("form")

// Want to create "cards" for each drink from our database
// Assume that this funciton will be called passing in a drink 
// object from the database = paramater
const createDrinkCard = (drinkObj) => {
    //create a new section element
    const newDrinkCard = document.createElement("section")
    //add a class name of drink card
    newDrinkCard.className = "drinkCard";
    // add some innner html to newDrinkCard
    newDrinkCard.innerHTML = `
    <img src=${drinkObj.picture} />
    <p>${drinkObj.name}</p>

    <section>
        <button onclick="updateDrink(${drinkObj.id}, 'downvote')">-</button>
        Popularity: ${drinkObj.votes}
        <button onclick="updateDrink(${drinkObj.id}, 'upvote')" >+</button>
      </section>


    <br/>

    <button onclick="deleteDrink(${drinkObj.id})">Delete Me</button>
    `;

    drinkDisplay.appendChild(newDrinkCard);
}

//Create a function that takes in an array of drink 
//objects four (our database array), and invokes 
//createDrinks at each object in the array

const displayAllDrinks = (drinkArr) => { 
    for (let i = 0; i < drinkArr.length; i++)
    // at each iteration, create a new drink card passing in the drink object
    createDrinkCard(drinkArr[i])

}

// create a function to make a call to our server
// to retrieve the drink array

const getAllDrinks = () => {
    axios
        .get("/drinks")
        .then((res) => {
            displayAllDrinks(res.data.allDrinks);
        })
}

const handleSubmit = (evt) => {
    evt.preventDefault();
    let name = document.getElementById("drinkName")
    let drinkImg = document.getElementById("drinkImg")

    let bodyObj = {
        drinkName: name.value,
        drinkPic: drinkImg.value

    }

    drinkDisplay.innerHTML = "";
    name.value = "";
    drinkImg.value = "";

    axios.post("/addDrink", bodyObj)
    .then((res) => {
        displayAllDrinks(res.data.allDrinks)
    })
}

// function to delete a drink
const deleteDrink = (id) => {

    //Send an anxious delete request 

    axios
    .delete(`/deleteDrink/${id}`)
    .then((res) => {
        //clear drink display div and repopulate by calling all drinks
        drinkDisplay.innerHTML = ""
        displayAllDrinks(res.data.allDrinks)
    });
}

//Function to update the popularity votes of a drink, this function
//should accept both the drinks id and whether we are upvoting or downvoting
const updateDrink = (id, type) => {
    let bodyObj = {
        voteType: type
    }
    console.log(bodyObj)

    // send a put request providing the body obj and param for the drinks id
    axios
        .put(`/updateDrink/${id}`, bodyObj)
        .then((res) => {
            drinkDisplay.innerHTML = "";
            displayAllDrinks(res.data.allDrinks)
        })
}

//add event listener to the drinkForm to fire a function (handleSubmit) when submitted
drinkForm.addEventListener('submit',
handleSubmit)

getAllDrinks();