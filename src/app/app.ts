import { Component, signal } from '@angular/core';
import { Map } from "./components/map/map";
import { Sidebar } from "./components/sidebar/sidebar";
import { Navbar } from "./components/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [Map, Sidebar, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('EchoLocation');
}
