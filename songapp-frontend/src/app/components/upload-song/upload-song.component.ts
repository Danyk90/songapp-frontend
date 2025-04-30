import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongService } from '../../services/song.service';
import { Mp3FileResponse } from '../../models/Mp3FileResponse.model';
import { ErrorResponse } from '../../models/ErrorResonse.model';

@Component({
  selector: 'app-upload-song',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-song.component.html',
  styleUrl: './upload-song.component.scss'
})
export class UploadSongComponent {

  selectedFile: File | null = null;
  uploadSuccess: boolean = false;
  uploadError: string | null = null;

  constructor(private songService: SongService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile(): void {
    
    if(!this.selectedFile){
      this.uploadError = 'Please select a file to upload';
      return;
    }

    this.songService.uploadSongFile(this.selectedFile).subscribe({
      next: (response:Mp3FileResponse) => {
        console.log('Upload successful', response);
        this.uploadSuccess = true;
        this.uploadError = null;
        this.selectedFile = null;
      },
      error: (error: ErrorResponse) => {
        this.uploadSuccess = false;
        this.uploadError = error.errorMessage;
      }
    });
  }
}
