import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Countryservice {
  selectedCountry = signal<string | null>(null);      // display name
  selectedCountryCode = signal<string | null>(null);  // ISO code for API
}