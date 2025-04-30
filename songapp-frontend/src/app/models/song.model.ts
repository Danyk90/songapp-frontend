export interface Song {
    id: number;
    title: string;
    artist: string;
    name: string;
    album: string;
    duration: number;
    year: number;
    data: string; // This will receive base64 encoded binary data from backend
}
