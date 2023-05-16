import {Component, OnInit} from '@angular/core';
import {BookSave} from "../model/book-save";
import {Author} from "../model/author";
import {Genre} from "../model/genre";
import {AuthorService} from "../service/author.service";
import {GenreService} from "../service/genre.service";
import {Router} from "@angular/router";
import {BookService} from "../service/book.service";

@Component({
  selector: 'app-book-form',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  bookSave: BookSave;

  authors: Author[];
  genres: Genre[];

  constructor(public router: Router,
              private bookService: BookService,
              private authorService: AuthorService,
              private genreService: GenreService) {
  }

  ngOnInit() {
    this.bookSave = new BookSave();

    this.authorService.findAll().subscribe(date => {
      this.authors = date;
    });

    this.genreService.findAll().subscribe(date => {
      this.genres = date;
    });
  }

  onSubmit(): void {
    this.bookService.save(this.bookSave).subscribe(result => this.goToBookList());
  }

  goToBookList() {
    this.router.navigate(['/books']);
  }

  onSelectAuthor(value: number): void {
    this.bookSave.authorId = value;
  }

  onSelectGenre(value : number): void {
    this.bookSave.genreId = value;
  }

}
