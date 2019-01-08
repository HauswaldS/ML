import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {combineLatest, merge, Observable, Observer, Subscription} from "rxjs";
import {take} from "rxjs/operators";
import {Actions, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService, UploadFile} from "ng-zorro-antd";

import * as fromApp from "../../../store/app.reducers";
import * as DatasetsActions from "../store/datasets.actions";

import {Dataset} from "../models/dataset.model";

import {UploadService} from "../../../shared/upload.service";

@Component({
  selector: 'app-dataset-form',
  templateUrl: './dataset-form.component.html',
  styleUrls: ['./dataset-form.component.scss']
})
export class DatasetFormComponent implements OnInit, OnDestroy {
  private formInit$: Subscription;
  private createdOrUpdated$: Subscription;
  private upload$: Subscription;


  private isFormLoading: boolean;
  private isFileLoading: boolean;
  private isCreatingDataset: boolean;
  private datasetToEdit: Dataset;
  private datasetForm: FormGroup;

  private fileToUpload: File;

  constructor(
    private uploadService: UploadService,
    private msg: NzMessageService,
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.createdOrUpdated$ = merge(
      this.actions$.pipe(ofType(DatasetsActions.UPDATE_DATASET)),
      this.actions$.pipe(ofType(DatasetsActions.ADD_DATASET)))
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['/dashboard/datasets'])
      });


    this.formInit$ = combineLatest(
      this.store.select('datasets'),
      this.route.params)
      .pipe(take(1))
      .subscribe(([datasetsState, params]) => {
        const dataset = {
          filename: '',
          title: ''
        };

        const datasetId = params['id'];
        this.isFormLoading = false;
        this.isCreatingDataset = !datasetId;

        if (!this.isCreatingDataset) {
          this.datasetToEdit = datasetsState.list.datasets.find(u => u._key === datasetId);
          dataset.filename = this.datasetToEdit.filename;
          dataset.title = this.datasetToEdit.title;
        }

        this.datasetForm = new FormGroup({
          'filename': new FormControl(dataset.filename, [Validators.required]),
          'title': new FormControl(dataset.title, [Validators.required])
        });
      });
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isCsv = file.name.includes('.csv');
      if (!isCsv) {
        this.msg.error('You can only upload a CSV file !');
        observer.complete();
        return;
      }

      const isLt1m = file.size / 1024 / 1024 <= 10000;

      if (!isLt1m) {
        this.msg.error('File size is 10G maximum !');
        observer.complete();
        return;
      }

      observer.next(isCsv && isLt1m);
      observer.complete();
    })
  };

  handleUploadChange(info: { file: UploadFile }) {
    if (info.file.status === 'uploading') {
      this.isFileLoading = true;
    }

    if (info.file.status === 'error') {
      this.isFileLoading = false;
      this.datasetForm.controls['filename'].patchValue(info.file.name);
      this.fileToUpload = info.file.originFileObj;
    }
  }

  removeFile() {
    this.datasetForm.controls['filename'].patchValue('');
    this.fileToUpload = null;
  }

  onSubmit() {
    if (this.datasetForm.valid) {
      this.isFormLoading = true;
      const hasToUploadFile = this.datasetForm.value.filename;
      const hasToDeleteOldFile = this.datasetToEdit && this.datasetToEdit.filename !== this.datasetForm.value.filename;
      const payload = {
        filename: this.datasetForm.value.filename,
        title: this.datasetForm.value.title
      }

      if (hasToDeleteOldFile) {
        this.uploadService.deleteFile(this.datasetToEdit.filename);
      }

      if (hasToUploadFile) {
        const formData: FormData = new FormData();
        formData.append("file", this.fileToUpload, '.csv');
        this.upload$ = this.uploadService.uploadFile(
          formData,
          (reqStatus) => console.log(reqStatus)
        ).subscribe((reqStatus: any) => {
          payload.filename = reqStatus.event.body.filename;
          this.createOrUpdateDataset(payload);
        })
      } else {
        // this.createOrUpdateDataset(payload);
      }
    }
  }


  createOrUpdateDataset(payload) {
    if (this.isCreatingDataset) {
      this.store.dispatch(new DatasetsActions.TryToCreateDataset(payload))
    } else {
      this.store.dispatch(new DatasetsActions.TryToUpdateDataset(this.datasetToEdit._key, payload))
    }
  }

  ngOnDestroy() {
    this.createdOrUpdated$.unsubscribe();
    this.formInit$.unsubscribe();
  }

}
