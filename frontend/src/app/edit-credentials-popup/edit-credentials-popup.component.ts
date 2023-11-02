// edit-credentials-popup.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-credentials-popup',
  templateUrl: './edit-credentials-popup.component.html',
  styleUrls: ['./edit-credentials-popup.component.css'],
})
export class EditCredentialsPopupComponent {
  email: string = '';
  code: string = '';

  constructor(private router: Router) {}

  navigateToCastVote(){
    // Placeholder logic for credential submission
    // Replace this with actual credential validation
    console.log('Submitted email:', this.email);
    console.log('Submitted code:', this.code);
    // Close the pop-up or navigate to the appropriate page
    // based on the submitted credentials
    this.router.navigate(['/edit-drafted-vote']);
  }
}