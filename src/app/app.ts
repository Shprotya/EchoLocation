import { Component, signal } from '@angular/core';
import { Map } from "./components/map/map";
import { Sidebar } from "./components/sidebar/sidebar";

@Component({
  selector: 'app-root',
  imports: [Map, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('EchoLocation');
}
