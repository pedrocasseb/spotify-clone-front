import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-library',
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './library.html',
  styleUrl: './library.scss'
})
export class Library{

}
