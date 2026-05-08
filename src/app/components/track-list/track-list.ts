import { Component } from '@angular/core';
import { TrackItem } from '../track-item/track-item';
import { input } from '@angular/core';
import { Track } from '../../models/track.model';

@Component({
  selector: 'app-track-list',
  imports: [TrackItem],
  template: `
    <ol class="space-y-2">
      @for (track of tracks(); track track.name) {
        <app-track-item [track]="track" />
      }
    </ol>
  `
})
export class TrackList {
  tracks = input.required<Track[]>();
}
