import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {AgmInfoWindow, AgmMap} from '@agm/core';
import {MatDialog} from '@angular/material/dialog';
import {MouseEvent} from '@agm/core/map-types';
import {GeolocationService} from '../../../shared/services/geolocation.service';
import {NanostoreService} from '../../../shared/services/nanostore.service';
import {Nanostore, StoreFirebase} from '../../../shared/models/nanostore';
import {UiService} from '../../../shared/services/ui.service';
import {DeviceService} from '../../../shared/services/device.service';
import {upDownAnimation} from '../../../shared/animations/animations';
import {stores} from '../../../stores';
import * as firebase from 'firebase';
import GeoPoint = firebase.firestore.GeoPoint;

declare let google: any;

@Component({
  selector: 'nano-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [upDownAnimation]
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('map') map: AgmMap;
  @ViewChildren('infoWindow') infoWindow: QueryList<AgmInfoWindow>;
  @ViewChild('searchAddress') searchAddress: ElementRef;

  isAdding = false;
  lat = 19.4323415;
  lng = -99.1443606;
  zoom = 15;
  existingMarkers = [];
  nanostore: Nanostore | any = {};
  nanostores: Nanostore[] = [];
  searchAddressValue = '';
  isMobile;
  isDisplayStores = false;
  icon = {
    url: '../../../../assets/img/png/parking.png',
    scaledSize: {
      width: 33,
      height: 50
    }
  };
  public origin: any;
  public destination: any;

  isNavigate = false;

  ezparking: Nanostore = {
    location: new GeoPoint(19.42971215, -99.14433342),
    latitude: 19.42971215,
    longitude: -99.14433342,
    name: 'EZ-PArking',
  };

  constructor(private dialog: MatDialog,
              private uiDialog: UiService,
              private deviceService: DeviceService,
              private nanostoreService: NanostoreService,
              private geolocationService: GeolocationService) {
  }

  async ngOnInit() {
    this.isMobile = this.deviceService.isMobile;
    this.nanostoreService.getAllNanostores().subscribe((ns: Nanostore[] | any) => {
      this.nanostores = ns;
      this.existingMarkers = [];
    });

    const promiseArr = [];

    // for (const store of stores) {
    //   const nano: StoreFirebase = {
    //     location: new GeoPoint(store.Latitud, store.Longitud),
    //     id: store.ID,
    //     latitude: store.Latitud,
    //     longitude: store.Longitud,
    //     razonSocial: store['Razón social'],
    //     scian: store['Código de la clase de actividad SCIAN'],
    //     demand: store.Demanda,
    //     name: store['Nombre de la Unidad Económica'],
    //   };
    //   promiseArr.push(this.nanostoreService.addStoreFirebase(nano));
    // }
    //
    // console.log('comanzando', promiseArr)
    //
    // await Promise.all(promiseArr);
    //
    // console.log('whola')

  }

  ngAfterViewInit() {

  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.searchAddress.nativeElement);

    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.setCoords(
        place.geometry.location.lat().toPrecision(15) + (0.0000000000100 * Math.random()),
        place.geometry.location.lng().toPrecision(15) + (0.0000000000100 * Math.random()),
        17
      );
    });
  }

  setCoords(lat, lng, zoom?) {
    this.lat = parseFloat(lat);
    this.lng = parseFloat(lng);
    // @ts-ignore
    this.map._setCenter();
    this.zoom = zoom;
  }

  centerChange(e) {
    // console.log(e);
  }

  onAdd() {
    this.isAdding = !this.isAdding;
    if (!this.isAdding) {
      this.onReset();
    }
  }

  async mapClick(e: MouseEvent) {
    if (this.isAdding) {
      if (!this.deviceService.isMobile) {
        this.setCoords(e.coords.lat, e.coords.lng + 0.002, 16);
      }
      else {
        this.setCoords(e.coords.lat - 0.002, e.coords.lng, 16);
      }
      this.nanostore.location = {latitude: e.coords.lat, longitude: e.coords.lng};
      const location: any = await this.geolocationService.getPositionByCoods(this.lat, this.lng).toPromise();
      this.nanostore.address = location.results[0].formatted_address;
    }
    else {
      this.onReset();
    }
  }

  mapReady(e: any) {
    this.getPlaceAutocomplete();
  }

  onCancelCreateMenu() {
    this.onReset();
    this.isAdding = false;
  }

  onReset() {
    this.nanostore = {};
  }

  async onAddMenuCreate() {
    try {
      await this.nanostoreService.addNanostore(this.nanostore);
      this.onReset();
      this.isAdding = false;
    } catch (e) {
      console.log(e);
    }
  }

  closeAllInfoWindows() {
    const pa = [];
    this.infoWindow.forEach(w => pa.push(w.close()));
    return Promise.all(pa);
  }

  async onGoToNanostore(n: Nanostore) {
    await this.markerClick(n);
    const infoWindow = this.infoWindow.find((w: any) => w._el.nativeElement.id === n.id);
    await infoWindow.open();
  }

  onWhatsappClick(n: Nanostore) {
    window.open(`https://api.whatsapp.com/send?phone=+52${n.phone}`,
      '_blank');
  }

  async markerClick(n: Nanostore) {
    this.setCoords(n.location.latitude, n.location.longitude, 15);
    this.isAdding = false;
    await this.closeAllInfoWindows();
  }

  getCurrentLocation() {
    this.uiDialog.open();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setCoords(position.coords.latitude, position.coords.longitude, 17);
        this.uiDialog.close();
      }, err => {
        console.log(err);
        this.uiDialog.close();
      });
    }
    else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  displayStoresMobile() {
    this.isDisplayStores = !this.isDisplayStores;
  }

  onNavigate() {
    if (!this.isNavigate) {
      this.uiDialog.open();
      setTimeout(() => {
        this.uiDialog.close();
        this.nanostores = [this.ezparking];
        this.isNavigate = true;
      }, 2000);
    }
    else {
      this.onDirections();
    }
  }

  onDirections() {
    this.origin = {lat: 19.416461, lng: -99.1480651};
    this.destination = {lat: this.ezparking.latitude, lng: this.ezparking.longitude};
    this.zoom = 14;
  }

  onMap() {
    window.open('https://www.google.com/maps/dir/2%E1%B5%83+Calle+de+Ernesto+Pugibet+30,+Colonia+Centro,+Centro,+Cuauht%C3%A9moc,+06000+Ciudad+de+M%C3%A9xico,+CDMX/19.4216553,-99.1471722/@19.4263941,-99.147837,16.49z/data=!4m9!4m8!1m5!1m1!1s0x85d1fed59e82d127:0xab72aa4ae12e3aa8!2m2!1d-99.1452233!2d19.4297961!1m0!3e0', '_blank')
  }
}
