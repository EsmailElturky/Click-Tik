import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent implements OnInit, ControlValueAccessor {
  @Input() formControl: FormControl;
  @Input() type = 'text';
  @Input() label: string;
  @Input() placeholder = '';
  @Input() errorMessages: {};
  @Input() labelCustomClass: string;
  @Input() inputCustomClass: string;

  formControlName: string;
  value: string;
  disabled: boolean;
  onChange: (event) => void;
  onTouched: (event) => void;

  constructor() {}

  ngOnInit(): void {
    if (this.formControl) {
      this.formControlName = this.getFormControlName(this.formControl);
    }
  }

  /* Get Form Control Name From Form Group */
  getFormControlName(c: FormControl): string | null {
    const formGroup = c.parent!.controls;
    return Object.keys(formGroup).find((name) => c === formGroup[name]) || null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value): void {
    this.value = value;
  }

  /* Set Input Disable State */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /* Detect Input Value Changes */
  detectValueChange(target): void {
    let value = target.value;
    if (value) {
      this.onChange(value);
    } else {
      this.onChange('');
    }
  }
}
