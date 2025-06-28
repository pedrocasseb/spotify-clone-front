import { Component, effect, inject, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReadSong } from '../../service/model/song.model';
import { Auth } from '../../service/auth';
import { Song } from '../../service/song';

@Component({
  selector: 'app-favorite-song-btn',
  imports: [ FontAwesomeModule],
  templateUrl: './favorite-song-btn.html',
  styleUrl: './favorite-song-btn.scss'
})
export class FavoriteSongBtn {

  song = input.required<ReadSong>();

  authService = inject(Auth);
  songService = inject(Song);

  constructor() {
    effect(() => {
      let favoriteSongState = this.songService.addOrRemoveFavoriteSongSig();
      if(favoriteSongState.status === "OK" && favoriteSongState.value
        && this.song().publicId === favoriteSongState.value.publicId) {
        this.song().favorite = favoriteSongState.value.favorite;
      }
    });
  }

  onFavorite(song: ReadSong) {
    this.songService.addOrRemoveAsFavorite(!song.favorite, song.publicId!);
  }

}
