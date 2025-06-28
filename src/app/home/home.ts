import { SongContentService } from './../service/song-content';
import { Component, effect, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SongCard } from './song-card/song-card';
import { Song } from '../service/song';
import { Toast } from '../service/toast';
import { ReadSong } from '../service/model/song.model';

@Component({
  selector: 'app-home',
  imports: [ FontAwesomeModule, SongCard ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  private songService = inject(Song);
  private toastService = inject(Toast);
  private songContentService = inject(SongContentService);

  allSongs: Array<ReadSong> | undefined;

  isLoading = false;

  constructor() {
    this.isLoading = true;
    effect(() => {
      const allSongsResponse = this.songService.getAllSig();
      if (allSongsResponse.status === "OK") {
        this.allSongs = allSongsResponse.value;
      } else if (allSongsResponse.status === "ERROR") {
        this.toastService.show('An error occured when fetching all songs', "DANGER");
      }
      this.isLoading = false;
    });
  }

  onPlaySong(songToPlayFirst: ReadSong) {
    this.songContentService.createNewQueue(songToPlayFirst, this.allSongs!);
  }
}
