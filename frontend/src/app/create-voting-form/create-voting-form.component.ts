import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-voting-form',
  templateUrl: './create-voting-form.component.html',
  styleUrls: ['./create-voting-form.component.css']
})
export class CreateVotingFormComponent {
  title: string = '';
  description: string = '';
  emails: string = '';
  endTime: string = '';
  question: string = '';
  // qType:
  answers: string = '';
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
