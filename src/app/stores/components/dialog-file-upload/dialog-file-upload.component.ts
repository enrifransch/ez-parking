import {AfterContentChecked, AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import {Nanostore, NanostoreXLSX, nanostoreXLSXColumns} from '../../../shared/models/nanostore';
import {UiService} from '../../../shared/services/ui.service';
import {NanostoreService} from '../../../shared/services/nanostore.service';

@Component({
  selector: 'nano-dialog-file-upload',
  templateUrl: './dialog-file-upload.component.html',
  styleUrls: ['./dialog-file-upload.component.scss']
})
export class DialogFileUploadComponent implements OnInit, AfterViewInit {

  @ViewChild('xlsx') xlsx: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) private data: XLSX.WorkBook,
              public dialogRef: MatDialogRef<DialogFileUploadComponent>,
              private nanostoreService: NanostoreService,
              private uiService: UiService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const html = XLSX.utils.sheet_to_html(this.data.Sheets[this.data.SheetNames[0]])
      .replace('<table', '<table id="data-table" border="1" class="xlsx-table"');

    console.log(html);
    this.xlsx.nativeElement.insertAdjacentHTML('beforeend', html);
  }

  async onAccept() {
    const json = XLSX.utils.sheet_to_json(this.data.Sheets[this.data.SheetNames[0]]);

    if (json.length > 100) {
      // too many rows
      return;
    }

    // comparing xlsx to data model
    Object.keys(json[0]).forEach(k => {
      if (!nanostoreXLSXColumns.includes(k)) {
        console.log(`Column from document doesn't exist in model: ${k}`);
      }
    });

    nanostoreXLSXColumns.forEach(k => {
      if (!Object.keys(json[0]).includes(k)) {
        console.log(`Missing column from model: ${k}`);
      }
    });

    // nanostoreXLSXColumns

    try {
      this.uiService.open();
      const ns: Nanostore[] = json.map((j: any) => new NanostoreXLSX(j).xlsxToFirebase());
      await this.nanostoreService.uploadMultiple(ns);
      this.dialogRef.close();
    } catch (e) {
      console.log(e);
    } finally {
      this.uiService.close();
    }
  }

}
