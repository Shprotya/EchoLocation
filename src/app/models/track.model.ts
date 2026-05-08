export interface Artist {
    name: string;
    url: string;
}

export interface Track {
    name: string;
    duration: string;
    listeners: string;
    url: string;
    artist: Artist;
}