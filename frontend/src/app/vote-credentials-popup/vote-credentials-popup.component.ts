// vote-credentials-popup.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vote-credentials-popup',
  templateUrl: './vote-credentials-popup.component.html',
  styleUrls: ['./vote-credentials-popup.component.css'],
})
export class VoteCredentialsPopupComponent {
  code: string = '';

  constructor(private router: Router) {}

  navigateToCastVote(){
    //console.log('Submitted Form ID:', this.code);
    this.router.navigate(['/cast-vote/'+this.code]);
  }
}