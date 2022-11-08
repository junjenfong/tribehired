//intended to GROUP BY postId, count all the numbers，then ORDER BY

function handleCommentsCount(arr) {
  //to achieve grouping (passed)
  const result = arr.reduce(function (r, a) {
    r[a.postId] = r[a.postId] || [];
    r[a.postId].push(a);
    return r;
  }, {});
  //make object form if total number of commitment by post id
  // sample data is {post_id: '1', total_number_of_comments: '2'}
  var tempData = {};
  for (var index in result) {
    tempData[index] = result[index].length;
  }

  //index is postId, value is commentCount
  var sortingArr = [];
  for (var postId in tempData) {
    sortingArr.push({
      post_id: postId,
      total_number_of_comments: tempData[postId]
    });
  }
  //sort in descending order
  var sortedArray = sortingArr.sort(function (a, b) {
    return b.total_number_of_comments - a.total_number_of_comments;
  });

  return sortedArray;
}

function topPostByComments(postArr, commentsCount) {
  //trying to match the data from api by the post id and construct a new array with the list of top post
  var finalPosts = commentsCount.map((comments) => {
    const obj = postArr.find((post) => post.id === +comments.post_id);
    comments.post_title = obj.title;
    comments.post_body = obj.body;

    return comments;
  });

  return finalPosts;
}

module.exports = { handleCommentsCount, topPostByComments };
