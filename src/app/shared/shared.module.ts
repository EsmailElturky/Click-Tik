import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './components/input-text/input-text.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputTextComponent],
  imports: [CommonModule, FormsModule],
  exports: [InputTextComponent],
})
export class SharedModule {}
