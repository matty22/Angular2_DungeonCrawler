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
  wallTiles: Array<Array<number>> = [];
  player:Player = {
          health: 50,
          xp: 0,
          minAttack: 1,
          maxAttack: 3,
          weapon: "Iron Sword",
          hasKey: false
        }
  enemy: Enemy = {
          health: 10,
          minAttack: 3,
          maxAttack: 4
        }

  ngOnInit() {
    this.canvas = <HTMLCanvasElement> document.getElementById('dungeonMap');
    this.ctx = this.canvas.getContext('2d');
    this.canvasWidth = 860;
    this.canvasHeight = 640;
    this.buildBoard();
    this.buildWalls();
    this.placePlayer();
    // this.placeEnemies();
  }

  // Build the game board
  buildBoard() {
    for (var j = 0; j < this.canvasHeight; j++) {
      for (var i = 0; i < this.canvasWidth; i++) {
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(i * 10, j * 10, 10, 10);
      }
    }
  }

  buildWalls() {
    this.buildVerticalWalls();
    this.buildHorizontalWalls();
  }

  // Builds Vertical Walls
  buildVerticalWalls() {
    for(let i = 0; i < 9; i++) {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(20 * 10, i * 10, 10, 10);
      this.wallTiles.push([20, i]);
      this.ctx.fillRect(21 * 10, i * 10, 10, 10);
      this.wallTiles.push([21, i]);
      this.ctx.fillRect(42 * 10, i * 10, 10, 10);
      this.wallTiles.push([42, i]);
      this.ctx.fillRect(43 * 10, i * 10, 10, 10);
      this.wallTiles.push([43, i]);
      this.ctx.fillRect(64 * 10, i * 10, 10, 10);
      this.wallTiles.push([64, i]);
      this.ctx.fillRect(65 * 10, i * 10, 10, 10);
      this.wallTiles.push([65, i]);
    }

    for (let i = 11; i < 31; i++) {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(20 * 10, i * 10, 10, 10);
      this.wallTiles.push([20, i]);
      this.ctx.fillRect(21 * 10, i * 10, 10, 10);
      this.wallTiles.push([21, i]);
      this.ctx.fillRect(42 * 10, i * 10, 10, 10);
      this.wallTiles.push([42, i]);
      this.ctx.fillRect(43 * 10, i * 10, 10, 10);
      this.wallTiles.push([43, i]);
      this.ctx.fillRect(64 * 10, i * 10, 10, 10);
      this.wallTiles.push([64, i]);
      this.ctx.fillRect(65 * 10, i * 10, 10, 10);
      this.wallTiles.push([65, i]);
    }
    
    for (let i = 33; i < 53; i++) {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(20 * 10, i * 10, 10, 10);
      this.wallTiles.push([20, i]);
      this.ctx.fillRect(21 * 10, i * 10, 10, 10);
      this.wallTiles.push([21, i]);
      this.ctx.fillRect(42 * 10, i * 10, 10, 10);
      this.wallTiles.push([42, i]);
      this.ctx.fillRect(43 * 10, i * 10, 10, 10);
      this.wallTiles.push([43, i]);
      this.ctx.fillRect(64 * 10, i * 10, 10, 10);
      this.wallTiles.push([64, i]);
      this.ctx.fillRect(65 * 10, i * 10, 10, 10);
      this.wallTiles.push([65, i]);
    }

    for (let i = 55; i < 64; i++) {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(20 * 10, i * 10, 10, 10);
      this.wallTiles.push([20, i]);
      this.ctx.fillRect(21 * 10, i * 10, 10, 10);
      this.wallTiles.push([21, i]);
      this.ctx.fillRect(42 * 10, i * 10, 10, 10);
      this.wallTiles.push([42, i]);
      this.ctx.fillRect(43 * 10, i * 10, 10, 10);
      this.wallTiles.push([43, i]);
      this.ctx.fillRect(64 * 10, i * 10, 10, 10);
      this.wallTiles.push([64, i]);
      this.ctx.fillRect(65 * 10, i * 10, 10, 10);
      this.wallTiles.push([65, i]);
    }
  }

  // Builds horizontal Walls
  buildHorizontalWalls() {
    for(let i = 0; i < 9; i++) {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(i * 10, 20 * 10, 10, 10);
      this.wallTiles.push([i, 20]);
      this.ctx.fillRect(i * 10, 21 * 10, 10, 10);
      this.wallTiles.push([i, 21]);
      this.ctx.fillRect(i * 10, 42 * 10, 10, 10);
      this.wallTiles.push([i, 42]);
      this.ctx.fillRect(i * 10, 43 * 10, 10, 10);
      this.wallTiles.push([i, 43]);
    }

    for(let i = 11; i < 31; i++) {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(i * 10, 20 * 10, 10, 10);
      this.wallTiles.push([i, 20]);
      this.ctx.fillRect(i * 10, 21 * 10, 10, 10);
      this.wallTiles.push([i, 21]);
      this.ctx.fillRect(i * 10, 42 * 10, 10, 10);
      this.wallTiles.push([i, 42]);
      this.ctx.fillRect(i * 10, 43 * 10, 10, 10);
      this.wallTiles.push([i, 43]);
    }

    for(let i = 33; i < 53; i++) {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(i * 10, 20 * 10, 10, 10);
      this.wallTiles.push([i, 20]);
      this.ctx.fillRect(i * 10, 21 * 10, 10, 10);
      this.wallTiles.push([i, 21]);
      this.ctx.fillRect(i * 10, 42 * 10, 10, 10);
      this.wallTiles.push([i, 42]);
      this.ctx.fillRect(i * 10, 43 * 10, 10, 10);
      this.wallTiles.push([i, 43]);
    }

    for(let i = 55; i < 75; i++) {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(i * 10, 20 * 10, 10, 10);
      this.wallTiles.push([i, 20]);
      this.ctx.fillRect(i * 10, 21 * 10, 10, 10);
      this.wallTiles.push([i, 21]);
      this.ctx.fillRect(i * 10, 42 * 10, 10, 10);
      this.wallTiles.push([i, 42]);
      this.ctx.fillRect(i * 10, 43 * 10, 10, 10);
      this.wallTiles.push([i, 43]);
    }

    for(let i = 77; i < 86; i++) {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(i * 10, 20 * 10, 10, 10);
      this.wallTiles.push([i, 20]);
      this.ctx.fillRect(i * 10, 21 * 10, 10, 10);
      this.wallTiles.push([i, 21]);
      this.ctx.fillRect(i * 10, 42 * 10, 10, 10);
      this.wallTiles.push([i, 42]);
      this.ctx.fillRect(i * 10, 43 * 10, 10, 10);
      this.wallTiles.push([i, 43]);
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
        // Player pushes left arrow key
        case 37:
          // Fill in the space player is leaving with gray background color
          this.ctx.fillStyle = "gray";
          this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          this.playerLocation[0] -= 1;
          // If the space the player is moving into is a wall, move player back to left 1 space
          if (JSON.stringify(this.wallTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1 || this.playerLocation[0] == -1) {
            this.playerLocation[0] += 1;
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          }
          // If the space the player is moving into is not a wall, move player into that new space 
          else {
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          }
          break;

        // Player pushes up arrow key
        case 38:
          // Fill in the space player is leaving with gray background color
          this.ctx.fillStyle = "gray";
          this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          this.playerLocation[1] -= 1;
          // If the space the player is moving into is a wall, move player back to left 1 space
          if (JSON.stringify(this.wallTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1 || this.playerLocation[1] == -1) {
            this.playerLocation[1] += 1;
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          }
          // If the space the player is moving into is not a wall, move player into that new space 
          else {
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          }
          break;
        
        // Player pushes right arrow key
        case 39:
          // Fill in the space player is leaving with gray background color
          this.ctx.fillStyle = "gray";
          this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          this.playerLocation[0] += 1;
          // If the space the player is moving into is a wall, move player back to left 1 space
          if (JSON.stringify(this.wallTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1 || this.playerLocation[0] == 86) {
            this.playerLocation[0] -= 1;
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          }
          // If the space the player is moving into is not a wall, move player into that new space 
          else {
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          }
          break;
        
        // Player pushes down arrow key
        case 40:
          this.ctx.fillStyle = "gray";
          this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          this.playerLocation[1] += 1;
          // If the space the player is moving into is a wall, move player back to left 1 space
          if (JSON.stringify(this.wallTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1 || this.playerLocation[1] == 64) {
            this.playerLocation[1] -= 1;
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          }
          // If the space the player is moving into is not a wall, move player into that new space 
          else {
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
          }
          break;
      }
  }
}



