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
export class Home implements OnInit{

  private songService = inject(Song);
  private toastService = inject(Toast);

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

  ngOnInit(): void {
    this.songService.getAll();
  }

}
