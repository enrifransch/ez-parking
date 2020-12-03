import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nano-dialog-loading',
  template: `
    <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
      <h4>Calculando el parquímetro más óptimo</h4>
      <mat-spinner class="m-5"></mat-spinner>
    </div>
  `
})
export class DialogLoadingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
