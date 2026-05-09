import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Track } from '../../models/track.model';
import { TrackItem } from '../track-item/track-item';

@Component({
  selector: 'app-track-list',
  imports: [TrackItem],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol>
      @for (track of tracks(); track track.name; let i = $index) {
        <app-track-item [track]="track" [index]="i" />
      }
    </ol>
  `
})
export class TrackList {
  tracks = input.required<Track[]>();
}