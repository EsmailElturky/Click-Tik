import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /* Get Specific Local Storage Item */
  getLocal(key: string): any {
    const sakinaKey = 'click-tik-' + key;
    const data = window.localStorage.getItem(sakinaKey);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  /* Save Specific Local Storage Item */
  setLocal(key: string, value: any): void {
    const sakinaKey = 'click-tik-' + key;
    const data = value === undefined ? '' : JSON.stringify(value);
    window.localStorage.setItem(sakinaKey, data);
  }

  /* Remove Specific Local Storage Item */
  removeLocal(key: string): void {
    const sakinaKey = 'click-tik-' + key;
    window.localStorage.removeItem(sakinaKey);
  }

  /* Remove All Locals*/
  removeAllLocals(): void {
    for (const key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
        window.localStorage.removeItem(key);
      }
    }
  }
}
