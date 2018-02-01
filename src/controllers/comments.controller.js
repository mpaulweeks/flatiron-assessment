class CommentsController {
  constructor() {
    this.$addCommentForm = $('.add-comment')
  }

  init() {
    this.addCommentFormListener();
  }

  addCommentFormListener() {
    [...document.getElementsByClassName('add-comment')].forEach(form => {
      form.addEventListener('submit', event => {
        event.preventDefault();
        const imageId = parseInt(event.target.getAttribute('data-id'));
        const commentInput = document.getElementById(`comment-description-${imageId}`);
        const newComment = new Comment(commentInput.value, imageId);
        commentInput.value = '';
        this.render(newComment);
      }, false);
    });
  }

  render(commentObject) {
    const commentUl = document.getElementById(`comments-${commentObject.image.id}`);
    commentUl.innerHTML += commentObject.commentEl();
  }
}
