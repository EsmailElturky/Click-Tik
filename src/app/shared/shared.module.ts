import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './components/input-text/input-text.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { ToasterComponent } from './components/toaster/toaster.component';

@NgModule({
  declarations: [InputTextComponent, LoaderComponent, ToasterComponent],
  imports: [CommonModule, FormsModule],
  exports: [InputTextComponent, LoaderComponent, ToasterComponent],
})
export class SharedModule {}
