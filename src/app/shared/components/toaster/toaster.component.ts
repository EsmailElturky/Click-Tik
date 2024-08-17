import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../../services/toaster/toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
})
export class ToasterComponent implements OnInit {
  message: string = 'failed to get data';
  show = false;

  constructor(private toasterService: ToasterService) {}

  ngOnInit(): void {
    // Subscribe to the toaster service to listen for error messages
    this.toasterService.toasterState.subscribe((message) => {
      this.message = message; // Update the message
      this.show = true; // Show the toaster
      setTimeout(() => {
        this.show = false; // Hide the toaster after 3 seconds
      }, 3000);
    });
  }
}
