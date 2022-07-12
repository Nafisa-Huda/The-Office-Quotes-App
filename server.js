//Declared Variables
const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 3001;
require("dotenv").config();

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "the-office-quotess";

//Connect to Mongo
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  }
);

app.set("view engine", "ejs");
app.use(express.static("public")); // serves static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  db.collection("quotes")
    .find()
    .toArray() //quotesCollection containes all quotes from the database. The toArray method converts data onto one array so quotes are easier to access.
    .then((results) => {
      console.log(results);
      res.render("index.ejs", { quotes: results });
    })
    .catch((error) => console.error(error));
});
app.post("/quotes", (req, res) => {
  db.collection("quotes")
    .insertOne(req.body)
    .then((result) => {
      console.log(result);
      res.redirect("/"); //After making an entry its going to redirect back to the index.html page instead of /quotes page to make another entry if we want to.
    })
    .catch((error) => console.error(error));
});
app.put("/quotes", (req, res) => {
  db.collection("quotes")
    .findOneAndUpdate(
      { name: "Jim Halpert" },
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote,
        },
      },
      {
        upsert: true,
      }
    )
    .then((result) => {
      console.log(result);
      res.json("Success");
    })
    .catch((error) => console.eror(error));
});
app.delete("/quotes", (req, res) => {
  db.collection("quotes")
    .deleteOne({ name: req.body.name })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.json("No quote to delete");
      }
      res.json("Deleted Dwight Schrute quote");
    })
    .catch((error) => console.eror(error));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`The server is running on port ${PORT}! You better go catch it!`);
});
/// .catch(error => console.error(error))
