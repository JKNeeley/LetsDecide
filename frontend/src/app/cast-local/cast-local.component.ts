import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CastLocalService } from './cast-local.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-cast-local',
  templateUrl: './cast-local.component.html',
  styleUrls: ['./cast-local.component.css']
})
export class CastLocalComponent {
  @Input() formData: any; // Replace 'any' with your actual data model interface
  
  title: string='';
  description: string='';
  question: string='';
  choices: string[] = ['Choice 1', 'Choice 2', 'Choice 3']; // Add your choices here
  choice: string = '';


  constructor(private router: Router, private voteService: CastLocalService) {}

  ngOnInit(): void {
    this.voteService.getVoteDetails().subscribe((data) => {
      this.title = data.title;
      this.description = data.description;
      this.question = data.question;
    });
  }

  chooseAnswer(questionIndex: number, selectedAnswer: string) {
    // Handle the logic for choosing an answer (e.g., update a response model)
    // You may want to emit an event to notify the parent component about the selected answer
  }

  navigateToCastLocal(){

    // Replace this with actual credential validation
    console.log('Submitted title:', this.choice);
    
    this.router.navigate(['/cast-local']);
  }

  navigateToHomePage() {

    this.router.navigate(['']);
  }

}
