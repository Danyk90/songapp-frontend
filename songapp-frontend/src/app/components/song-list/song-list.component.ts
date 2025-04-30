import { Component } from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss'
})
export class SongListComponent {

  songs: Song[] = [];

  constructor(private songService: SongService) {}

  ngOnInit(): void {
   
    this.songService.getSongList().subscribe((songs) => {
      console.log('-----------------------------------Fetched songs:', songs);
      this.songs = songs;
    });
    
  }

  playSong(song: Song): void {
    // Convert base64 to blob and create audio URL
    const binaryData = atob(song.data);
    const array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      array[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([array], { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(blob);
    
    // Create and play audio
    const audio = new Audio(audioUrl);
    audio.play();
  }

  formatDuration(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
