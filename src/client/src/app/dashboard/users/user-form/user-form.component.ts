import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {Actions, ofType} from "@ngrx/effects";

import {NzMessageService, UploadFile} from "ng-zorro-antd";
import {UploadService} from "../../../shared/upload.service";

import {combineLatest, merge, Observable, Observer, Subscription} from "rxjs";
import {switchMap, take} from "rxjs/operators";

import * as fromApp from '../../../store/app.reducers';
import * as UsersActions from '../store/users.actions';

import {User} from "../models/user.model";
import {UserGroup} from "../models/user-group.model";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {
  private formInit$: Subscription;
  private createdOrUpdated$: Subscription;
  private usersGroupsList$: Subscription;
  private upload$: Subscription;

  private isFormLoading: boolean;
  private isCreatingUser: boolean;
  private userToEdit: User;
  private usersGroupsList: UserGroup[];
  private usersGroupsListLoading: boolean;
  private userForm: FormGroup;

  private b64AvatarPreview: String;

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
      this.actions$.pipe(ofType(UsersActions.UPDATE_USER)),
      this.actions$.pipe(ofType(UsersActions.ADD_USER)))
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['/dashboard/users'])
      });

    this.formInit$ = combineLatest(
      this.store.select('users'),
      this.route.params)
      .pipe(take(1))
      .subscribe(([usersState, params]) => {
        const user = {
          avatar: '',
          username: '',
          email: '',
          groups: []
        };

        const userId = params['id'];
        this.isFormLoading = false;
        this.isCreatingUser = !userId;

        if (!this.isCreatingUser) {
          this.userToEdit = usersState.list.users.find(u => u._key === userId)
          user.username = this.userToEdit.username;
          user.email = this.userToEdit.email;
          user.groups = this.userToEdit.groups || [];
          user.avatar = this.userToEdit.avatar || '';
          this.usersGroupsList = this.userToEdit.groups || [];
        }

        this.userForm = new FormGroup({
          'avatar': new FormControl(user.avatar),
          'username': new FormControl(user.username, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ]),
          'email': new FormControl(user.email, [
            Validators.required,
            Validators.email
          ]),
          'groups': new FormControl(user.groups.map(g => g._key), [Validators.required])
        });

        if (this.isCreatingUser) {
          this.userForm.addControl('password',
            new FormControl(null, [
              Validators.required,
              Validators.minLength(6)
            ]))
        }

      });

    this.usersGroupsList$ = this.actions$
      .pipe(ofType(UsersActions.SET_USERS_GROUPS))
      .pipe(switchMap(() => this.store.select('users')))
      .subscribe((usersState) => {
        this.usersGroupsList = usersState.groups;
        this.usersGroupsListLoading = false;
      })

    this.updateUsersGroupsList('');
  }


  updateUsersGroupsList(search: string) {
    this.usersGroupsListLoading = true;
    this.store.dispatch(new UsersActions.TryToGetUsersGroups(search))
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPEG or PNG file !');
        observer.complete();
        return;
      }

      const isLt1m = file.size / 1024 / 1024 <= 1;

      if (!isLt1m) {
        this.msg.error('File size is 1MB maximum !');
        observer.complete();
        return;
      }

      observer.next(isJpgOrPng && isLt1m);
      observer.complete();
    })
  };

  handleUploadChange(info: { file: UploadFile }) {
    if (info.file.status === 'uploading') {
      this.getBase64(info.file.originFileObj, (b64) => {
        this.b64AvatarPreview = b64
      })
    }
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result.toString()))
    reader.readAsDataURL(img);
  }

  private dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type: mimeString});
  }

  updateUserAvatar(imageUrl) {
    this.userForm.controls['avatar'].patchValue(imageUrl);
    if (this.b64AvatarPreview) {
      this.b64AvatarPreview = '';
    }
  }

  removeAvatar() {
    this.userForm.controls['avatar'].patchValue('');
  }

  // TODO: DRY by making use of Observables
  onSubmit() {
    if (this.userForm.valid) {
      this.isFormLoading = true;
      const hasToUploadAvatar = this.userForm.value.avatar.includes('base64');
      const hasToDeleteOldAvatar = this.userToEdit && this.userToEdit.avatar;

      if (hasToUploadAvatar || (hasToUploadAvatar && hasToDeleteOldAvatar)) {
        if (hasToDeleteOldAvatar) {
          this.uploadService.deleteFile(this.userToEdit.avatar);
        }

        if (hasToUploadAvatar) {
          const formData: FormData = new FormData();
          const blob = this.dataURItoBlob(this.userForm.value.avatar);

          formData.append("file", blob, '.png');
          this.upload$ = this.uploadService.uploadFile(
            formData,
            (reqStatus) => console.log(reqStatus)
          ).subscribe((reqStatus: any) => {
            this.updateUserAvatar(reqStatus.event.body.filename);
            this.createOrUpdateUser();
          })
        } else {
          this.createOrUpdateUser();
        }
      } else {
        this.createOrUpdateUser();
      }
    }
  }

  createOrUpdateUser() {
    const payload = {
      avatar: this.userForm.value.avatar,
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      groups: this.userForm.value.groups,
      password: '',
    };

    if (this.isCreatingUser) {
      payload.password = this.userForm.value.password;
    } else {
      delete payload.password;
    }

    if (this.isCreatingUser) {
      this.store.dispatch(new UsersActions.TryToCreateUser(payload))
    } else {
      this.store.dispatch(new UsersActions.TryToUpdateUser(this.userToEdit._key, payload))
    }
  }

  ngOnDestroy() {
    if (this.upload$) this.upload$.unsubscribe();
    this.formInit$.unsubscribe();
    this.createdOrUpdated$.unsubscribe();
    this.usersGroupsList$.unsubscribe();
  }


}
