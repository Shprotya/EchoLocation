import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Countryservice {
  selectedCountry = signal<string | null>(null);
  selectedCountryCode = signal<string | null>(null);
  searchQuery = signal<string | null>(null);
  countryNotFound = signal(false);
}