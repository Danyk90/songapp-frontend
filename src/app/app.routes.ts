import { RouterModule, Routes } from '@angular/router';
import { SongListComponent } from './components/song-list/song-list.component';
import { UploadSongComponent } from './components/upload-song/upload-song.component';
import { SongDetailComponent } from './components/song-detail/song-detail.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [

    {path: 'songs', component: SongListComponent},
    {path: 'upload', component: UploadSongComponent},
    {path: 'songs/:id', component: SongDetailComponent},
    {path: '', redirectTo: '/songs', pathMatch: 'full'}

    ];  

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
