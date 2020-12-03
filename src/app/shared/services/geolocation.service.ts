import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {GeocoderResult} from '@agm/core';

const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private http: HttpClient) {
  }

  getPositionByCoods(lat, lng): Observable<GeocoderResult> {
    return this.http.get<GeocoderResult | any>(`${url}${lat},${lng}&key=${environment.apiKey}`);
  }
}
