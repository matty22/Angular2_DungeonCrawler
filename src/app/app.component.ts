import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  canvas: any;
  ctx: any;
  canvasWidth: number;
  canvasHeight: number;
  playerLocation: number[];

  ngOnInit() {
    this.canvas = <HTMLCanvasElement> document.getElementById('dungeonMap');
    this.ctx = this.canvas.getContext('2d');
    this.canvasWidth = 100;
    this.canvasHeight = 75;
    this.buildBoard();
    this.placePlayer();
  }

  // Build the game board
  buildBoard() {
    for (var j = 0; j < this.canvasHeight; j++) {
      for (var i = 0; i < this.canvasWidth; i++) {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(i * 10, j * 10, 10, 10);
        this.ctx.strokeStyle="#5a5a5a";
        this.ctx.strokeRect(i * 10, j * 10, 10, 10);
      }
    }
  }

  // Assign player location upon page load
  placePlayer() {
    this.playerLocation = [5, 5];
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
  }

  // Move player upon key press
  movePlayer(pressedKey) {
      switch (pressedKey.keyCode) {
        case 37:
        // Player pushes left arrow key
          this.ctx.fillStyle = "black";
          this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          this.playerLocation[0] = this.playerLocation[0] - 1;
          this.ctx.fillStyle = "blue";
          this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          break;
        case 38:
        // Player pushes up arrow key
          this.ctx.fillStyle = "black";
          this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          this.playerLocation[1] = this.playerLocation[1] - 1;
          this.ctx.fillStyle = "blue";
          this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          break;
        case 39:
        // Player pushes right arrow key
          this.ctx.fillStyle = "black";
          this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          this.playerLocation[0] = this.playerLocation[0] + 1;
          this.ctx.fillStyle = "blue";
          this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          break;
        case 40:
        // Player pushes down arrow key
          this.ctx.fillStyle = "black";
          this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          this.playerLocation[1] = this.playerLocation[1] + 1;
          this.ctx.fillStyle = "blue";
          this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          break;
      }
  }

}
