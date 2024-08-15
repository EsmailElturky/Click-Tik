import {
  AfterViewInit,
  Component,
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

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit, AfterViewInit {
  // A reference to the header template.
  @ViewChild('headerTemplate') headerTemplate!: TemplateRef<any>;
  templateToPass!: TemplateRef<any>;

  loginForm: FormGroup;
  errorMessages = {
    email: {
      required: ' the email is required',
      email: ' the email is invalid',
    },
    password: {
      required: ' the password is required',
      minlength: ' the password must be at least 6 characters',
    },
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initSignInForm();
  }

  ngAfterViewInit() {
    this.templateToPass = this.headerTemplate;
  }

  // Initialize Sign In Form
  initSignInForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  login() {}

  // Return Form Control
  formControlData(formControl: string): FormControl {
    return this.loginForm.get(formControl) as FormControl;
  }
}
