import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private toasterSubject = new Subject<string>(); // Subject to manage toaster messages
  toasterState = this.toasterSubject.asObservable(); // Observable to expose the toaster state

  /**
   * Call this method to display an error message in the toaster
   * @param message The error message to display
   */
  showError(message: string) {
    this.toasterSubject.next(message); // Emit the message to subscribers
  }
}
