import { Component, input } from '@angular/core';
import { ReadSong } from '../../service/model/song.model';

@Component({
  selector: 'app-small-song-card',
  imports: [],
  templateUrl: './small-song-card.html',
  styleUrl: './small-song-card.scss'
})
export class SmallSongCard {

  song = input.required<ReadSong>();

}
