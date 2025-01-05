import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AngularMaterialModule } from '../../../angular-material.module';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-dialog',
  imports: [AngularMaterialModule, CommonModule, MatDialogModule, FormsModule],
  templateUrl: './email-dialog.component.html',
  styleUrl: './email-dialog.component.scss'
})
export class EmailDialogComponent {
  email: string = ''; 

  constructor(
    public dialogRef: MatDialogRef<EmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {}

  sendEmail() {
    if (this.email && this.email.includes('@')) {
      console.log('Sending email to:', this.email);
      this.dialogRef.close(); 
    }
  }

  closeDialog() {
    this.dialogRef.close(); 
  }
}

