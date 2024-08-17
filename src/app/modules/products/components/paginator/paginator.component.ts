import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input() totalPages: number = 1; // Total number of pages
  @Input() currentPage: number = 1; // Current active page
  @Output() pageChange = new EventEmitter<number>(); // Event emitted when page changes

  // Method to change page
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage); // Emit the new page number
    }
  }

  // Method to go to the previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  // Method to go to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }

  // Method to generate an array for pagination display
  get pages(): any[] {
    const pages = [];
    if (this.totalPages <= 7) {
      // Show all pages if total pages are less than or equal to 7
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Handle complex pagination when there are more than 7 pages
      if (this.currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', this.totalPages);
      } else if (this.currentPage > this.totalPages - 4) {
        pages.push(
          1,
          '...',
          this.totalPages - 4,
          this.totalPages - 3,
          this.totalPages - 2,
          this.totalPages - 1,
          this.totalPages,
        );
      } else {
        pages.push(
          1,
          '...',
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1,
          '...',
          this.totalPages,
        );
      }
    }
    return pages;
  }
}
