
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cast-vote',
  templateUrl: './cast-vote.component.html',
  styleUrls: ['./cast-vote.component.css']
})
export class CastVoteComponent {
  @Input() formData: any; // Replace 'any' with your actual data model interface
  choice: string='';


  showSaveCredentialsPopup = false;

  constructor(private router: Router) {}

  chooseAnswer(questionIndex: number, selectedAnswer: string) {
    // Handle the logic for choosing an answer (e.g., update a response model)
    // You may want to emit an event to notify the parent component about the selected answer
  }

  navigateToHomePage(){
    // Replace this with actual credential validation
    console.log('Submitted title:', this.choice);
    
    this.router.navigate(['']);
  }
}
