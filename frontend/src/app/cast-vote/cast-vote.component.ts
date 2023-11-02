import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cast-vote',
  templateUrl: './cast-vote.component.html',
  styleUrls: ['./cast-vote.component.css']
})
export class CastVoteComponent {
  choice: string='';


  showSaveCredentialsPopup = false;

  constructor(private router: Router) {}

  navigateToCastVote(){

    // Replace this with actual credential validation
    console.log('Submitted title:', this.choice);
    
    this.router.navigate(['']);
  }
}
