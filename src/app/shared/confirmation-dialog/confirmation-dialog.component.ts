//File: src/app/shared/confirmation-dialog/confirmation-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
/**
 * Custom confirmation dialog with Confirm / Cancel buttons.
 * @author ChatGPT, modified by P. Weaver
 */
export class ConfirmationDialogComponent {

  /**
   * Injects dialogRef and the custom data into class to populate dialog.
   * @param dialogRef `DialogRef` instance to close window after user confirms/cancels
   * @param data `JSON` object with `title` and `message` fields to populate dialog
   */
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) { }

  /**
   * Closes dialog and returns `true` on 'Confirm'.
   */
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  /**
   * Closes dialog and returns `false` on 'Cancel'.
   */
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
