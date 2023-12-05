import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateVotingFormComponent } from './create-voting-form/create-voting-form.component';
import { CreateRoomVoteComponent } from './create-room-vote/create-room-vote.component';
import { CastVoteComponent } from './cast-vote/cast-vote.component';
import { CastLocalComponent } from './cast-local/cast-local.component';
import { PiechartComponent } from './piechart/piechart.component';
import { ResultsComponent } from './results/results.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'create-voting-form', component: CreateVotingFormComponent },
  { path: 'create-room-vote', component: CreateRoomVoteComponent },
  { path: 'cast-vote/:id', component: CastVoteComponent },
  { path: 'cast-local/:id', component: CastLocalComponent },
  { path: 'piechart/:id', component: PiechartComponent},
  { path: 'results/:id', component: ResultsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
