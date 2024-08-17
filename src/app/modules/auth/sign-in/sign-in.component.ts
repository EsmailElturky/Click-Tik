import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { ToasterService } from '../../../shared/services/toaster/toaster.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit, AfterViewInit, OnDestroy {
  // A reference to the header template.
  @ViewChild('headerTemplate') headerTemplate!: TemplateRef<any>;
  templateToPass!: TemplateRef<any>;

  loginForm: FormGroup;
  userSubscription: Subscription;
  errorMessages = {
    username: {
      required: ' the email is required',
    },
    password: {
      required: ' the password is required',
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toaster: ToasterService,
    private localStorage: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.userDetails$.subscribe((value) => {
      if (value) {
        this.router.navigate(['/products']);
      }
    });
    this.initSignInForm();
  }

  ngAfterViewInit() {
    this.templateToPass = this.headerTemplate;
  }

  // Initialize Sign In Form
  initSignInForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const body = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.authService.signIn(body).subscribe(
      (response) => {
        this.handleResponse(response);
      },
      (error) => {
        this.toaster.showError('Login Failed');
      },
    );
  }

  /* Handle Sign In Success */
  handleResponse(response) {
    this.localStorage.setLocal('userToken', response.token);
    this.handelNavigation();
  }

  //handel navigation
  handelNavigation(): void {
    this.router.navigate(['/products']);
  }

  /* Clear Subscriptions */
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
  // Return Form Control
  formControlData(formControl: string): FormControl {
    return this.loginForm.get(formControl) as FormControl;
  }
}
