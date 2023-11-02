import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-drafted-vote',
  templateUrl: './edit-drafted-vote.component.html',
  styleUrls: ['./edit-drafted-vote.component.css']
})
export class EditDraftedVoteComponent {
  title: string = 'title';
  description: string = 'description';
  emails: string = 'emails';
  endTime: string = 'endtime';
  question: string = 'question';
  // qType:
  answers: string = 'answers';
  // rType: 


  showSaveCredentialsPopup = false;

  constructor(private router: Router) {}

  navigateToHomePage(){

    // Replace this with actual credential validation
    console.log('Submitted title:', this.title);
    console.log('Submitted description:', this.description);
    console.log('Submitted emails:', this.emails);
    console.log('Submitted endTime:', this.endTime);
    console.log('Submitted question:', this.question);
    console.log('Submitted answers:', this.answers);
    
    this.router.navigate(['']);
  }

}
