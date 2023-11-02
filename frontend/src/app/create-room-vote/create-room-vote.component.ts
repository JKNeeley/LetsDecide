import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IntegerType } from 'mongodb';

@Component({
  selector: 'app-create-room-vote',
  templateUrl: './create-room-vote.component.html',
  styleUrls: ['./create-room-vote.component.css']
})
export class CreateRoomVoteComponent {
  title: string = '';
  description: string = '';
  voters?: number;
  question: string = '';
  // qType:
  answers: string = '';
  // rType: 

  showSaveCredentialsPopup = false;

  constructor(private router: Router) {}

  navigateToCastVote(iterations: number){

    console.log('Submitted title:', this.title);
    console.log('Submitted description:', this.description);
    console.log('Submitted voters:', this.voters);
    console.log('Submitted question:', this.question);
    console.log('Submitted answers:', this.answers);

    this.router.navigate(['/cast-local']);
  }

}
