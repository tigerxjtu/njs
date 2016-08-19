const ObjectId = $.utils.ObjectId;

exports.users = [{
  "_id": ObjectId("574679c8ed72e8152c5253b0"),
  "name": "test0",
  "email": "test0@example.com",
  "password": "24:11D149B420680C89EF1F75E0C9511611:E0",
}];

exports.topics=[{
    "_id" : ObjectId("578702f6abd194780b21aac8"),
    "title" : "这是第二篇文章",
    "tags" : "文章,灌水",
    "content" : " 很好很好",
    "authorId" : ObjectId("574679c8ed72e8152c5253b0"),
    "comments" : []
}];