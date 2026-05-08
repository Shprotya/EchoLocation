import { Component, input } from '@angular/core';
import { Track } from '../../models/track.model';

@Component({
  selector: 'app-track-item',
  imports: [],
  template: `
    <li class="bg-gray-800 rounded p-3">
      <a [href]="track().url" target="_blank" class="font-medium hover:text-blue-400">
        {{ track().name }}
      </a>
      <p class="text-sm text-gray-400">{{ track().artist.name }}</p>
      <p class="text-xs text-gray-500">{{ track().listeners }} listeners</p>
    </li>
  `
})
export class TrackItem {
  track = input.required<Track>();
}