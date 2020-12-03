import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {DeviceService} from '../../shared/services/device.service';

@Component({
  selector: 'nano-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  events: string[] = [];
  opened = true;
  routes = [
    {name: '/home', icon: 'map', label: 'Mapa'},
    {name: '/stores', icon: 'store', label: 'Tiendas'}
  ];

  constructor(private deviceService: DeviceService) {
  }

  ngOnInit(): void {
    if (this.deviceService.isMobile) {
      this.opened = false;
    }
  }
}
