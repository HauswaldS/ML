import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import * as Croppie from 'croppie';
import {CroppieOptions, ResultOptions} from 'croppie';

@Component({
  selector: 'ng-croppie',
  templateUrl: './croppie.component.html',
  styleUrls: ['./croppie.component.scss']
})
export class CroppieComponent implements OnInit {
  @ViewChild('imageToEdit') imageToEdit: ElementRef;
  @Input('imageUrl') imageUrl: string;
  @Input('croppieOptions') croppieOptions: CroppieOptions;
  @Input('outputFormatOptions') outputFormatOptions: ResultOptions = {type: 'base64', size: 'viewport'};
  @Output('imageCropped') imageCropped = new EventEmitter<any>();

  private _croppie: Croppie;

  constructor() {
  }

  ngOnInit() {
    this._croppie = new Croppie['Croppie'](this.imageToEdit.nativeElement, this.croppieOptions);
    this._croppie.bind({url: this.imageUrl})
  }


  cropImage() {
    this._croppie.result(this.outputFormatOptions)
      .then(res => this.imageCropped.emit(res))
  }

}
