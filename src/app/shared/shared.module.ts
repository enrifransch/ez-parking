import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material.module';
import {DialogLoadingComponent} from './components/dialog-loading/dialog-loading.component';
import {ShortenPipe} from './pipes/shorten.pipe';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [DialogLoadingComponent, ShortenPipe],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [MaterialModule, ShortenPipe]
})
export class SharedModule {
}
