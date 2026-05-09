import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="h-14 bg-gray-900 text-white flex items-center px-6 shrink-0">
      <span class="text-lg font-bold w-48">Echo Location</span>
      <span class="flex-1 text-center text-sm tracking-wide text-gray-300">Travel the world of music!</span>
      <span class="w-48 flex justify-end text-2xl">♪</span>
    </nav>
  `
})
export class Navbar { }