import {Injectable, Renderer2, RendererFactory2} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private renderer: Renderer2;
  private requestsNumber = 0;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  /**
   * Increments the number of active requests and shows the loader.
   * Adds the 'show' class to the element with the class 'loader-wrapper'.
   */
  startLoader(): void {
    this.requestsNumber++;
    this.renderer.addClass(document.querySelector('.loader-wrapper'), 'show');
  }

  /**
   * Decrements the number of active requests and hides the loader if no active requests remain.
   * Removes the 'show' class from the element with the class 'loader-wrapper' when there are no active requests.
   */
  stopLoader(): void {
    this.requestsNumber--;
    if (this.requestsNumber <= 0) {
      this.requestsNumber = 0;
      this.renderer.removeClass(document.querySelector('.loader-wrapper'), 'show');
    }
  }
}
