import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import { Navigation } from "./layout/navigation/navigation";
import { Library } from "./layout/library/library";
import { Header } from "./layout/header/header";
import { Toast } from './service/toast';
import { NgbModal, NgbModalRef, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { Player } from "./layout/player/player";
import { Auth, AuthPopupState } from './service/auth';
import { AuthPopup } from './layout/auth-popup/auth-popup';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FontAwesomeModule, Navigation, Library, Header, NgbToast, Player],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'spotify-front';

  private faIconLibrary = inject(FaIconLibrary);

  toastService = inject(Toast);

  private authService = inject(Auth);

  private modalService = inject(NgbModal);

  private authModalRef: NgbModalRef | null = null;

  constructor() {
    effect(()=> {
      this.openOrCloseAuthModal(this.authService.authPopupStateChange());
    }, {allowSignalWrites: true});
  }

  ngOnInit(): void {
    this.initFontAwesome();
    this.toastService.show('hello toast', 'DANGER');
  }

  private initFontAwesome() {
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }

  private openOrCloseAuthModal(state: AuthPopupState) {
    if(state === "OPEN") {
      this.openAuthPopup();
    } else if(this.authModalRef !== null && state === "CLOSE"
    && this.modalService.hasOpenModals()) {
      this.authModalRef.close();
    }
  }

  private openAuthPopup() {
    this.authModalRef = this.modalService.open(AuthPopup, {
      ariaDescribedBy: 'authentication-modal',
      centered: true
    });

    this.authModalRef.dismissed.subscribe({
      next: () => {
        this.authService.openOrCloseAuthPopup("CLOSE");
      }
    });

    this.authModalRef.closed.subscribe({
      next: () => {
        this.authService.openOrCloseAuthPopup("CLOSE");
      }
    });
  }

}
