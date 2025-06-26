import { Routes } from '@angular/router';
import { AddSong } from './add-song/add-song';
import { Home } from './home/home';

export const routes: Routes = [
  {
    path: "",
    component: Home,
  },
  {
    path: "add-song",
    component: AddSong,
  }
];
