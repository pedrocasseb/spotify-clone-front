import { Component, effect, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SmallSongCard } from '../../shared/small-song-card/small-song-card';
import { Song } from '../../service/song';
import { ReadSong } from '../../service/model/song.model';
import { SongContentService } from '../../service/song-content';

@Component({
  selector: 'app-library',
  imports: [FontAwesomeModule, RouterModule, SmallSongCard],
  templateUrl: './library.html',
  styleUrl: './library.scss'
})
export class Library implements OnInit{

  private songService = inject(Song);
  private songContentService = inject(SongContentService);


  songs: Array<ReadSong> = [];

  isLoading = false;

  constructor() {
    effect(() => {
      if(this.songService.getAllSig().status === "OK") {
        this.songs = this.songService.getAllSig().value!;
      }
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
      this.fetchSongs();
  }

  private fetchSongs() {
    this.songService.getAll();
  }

  onPlaySong(songToPlayFirst: ReadSong): void {
    this.songContentService.createNewQueue(songToPlayFirst, this.songs!);
  }

}
