import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  headerTemplate!: TemplateRef<any>;

  /**
   * Handles the activation of a component instance.
   *
   * Adding a setTimeout with a delay of 0 ensures that
   * Angular completes its change detection cycle before
   * trying to access the templateToPass from the routed component.
   *
   */
  onActivate(componentInstance: any) {
    setTimeout(() => {
      if (componentInstance.templateToPass) {
        this.headerTemplate = componentInstance.templateToPass;
      }
    }, 0);
  }
}
