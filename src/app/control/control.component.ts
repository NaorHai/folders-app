import {Component} from '@angular/core';
import {RootService} from '../root.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent {
  json: any;
  parent: any;
  newInp: any;
  downloadJsonHref: any;

  constructor(private service: RootService, private sanitizer: DomSanitizer) {
    this.json = service.rootHierarchy;
  }

  new() {
    this.service.newParent(this.newInp);
  }

  save() {
    this.service.saveNewFolder(this.newInp, this.parent);
  }

  del() {
    this.service.deleteFolder(this.newInp, this.parent);
  }

  generateDownloadJsonUri() {
    var theJSON = JSON.stringify(this.json);
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
  }

  storeState() {
    this.service.saveToLocalStorage();
  }

}
