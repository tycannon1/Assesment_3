import express from "express"
import session from "express-session"
import cors from "cors"
import morgan from "morgan"



//set up express instance
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("client"));
app.use(
  session({
    secret: "Thisisasupersecret",
    saveUninitialized: true,
    resave: false,
  })
);

//Import handlers
import handlerFunctions from "./controller.js"

//ROUTES

app.get("/hello", handlerFunctions.sayHello)
app.get("/Albums", handlerFunctions.getAllAlbums);
app.post("/addAlbum", handlerFunctions.addAlbum);
app.delete("/deleteAlbum/:id", handlerFunctions.deleteAlbum);
app.put("/updateAlbum/:id", handlerFunctions.updateAlbum)


//start up the server

app.listen(8003, () => console.log("hmmm at http://localhost:8003"))