import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';


import { AppComponent } from './app.component';
import { StoryModalComponent } from './story-modal/story-modal.component';
import { InstructionsModalComponent } from './instructions-modal/instructions-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryModalComponent,
    InstructionsModalComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    StoryModalComponent,
    InstructionsModalComponent
  ]
})
export class AppModule { }
