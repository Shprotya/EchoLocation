import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <nav class="h-14 bg-gray-900 text-white flex items-center px-4 shrink-0">
    <span class="text-lg font-bold shrink-0">Echo Location</span>
    <span class="flex-1 text-center text-sm tracking-wide text-gray-300 hidden sm:block">Travel the world of music!</span>
    <span class="ml-auto text-2xl shrink-0">♪</span>
  </nav>
`
})
export class Navbar { }