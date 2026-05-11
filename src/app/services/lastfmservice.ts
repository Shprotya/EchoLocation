import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Track } from '../models/track.model';
import { environment } from '../../environments/environment';
import * as countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';

interface LastfmResponse {
  tracks: {
    track: Track[];
  };
}

@Injectable({ providedIn: 'root' })
export class LastfmService {
  private http = inject(HttpClient);
  private apiKey = environment.lastfmApiKey;
  private baseUrl = 'https://ws.audioscrobbler.com/2.0/';

  constructor() {
    countries.registerLocale(en);
  }

  getTopTracks(isoCode: string): Observable<Track[]> {
    const countryName = countries.getName(isoCode, 'en') ?? isoCode;
    const url = `${this.baseUrl}?method=geo.gettoptracks&country=${encodeURIComponent(countryName)}&api_key=${this.apiKey}&format=json&limit=10`;
    return this.http.get<LastfmResponse>(url).pipe(
      map(res => res.tracks.track)
    );
  }
}