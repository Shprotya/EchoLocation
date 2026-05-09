import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Countryservice } from '../../services/countryservice';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {
  private countryService = inject(Countryservice);
  query = signal('');
  notFound = signal(false);

  onSearch(): void {
    const name = this.query().trim();
    if (!name) {
      this.notFound.set(true);
      return;
    }
    this.notFound.set(false);
    this.countryService.searchQuery.set(name);
  }
}