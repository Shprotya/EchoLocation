import { Component, input } from '@angular/core';
import { Track } from '../../models/track.model';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-track-item',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li class="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
      <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-medium shrink-0">
        {{ index() + 1 }}
      </span>
      <div class="flex-1 min-w-0">
        <a [href]="track().url" target="_blank" class="text-sm font-medium text-gray-800 hover:text-blue-600 truncate block">
          {{ track().name }}
        </a>
        <p class="text-xs text-gray-500 truncate">{{ track().artist.name }}</p>
      </div>
    </li>
  `
})
export class TrackItem {
  track = input.required<Track>();
  index = input.required<number>();
}