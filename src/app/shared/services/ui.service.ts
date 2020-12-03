import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogLoadingComponent} from '../components/dialog-loading/dialog-loading.component';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private _loading = null;

  constructor(private dialog: MatDialog) {
  }

  open() {
    if (!this._loading) {
      this._loading = this.dialog.open(DialogLoadingComponent, {
        disableClose: true,
        panelClass: 'opaque',
      });
    }
  }

  close() {
    if (this._loading) this._loading.close();
    this._loading = null;
  }
}
