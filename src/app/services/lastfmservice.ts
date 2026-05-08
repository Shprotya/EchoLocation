import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Track } from '../models/track.model';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class LastfmService {
  private http = inject(HttpClient);
  private apiKey = environment.lastfmApiKey;
  private baseUrl = 'https://ws.audioscrobbler.com/2.0/';

  getTopTracks(country: string): Observable<Track[]> {
    const url = `${this.baseUrl}?method=geo.gettoptracks&country=${country}&api_key=${this.apiKey}&format=json&limit=10`;
    return this.http.get<any>(url).pipe(
      map(res => res.tracks.track as Track[])
    );
  }
}
