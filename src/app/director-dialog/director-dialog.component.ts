//File: src/app/director-dialog/director-dialog.component.ts

import { Component, OnInit, Inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

//Angular Material imports
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

//API service import
import { FetchApiDataService } from '../fetch-api-data.service';

//Logging flag to enable/disable logging in component
const DEBUG_LOG = false;

@Component({
  selector: 'app-director-dialog',
  imports: [
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinner,
    NgIf,
    NgFor,
  ],
  templateUrl: './director-dialog.component.html',
  styleUrl: './director-dialog.component.scss'
})

/**
 * Director information dialog component.
 * @author P. Weaver
 */
export class DirectorDialogComponent implements OnInit {

  directorData: any = null;
  isLoading: boolean = true;

  /**
   * Injects params and `MAT_DIALOG_DATA` into class.
   * @param directorName Name of the director to fetch details about
   * @param fetchApiData API service instance used to call `getDirectorByName()`
   * @param dialogRef `DialogRef` instance used to close director dialog
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public directorName: string,
    private fetchApiData: FetchApiDataService,
    private dialogRef: MatDialogRef<DirectorDialogComponent>
  ) { }

  /**
   * Calls this.getDirector() to prep data for rendering.
   */
  ngOnInit(): void {
    this.getDirector();
  }

  /**
   * Closes dialog modal (cancel button `click` in template).
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Fetches director information via API call.
   */
  getDirector(): void {
    this.fetchApiData.getDirectorByName(this.directorName).subscribe((resp) => {
      this.directorData = resp;
      this.isLoading = false;
      console.log(`* * getDirector(): ${this.directorData.Name}:`, this.directorData);
    });
  }

}
