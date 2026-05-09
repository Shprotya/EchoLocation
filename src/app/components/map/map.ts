import { Component, AfterViewInit, OnDestroy, inject, effect } from '@angular/core';
import * as L from 'leaflet';
import { Countryservice } from '../../services/countryservice';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map implements AfterViewInit, OnDestroy {
  private map!: L.Map;
  private geojsonLayer!: L.GeoJSON;
  private selectedLayer: L.Layer | null = null;
  private countryService = inject(Countryservice);

  constructor() {
    effect(() => {
      const query = this.countryService.searchQuery();
      if (query) {
        this.searchCountry(query);
      }
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.loadGeoJson();
  }

  ngOnDestroy(): void {
    this.map.remove();
  }

  private initMap(): void {
    this.map = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private loadGeoJson(): void {
    fetch('data/countries.geojson')
      .then(res => res.json())
      .then(data => {
        this.geojsonLayer = L.geoJSON(data, {
          style: { color: '#4a90d9', weight: 1, fillOpacity: 0 },
          onEachFeature: (feature, layer) => {
            layer.on('click', () => this.onCountryClick(feature, layer));
          }
        }).addTo(this.map);
      });
  }

  private onCountryClick(feature: GeoJSON.Feature, layer: L.Layer): void {
    this.highlightLayer(layer);
    const countryName = feature.properties?.['name'] ?? 'Unknown';
    const isoCode = feature.properties?.['ISO3166-1-Alpha-2'] ?? null;
    this.countryService.selectedCountry.set(countryName);
    this.countryService.selectedCountryCode.set(isoCode);
  }

  private searchCountry(query: string): void {
    if (!this.geojsonLayer) return;

    let found = false;

    this.geojsonLayer.eachLayer(layer => {
      const feature = (layer as L.GeoJSON & { feature: GeoJSON.Feature }).feature;
      const name: string = feature.properties?.['name'] ?? '';
      if (name.toLowerCase() === query.toLowerCase()) {
        found = true;
        this.highlightLayer(layer);
        const isoCode = feature.properties?.['ISO3166-1-Alpha-2'] ?? null;
        this.countryService.selectedCountry.set(name);
        this.countryService.selectedCountryCode.set(isoCode);
        this.countryService.countryNotFound.set(false);
        this.map.flyTo((layer as L.Polygon).getBounds().getCenter(), 4);
      }
    });

    if (!found) {
      this.countryService.countryNotFound.set(true);
    }
  }

  private highlightLayer(layer: L.Layer): void {
    if (this.selectedLayer) {
      this.geojsonLayer.resetStyle(this.selectedLayer);
    }
    (layer as L.Path).setStyle({ fillOpacity: 0.4, fillColor: '#4a90d9' });
    this.selectedLayer = layer;
  }
}