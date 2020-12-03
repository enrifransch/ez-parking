import * as firebase from 'firebase';
import GeoPoint = firebase.firestore.GeoPoint;
import Timestamp = firebase.firestore.Timestamp;
import * as moment from 'moment';
import Moment = moment.Moment;

export class Nanostore {
  location: GeoPoint;
  delivery?: boolean;
  phone?: string;
  name: string;
  address?: string;
  cardPayments?: boolean;
  isWhatsApp?: boolean;
  id ?: string;
  createdAt?: Date | Moment | Timestamp;
  latitude?: number;
  longitude?: number;
}

export class StoreFirebase {
  location: GeoPoint;
  id ?: number;
  createdAt?: Date | Moment | Timestamp;
  latitude?: number;
  longitude?: number;
  razonSocial?: string;
  scian?: number;
  demand: number;
  name: string;
}

export const nanostoreXLSXColumns = ['delivery', 'phone', 'name', 'address', 'cardPayments', 'isWhatsApp', 'latitude', 'longitude'];

export class NanostoreXLSX {
  delivery: boolean;
  phone: string;
  name: string;
  address: string;
  cardPayments: boolean;
  isWhatsApp: boolean;
  latitude: number;
  longitude: number;

  constructor({delivery, phone, name, address, cardPayments, isWhatsApp, latitude, longitude}) {
    this.delivery = !!delivery;
    this.phone = phone;
    this.name = name;
    this.address = address;
    this.cardPayments = !!cardPayments;
    this.isWhatsApp = !!isWhatsApp;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  xlsxToFirebase(): Nanostore {
    return {
      delivery: this.delivery,
      phone: this.phone,
      name: this.name,
      address: this.address,
      cardPayments: this.cardPayments,
      isWhatsApp: this.isWhatsApp,
      location: new GeoPoint(this.latitude, this.longitude)
    };
  }
}

export interface Store {
  ID: number;
  'Nombre de la Unidad Económica': string;
  'Razón social': string;
  'Código de la clase de actividad SCIAN': number;
  'Nombre de clase de la actividad': string;
  'Demanda': number;
  'Nombre de asentamiento humano': string;
  'Código Postal': number;
  'Latitud': number;
  'Longitud': number;
  'Fecha de incorporación al DENUE': string;
}


// dias de servicio
// horario
// categorias (cerveza, licores, agua, hielo, refrescos, botanas, abarrotes)
// formas de pago (tarjetas, efectivo, vales, transferencias)
// direccion
// nombre
// email
// pagina web
// redes sociales
