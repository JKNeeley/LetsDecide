import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  showEditCredentialsPopup = false;
  showVoteCredentialsPopup = false;
  constructor(private router: Router) {}

  navigateToCreateVotingForm(){
    this.router.navigate(['/create-voting-form']);
  }

  navigateToCreateLocalVote(){
    this.router.navigate(['/create-room-vote']);
  }
}
