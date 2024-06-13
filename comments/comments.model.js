const comments = [
  {
    id: 'comment1',
    text: 'It is a first comment',
    likes: 1
  },
  {
      id: 'comment2',
      text: 'It is a second comment',
      likes: 0
  },
  {
      id: 'comment3',
      text: 'It is a third comment',
      likes: 5
  }
]

function getAllComments() {
  return comments;
}

module.exports = { getAllComments }