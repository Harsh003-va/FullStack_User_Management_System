import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',

  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  urlName = '';
  userId: String = '';

  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    // this.urlName = this.activatedRoute.snapshot.params['name'];
    // this.userId = this.activatedRoute.snapshot.params['id'];

    this.activatedRoute.params.subscribe((param) => {
      this.urlName = param['name'];
    });

    this.activatedRoute.queryParams.subscribe((param) => {
      this.userId = param['id'];
    });
  }
}
