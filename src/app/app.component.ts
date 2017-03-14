import { Component, OnInit } from '@angular/core';
import { Player } from './player';
import { Enemy } from'./enemy';

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
  enemyLocation: number[];
  player:Player = {
    health: 50,
    xp: 0,
    minAttack: 1,
    maxAttack: 3,
    weapon: "Iron Sword"
  }
  enemy: Enemy = {
  health: 10,
  minAttack: 3,
  maxAttack: 4
  }


  ngOnInit() {
    this.canvas = <HTMLCanvasElement> document.getElementById('dungeonMap');
    this.ctx = this.canvas.getContext('2d');
    this.canvasWidth = 100;
    this.canvasHeight = 75;
    this.buildBoard();
    // this.placePlayer();
    // this.placeEnemies();
  }

  // Build the game board
  buildBoard() {
    for (var j = 0; j < this.canvasHeight; j++) {
      for (var i = 0; i < this.canvasWidth; i++) {
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(i * 10, j * 10, 10, 10);
        this.ctx.strokeStyle="#5a5a5a";
            this.ctx.strokeRect(i * 10, j * 10, 10, 10);
      }
    }
  }

  // Assign player location upon page load
  placePlayer() {
    this.playerLocation = [5, 5];
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
  }

  placeEnemies() {
    // Generate 3 enemies and randomly place them on the canvas
    var enemy1: Enemy;
    var enemy2: Enemy;
    var enemy3: Enemy;
    this.enemyLocation = [10, 10];
    this.ctx.fillStyle = "purple";
    this.ctx.fillRect(this.enemyLocation[0] * 10, this.enemyLocation[1] * 10, 10, 10);
  }

  // Move player upon key press
  movePlayer(pressedKey) {
      switch (pressedKey.keyCode) {
        case 37:
        // Player pushes left arrow key
        if(this.playerLocation[0] === (this.enemyLocation[0] + 1) && this.playerLocation[1] === this.enemyLocation[1]) {
          console.log("enemy hit");
        } else {
          this.ctx.fillStyle = "black";
          this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          this.playerLocation[0] = this.playerLocation[0] - 1;
          this.ctx.fillStyle = "blue";
          this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
        }
          break;
        case 38:
        // Player pushes up arrow key
        if(this.playerLocation[1] === (this.enemyLocation[1] + 1) && this.playerLocation[0] === this.enemyLocation[0]) {
          console.log("enemy hit");
        } else {
          this.ctx.fillStyle = "black";
          this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          this.playerLocation[1] = this.playerLocation[1] - 1;
          this.ctx.fillStyle = "blue";
          this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
        }
          break;
        case 39:
        // Player pushes right arrow key
        if(this.playerLocation[0] === (this.enemyLocation[0] - 1) && this.playerLocation[1] === this.enemyLocation[1]) {
          console.log("enemy hit");
        } else {
          this.ctx.fillStyle = "black";
          this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          this.playerLocation[0] = this.playerLocation[0] + 1;
          this.ctx.fillStyle = "blue";
          this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
        }
          break;
        case 40:
        // Player pushes down arrow key
        if(this.playerLocation[1] === (this.enemyLocation[1] - 1) && this.playerLocation[0] === this.enemyLocation[0]) {
          console.log("enemy hit");
        } else {
          this.ctx.fillStyle = "black";
          this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          this.playerLocation[1] = this.playerLocation[1] + 1;
          this.ctx.fillStyle = "blue";
          this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
        }
          break;
      }
  }



colorCell(e) {

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(Math.floor(e.offsetX / 10) * 10, Math.floor(e.offsetY / 10) * 10, 10, 10);
}
}



