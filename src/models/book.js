class Book {
  constructor(id_book, id_user, title, type, author, price, photo) {
    this.id_book = id_book;
    this.id_user = id_user;
    this.title = title;
    this.type = type;
    this.author = author;
    this.price = price;
    this.photo = photo;
  }

  bookInfo() {
    return {
      id_book: this.id_book,
      id_user: this.id_user,
      title: this.title,
      type: this.type,
      author: this.author,
      price: this.price,
      photo: this.photo,
    };
  }

  update(id_book, id_user, title, type, author, price, photo) {
    this.id_book = id_book;
    this.id_user = id_user;
    this.title = title;
    this.type = type;
    this.author = author;
    this.price = price;
    this.photo = photo;
  }
}
