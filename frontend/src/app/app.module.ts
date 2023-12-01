import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateVotingFormComponent } from './create-voting-form/create-voting-form.component';
import { CreateRoomVoteComponent } from './create-room-vote/create-room-vote.component';
import { CastVoteComponent } from './cast-vote/cast-vote.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VoteCredentialsPopupComponent } from './vote-credentials-popup/vote-credentials-popup.component';
import { CastLocalComponent } from './cast-local/cast-local.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CreateVotingFormComponent,
    CreateRoomVoteComponent,
    CastVoteComponent,
    VoteCredentialsPopupComponent,
    CastLocalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
