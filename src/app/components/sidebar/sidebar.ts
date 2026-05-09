import { Component, inject, effect, signal } from '@angular/core';
import { Track } from '../../models/track.model';
import { TrackList } from '../track-list/track-list';
import { Countryservice } from '../../services/countryservice';
import { LastfmService } from '../../services/lastfmservice';
import {SearchBar} from '../search-bar/search-bar';

@Component({
  selector: 'app-sidebar',
  imports: [TrackList, SearchBar],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  private countryService = inject(Countryservice);
  private lastfmService = inject(LastfmService);

  selectedCountry = this.countryService.selectedCountry;
  selectedCountryCode = this.countryService.selectedCountryCode;
  tracks = signal<Track[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const code = this.selectedCountryCode();
      if (code) {
        this.fetchTracks(code);
      }
    });
  }

  private fetchTracks(code: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.lastfmService.getTopTracks(code).subscribe({
      next: tracks => {
        this.tracks.set(tracks);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load tracks for this country.');
        this.loading.set(false);
      }
    });
  }
}