import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateVotingFormComponent } from './create-voting-form/create-voting-form.component';
import { CreateRoomVoteComponent } from './create-room-vote/create-room-vote.component';
import { CastVoteComponent } from './cast-vote/cast-vote.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VoteCredentialsPopupComponent } from './vote-credentials-popup/vote-credentials-popup.component';
import { CastLocalComponent } from './cast-local/cast-local.component';
import { PiechartComponent } from './piechart/piechart.component';
import { ResultsComponent } from './results/results.component';
import { VoteFormIdPopupComponent } from './vote-form-id-popup/vote-form-id-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CreateVotingFormComponent,
    CreateRoomVoteComponent,
    CastVoteComponent,
    VoteCredentialsPopupComponent,
    CastLocalComponent,
    PiechartComponent,
    ResultsComponent,
    VoteFormIdPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
