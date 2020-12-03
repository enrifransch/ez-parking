import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NanostoreService} from '../../../shared/services/nanostore.service';
import {Nanostore} from '../../../shared/models/nanostore';
import {map} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import * as XLSX from 'xlsx';
import {MatDialog} from '@angular/material/dialog';
import {DialogFileUploadComponent} from '../../components/dialog-file-upload/dialog-file-upload.component';
import {DialogHelpUploadComponent} from '../../components/dialog-help-upload/dialog-help-upload.component';
import {DeviceService} from '../../../shared/services/device.service';

@Component({
  selector: 'nano-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

  @ViewChild('table') table: MatTable<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('csv') csv: ElementRef<HTMLInputElement>;
  isMobile;


  displayedColumns = ['id', 'name', 'phone', 'address', 'cardPayments', 'delivery', 'latitude', 'longitude', 'isWhatsApp'];
  displayedColumnsNames = ['id', 'Nombre', 'Telefono', 'Direccion', 'Pagos tarjeta', 'Entrega', 'Latitud', 'Longitud', 'Whatsapp'];
  pageInfo = 25;
  data: Nanostore[] = [];
  dataSource;
  selection = new SelectionModel<any>(true, []);

  constructor(private nanostoreService: NanostoreService,
              private deviceService: DeviceService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.nanostoreService.getAllNanostores()
      .pipe(
        map((ns: Nanostore[]) =>
          ns.map(n => {
            n.latitude = n.location.latitude;
            n.longitude = n.location.longitude;
            return n;
          })
        )
      ).subscribe(ns => {
      this.data = ns;
      this.updateDataSource();
    });
    this.isMobile = this.deviceService.isMobile
  }

  updateDataSource() {
    this.selection.clear();
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onCsv(files: FileList) {
    if (files[0]) {
      const r = new FileReader();

      r.onload = e => {
        this.parseCsv(e.target.result);
        this.csv.nativeElement.value = '';
      };

      r.readAsArrayBuffer(files[0]);
    }
  }

  private parseCsv(result: any) {
    const data = new Uint8Array(result);
    const wb = XLSX.read(data, {type: 'array'});

    this.dialog.open(DialogFileUploadComponent, {
      data: wb
    });
  }

  onHelp() {
    this.dialog.open(DialogHelpUploadComponent);
  }
}
