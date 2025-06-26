import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import { Navigation } from "./layout/navigation/navigation";
import { Library } from "./layout/library/library";
import { Header } from "./layout/header/header";
import { Toast } from './service/toast';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FontAwesomeModule, Navigation, Library, Header, NgbToast],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'spotify-front';

  private faIconLibrary = inject(FaIconLibrary);

  toastService = inject(Toast)

  ngOnInit(): void {
    this.initFontAwesome();
    this.toastService.show('hello toast', 'DANGER');
  }

  private initFontAwesome() {
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }
}


