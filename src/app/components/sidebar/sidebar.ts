import { Component, inject, effect } from '@angular/core';
import { Track } from '../../models/track.model';
import { TrackList } from '../track-list/track-list';
import { Countryservice } from '../../services/countryservice';
import { LastfmService } from '../../services/lastfmservice';

@Component({
  selector: 'app-sidebar',
  imports: [TrackList],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  private countryService = inject(Countryservice);
  private lastfmService = inject(LastfmService);

  selectedCountry = this.countryService.selectedCountry;
  tracks: Track[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    effect(() => {
      const country = this.selectedCountry();
      if (country) {
        this.fetchTracks(country);
      }
    });
  }

  private fetchTracks(country: string): void {
    this.loading = true;
    this.error = null;
    this.lastfmService.getTopTracks(country).subscribe({
      next: tracks => {
        this.tracks = tracks;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load tracks for this country.';
        this.loading = false;
      }
    });
  }
}