import { Component, OnInit } from '@angular/core';
import { ModuleDataService } from '../services/moduledata.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  map: L.Map | null = null;
  modules: any;
  newModules: any;

  constructor(private moduledataservice: ModuleDataService) {}

  getModuleData() {
    this.moduledataservice.getData().subscribe((result) => {
      this.modules = result;
      console.log(result);
      this.newModules = this.modules.modules;

      if (!this.map) {
        this.map = L.map('map', {
          center: [53.338545, -6.26607],
          zoom: 15,
          renderer: L.canvas()
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.opensstreetmap.org/copyright">openStreetMap</a>'
        }).addTo(this.map);

        const markers = [];

        for (const module of this.newModules) {
          const name = module.moduleName;
          const lat = module.lat;
          const long = module.long;
          const room = module.room;
          const location = module.location;
          const icons = L.icon({
            iconUrl: 'assets/marker-icon-2x.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
          });

          console.log(`Module ${module.moduleNo} coordinates: ${lat}, ${long}`);

          const marker = L.marker([lat, long], { icon: icons }).addTo(this.map);
          markers.push(marker);

          const popupContent = `
            <b>Module:</b> ${name}<br>
            <b>Location:</b> ${location}<br>
            <b>Room:</b> ${room}<br>
            <b>Coordinates:</b> ${lat}, ${long}
          `;
          const popup = L.popup().setContent(popupContent);
          marker.bindPopup(popup);
        }

        const group: any = L.featureGroup(markers) as L.FeatureGroup;
        this.map.fitBounds(group.getBounds());
      }
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.getModuleData();
  }
}