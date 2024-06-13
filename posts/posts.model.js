const posts = [
  {
      id: 'post1',
      title: 'Ii is a first post',
      description: 'It is a first post descrition',
      comments: [{
          id: 'comment1',
          text: 'It is a first comment',
          likes: 1
      }]
  },
  {
      id: 'post2',
      title: 'Ii is a second post',
      description: 'It is a second post descrition',
      comments: []
  },
  {
      id: 'post3',
      title: 'Ii is a third post',
      description: 'It is a third post descrition',
      comments: [{
          id: 'comment3',
          text: 'It is a third comment',
          likes: 5
      }]
  }
]

function getAllPosts () {
    return posts;
}

module.exports = { getAllPosts }