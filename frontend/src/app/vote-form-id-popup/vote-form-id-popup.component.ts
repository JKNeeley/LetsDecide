import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CastVoteService } from '../cast-vote/cast-vote.service';
import { Form } from '../cast-vote/form.model';

@Component({
  selector: 'app-vote-form-id-popup',
  templateUrl: './vote-form-id-popup.component.html',
  styleUrls: ['./vote-form-id-popup.component.css']
})
export class VoteFormIdPopupComponent {
  form!: Form;
  isDataAvailable:boolean = false;

  constructor(
    private voteService: CastVoteService,
    private route: ActivatedRoute,
    ){

    }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');


    this.voteService.getForm(id).subscribe((formData) => {
      this.form = formData;
      console.log(this.form);
    });
  }

}
