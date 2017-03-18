import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';


import { AppComponent } from './app.component';
import { StoryModalComponent } from './story-modal/story-modal.component';
import { InstructionsModalComponent } from './instructions-modal/instructions-modal.component';
import { GameOverComponent } from './game-over/game-over.component';
import { GameWinComponent } from './game-win/game-win.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryModalComponent,
    InstructionsModalComponent,
    GameOverComponent,
    GameWinComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    StoryModalComponent,
    InstructionsModalComponent,
    GameOverComponent,
    GameWinComponent
  ]
})
export class AppModule { }
