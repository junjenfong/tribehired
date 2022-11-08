//DISCLAIMER: I am inteded to do with axios to extract data from the external api. However, the data extracted seems to be fixed in term of comments so no comparison can be observed.

const express = require("express");
const router = express.Router();
const axios = require("axios");
const { response } = require("express");
const {
  handleCommentsCount,
  topPostByComments
} = require("../functions/functions");

const { commentsArr, postArr } = require("../Enum/Data");
// function
router.get("/top-post", async (req, res) => {
  // get comments
  // comments endpoint – https://jsonplaceholder.typicode.com/comments

  // let postArr = [];
  // commentsArr = await axios
  //   .get("https://jsonplaceholder.typicode.com/comments")
  //   .then((res) => {
  //     let arr = [];
  //     res.data.map((comments) => {
  //       arr.push(comments);
  //     });

  //     return arr;
  //   })
  //   .catch((err) => console.log(err));

  var commentsCount = handleCommentsCount(commentsArr);
  var topListByCommentsCount = topPostByComments(postArr, commentsCount);
  res.send(topListByCommentsCount);
});

router.get("/comments", async (req, res) => {
  let { searchBy, searchTerm } = req.query;
  console.log(searchBy, searchTerm);
  let filtered = commentsArr.filter((comment) =>
    comment[searchBy].includes(searchTerm)
  );
  try {
    res.send(
      `Search Completed! Here is the data: 
    ${JSON.stringify(filtered, null, 4)}`
    );
  } catch {
    res.status(404).send("Something went wrong");
  }
});
module.exports = router;
