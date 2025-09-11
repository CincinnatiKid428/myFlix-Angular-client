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
export class DirectorDialogComponent implements OnInit {

  directorData: any = null;
  isLoading: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public directorName: string,
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<DirectorDialogComponent>
  ) { }

  ngOnInit(): void {
    this.getDirector();
  }

  //Function gets director information from API
  getDirector(): void {
    this.fetchApiData.getDirectorByName(this.directorName).subscribe((resp) => {
      this.directorData = resp;
      this.isLoading = false;
      console.log(`* * Director ${this.directorData.Name}:`, this.directorData);
    });
  }

  //Used for cancel button functionality in template
  closeDialog(): void {
    this.dialogRef.close();
  }
}
