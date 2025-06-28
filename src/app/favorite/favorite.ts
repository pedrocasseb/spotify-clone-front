import { Component, effect, inject, OnInit } from '@angular/core';
import { FavoriteSongBtn } from '../shared/favorite-song-btn/favorite-song-btn';
import { SmallSongCard } from '../shared/small-song-card/small-song-card';
import { ReadSong } from '../service/model/song.model';
import { Song } from '../service/song';
import { SongContentService } from '../service/song-content';

@Component({
  selector: 'app-favorite',
  imports: [ FavoriteSongBtn, SmallSongCard ],
  templateUrl: './favorite.html',
  styleUrl: './favorite.scss'
})
export class Favorite implements OnInit{

  favoriteSongs: Array<ReadSong> = [];

  songService = inject(Song);

  songContentService = inject(SongContentService);

  constructor() {
    effect(() => {
      let addOrRemoveFavoriteSongSig = this.songService.addOrRemoveFavoriteSongSig();
      if(addOrRemoveFavoriteSongSig.status === "OK") {
        this.songService.fetchFavorite();
      }
    });

    effect(() => {
      let favoriteSongState = this.songService.fetchFavoriteSongSig();
      if(favoriteSongState.status === "OK") {
        favoriteSongState.value?.forEach(song => song.favorite = true)
        this.favoriteSongs = favoriteSongState.value!;
      }
    });
  }

  ngOnInit(): void {
    this.songService.fetchFavorite();
  }

  onPlay(firstSong: ReadSong) {
    this.songContentService.createNewQueue(firstSong, this.favoriteSongs);
  }


}
