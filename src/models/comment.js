// create Comment class here

let _Comment_all = [];
let _Comment_id = 0; // track ID separate from all.length in case comments are removed

class Comment {
  constructor(comment, imageId) {
    this.id = _Comment_id++;
    this.commentContent = comment;
    this.image = this.findImage(imageId);
    _Comment_all.push(this);
  }

  static get all() {
    return _Comment_all;
  }

  findImage(imageId) {
    // could access Image.all[imageId], but it's safer to iterate and compare ids
    let imageObj = undefined;
    Image.all.forEach(image => {
      // image gets set to null when deleted
      if (image && image.id === imageId){
        imageObj = image;
      }
    });
    if (!imageObj){
      throw 'imageId invalid';
    }

    // add this comment if not already added
    const thisComment = this;
    let added = false;
    imageObj.comments.forEach(imageComment => {
      added = added || thisComment.id === imageComment.id;
    });
    if (!added){
      imageObj.comments.push(thisComment);
    }

    return imageObj;
  }

  commentEl() {
    return `
      <li id="${this.id}">
        ${this.commentContent}
      </li>
    `;
  }
}
