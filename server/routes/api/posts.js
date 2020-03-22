const express = require("express");
const mongodb = require("mongodb");
//admin adminPass
const router = express.Router();

//GET
router.get("/", async (req, res) => {
  const postsDB = await loadPostsCollection();
  res.send(await postsDB.find({}).toArray());
});

//ADD

router.post("/", async (req, res) => {
  const postsDB = await loadPostsCollection();
  await postsDB.insertOne({
    createdAt: new Date(),
    text: req.body.text
  });

  res.status(201).send();
});

//UPDATE

router.put('/update/:id', async (req, res) => {
  const postsDB = await loadPostsCollection();
  postsDB.updateOne(
    { _id: new mongodb.ObjectID(req.params.id) },
    { $set: { "text": req.body.text } },
    function (err, doc) {
      if (err)
        return console.error(err);
    });

  res.status(200).send({ msg: "uppdatering utförd" });
})

//DELTE
router.delete("/:id", async (req, res) => {
  const postsDB = await loadPostsCollection();
  await postsDB.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

//Koppla upp till databasen i en funktion

async function loadPostsCollection() {
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb://admin:adminPass@dt162g-shard-00-00-je3jq.mongodb.net:27017,dt162g-shard-00-01-je3jq.mongodb.net:27017,dt162g-shard-00-02-je3jq.mongodb.net:27017/test?ssl=true&replicaSet=dt162g-shard-0&authSource=admin&retryWrites=true&w=majority";
  const client = await new MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return client.db("dt162g").collection("posts");
}

module.exports = router;
