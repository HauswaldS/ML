import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ArrayOfObjectsToStringPipe} from "./array-of-objects-to-string.pipe";
import {FormatFileUrlPipe} from "./format-file-url.pipe";
import {FormatFileSizePipe} from "./format-file-size.pipe";
import {FormatNumberPipe} from "./format-number.pipe";

@NgModule({
  declarations: [
    ArrayOfObjectsToStringPipe,
    FormatFileUrlPipe,
    FormatFileSizePipe,
    FormatNumberPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ArrayOfObjectsToStringPipe,
    FormatFileUrlPipe,
    FormatFileSizePipe,
    FormatNumberPipe,
  ]
})

export class PipesModule {
}
