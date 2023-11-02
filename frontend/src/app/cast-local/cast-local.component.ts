import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cast-local',
  templateUrl: './cast-local.component.html',
  styleUrls: ['./cast-local.component.css']
})
export class CastLocalComponent {
  choice: string='';


  showSaveCredentialsPopup = false;

  constructor(private router: Router) {}

  navigateToCastLocal(){

    // Replace this with actual credential validation
    console.log('Submitted title:', this.choice);
    
    this.router.navigate(['/cast-local']);
  }

  navigateToHomePage() {

    this.router.navigate(['']);
  }

}
