import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from './models/user.model';
import { GithubService } from './services/github.service';
import { filter, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  findControl = new FormControl();
  error: boolean = false;
  user: User = null;

  constructor(private githubService: GithubService) { }

  ngOnInit() {
    this.findControl.valueChanges
      .pipe(
        filter(value => value.length > 2),
        debounceTime(0),
        switchMap(value =>
          this.githubService.getUser(value)
            .pipe(
              catchError(err => {
                this.user = null;
                this.error = true;
                return EMPTY;
              })
            )
        )
      )
      .subscribe(user => {
        this.user = user;
        this.error = false;
      });
  }

}
