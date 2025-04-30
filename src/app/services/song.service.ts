import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Song } from '../models/song.model';
import { Mp3FileResponse } from '../models/Mp3FileResponse.model';
import { ErrorResponse } from '../models/ErrorResonse.model';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private baseUrl: string = 'http://localhost:8088/resources';
  private http: HttpClient;

  constructor(http: HttpClient) { 
    this.http = http;
  }
  
  getSongList(): Observable<Song[]>{
    return this.http.get<Song[]>(`${this.baseUrl}`)
    .pipe(
      tap(response => console.log('Response from getSongList:', response))
    );
  }

  getSongById(id: number): Observable<Song>{
    return this.http.get<Song>(`${this.baseUrl}/${id}`);
  }

  uploadSongFile(file: File): Observable<Mp3FileResponse> {
  return new Observable(observer => {
    const reader = new FileReader();

    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const blob = new Blob([arrayBuffer], { type: file.type });

      this.http.post<Mp3FileResponse>(this.baseUrl, blob, {
        headers: {
          'Content-Type': file.type || 'application/octet-stream'
        }
      }).subscribe({
        next: (response) => observer.next(response),
       error: (errorResponse) => {
          const mappedError: ErrorResponse = {
            errorCode: errorResponse.error.errorCode,
            errorMessage: errorResponse.error.errorMessage,
            details: errorResponse.error.details,
          };
          observer.error(mappedError);
        },
        complete: () => observer.complete()
      });
    };

    reader.onerror = (error) => {
      observer.error(error);
    };

    reader.readAsArrayBuffer(file);
  });
}

  
}
