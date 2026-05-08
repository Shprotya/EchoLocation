import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';

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

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      console.log(`Clicked: lat=${lat}, lng=${lng}`);
    });
  }

  private loadGeoJson(): void {
    fetch('data/countries.geojson')
      .then(res => res.json())
      .then(data => {
        this.geojsonLayer = L.geoJSON(data, {
          style: {
            color: '#d94a4a',
            weight: 1,
            fillOpacity: 0,
          },
          onEachFeature: (feature, layer) => {
            layer.on('click', () => this.onCountryClick(feature, layer));
          }
        }).addTo(this.map);
      });
  }

  private onCountryClick(feature: GeoJSON.Feature, layer: L.Layer): void {
    // Reset previously selected country
    if (this.selectedLayer) {
      this.geojsonLayer.resetStyle(this.selectedLayer);
    }

    // Highlight clicked country
    (layer as L.Path).setStyle({
      fillOpacity: 0.4,
      fillColor: '#d94a4a',
    });

    this.selectedLayer = layer;

    const countryName = feature.properties?.['name'] ?? 'Unknown';
    console.log('Selected country:', countryName);
  }
}