import {Injectable} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  isMobile;

  constructor(private breakpointObserver: BreakpointObserver) {

    this.breakpointObserver.observe([
      '(max-width: 1000px)'
    ]).subscribe(result => {
      this.isMobile = result.matches;

      if (this.isMobile) {
        // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
        const vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
    });
  }
}
