import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-navigation',
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class Navigation {

}
