import { Routes } from '@angular/router';
import { AddSong } from './add-song/add-song';
import { Home } from './home/home';
import { Search } from './search/search';
import { Favorite } from './favorite/favorite';

export const routes: Routes = [
  {
    path: "",
    component: Home,
  },
  {
    path: "add-song",
    component: AddSong,
  },
  {
    path: "search",
    component: Search,
  },
  {
    path: "favorites",
    component: Favorite,
  }
];
