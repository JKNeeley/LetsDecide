import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateVotingFormComponent } from './create-voting-form/create-voting-form.component';
import { CreateRoomVoteComponent } from './create-room-vote/create-room-vote.component';
import { EditDraftedVoteComponent } from './edit-drafted-vote/edit-drafted-vote.component';
import { CastVoteComponent } from './cast-vote/cast-vote.component';
import { CastLocalComponent } from './cast-local/cast-local.component';
import { PiechartComponent } from './piechart/piechart.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'create-voting-form', component: CreateVotingFormComponent },
  { path: 'create-room-vote', component: CreateRoomVoteComponent },
  { path: 'edit-drafted-vote', component: EditDraftedVoteComponent },
  { path: 'cast-vote', component: CastVoteComponent },
  { path: 'cast-local', component: CastLocalComponent },
  { path: 'piechart', component: PiechartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
