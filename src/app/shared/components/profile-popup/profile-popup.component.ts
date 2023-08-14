import { Component, EventEmitter, OnDestroy, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable, switchMap } from "rxjs";
import { User } from "src/app/core/interfaces/user";
import { AuthService } from "src/app/core/services/auth.service";
import { FileUploadService } from "src/app/core/services/file-upload.service";
import { UserService } from "src/app/core/services/user.service";
import { loginSuccess } from "src/app/store/auth/auth.actions";
import { authUser } from "src/app/store/auth/auth.selectors";

export interface editRequest {
  currentUserId: string;
  file?: File;
  firstName?: string;
  lastName?: string;
  oldPassword?: string;
  newPassword?: string;
}

@Component({
  selector: "app-profile-popup",
  templateUrl: "./profile-popup.component.html",
  styleUrls: ["./profile-popup.component.scss"],
})
export class ProfilePopupComponent implements OnDestroy {
  @Output() popupClose = new EventEmitter();
  authUser$ = this.store.select(authUser);
  authUser?: User;
  authUserSubscription = this.authUser$.subscribe((authUser) => {
    if (authUser) this.authUser = authUser;
  });
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  errorMessage = "";
  isEditMode = false;
  isChanged = false;
  fileInfos?: Observable<unknown>;

  editForm: FormGroup = new FormGroup({
    firstName: new FormControl(this.authUser?.firstName, [Validators.required]),
    lastName: new FormControl(this.authUser?.lastName, [Validators.required]),
    oldPassword: new FormControl(""),
    newPassword: new FormControl(""),
  });

  constructor(
    private uploadService: FileUploadService,
    private userService: UserService,
    private authService: AuthService,
    private store: Store,
  ) {}

  ngOnDestroy(): void {
    this.authUserSubscription.unsubscribe();
  }

  editProfile() {
    const firstName = this.editForm.controls["firstName"].value;
    const lastName = this.editForm.controls["lastName"].value;
    const oldPassword = this.editForm.controls["oldPassword"].value;
    const newPassword = this.editForm.controls["newPassword"].value;

    const file: File | null = this.selectedFiles?.item(0) as File;
    const currentUserId = this.authUser?.email as string;
    const request: editRequest = {
      currentUserId,
      firstName,
      lastName,
      oldPassword,
      newPassword,
    };

    if (file) {
      this.uploadService
        .upload(file, currentUserId)
        ?.pipe(switchMap(() => this.userService.editProfile(request)))
        .subscribe((token) => {
          this.authService.handleAuth(token.token), (this.isEditMode = false);
        });
      return;
    }

    this.userService.editProfile(request).subscribe({
      next: (token) => {
        this.authService.handleAuth(token.token), (this.isEditMode = false);
      },
      error: (err) => this.errorMessage = err.error.text
    });
  }

  selectFile(event: any): void {
    this.isChanged = true;
    this.selectedFiles = event.target.files;
  }

  onClose() {
    this.popupClose.emit();
  }
}