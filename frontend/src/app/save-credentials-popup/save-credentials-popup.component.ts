// vote-credentials-popup.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-credentials-popup',
  templateUrl: './save-credentials-popup.component.html',
  styleUrls: ['./save-credentials-popup.component.css']
})
export class SaveCredentialsPopupComponent {
  email: string = '';
  code: string = '';

  constructor(private router: Router) {}

  navigateToHomePage(){
    console.log('Submitted email:', this.email);
    console.log('Submitted code:', this.code);
    this.router.navigate(['']);
  }
}