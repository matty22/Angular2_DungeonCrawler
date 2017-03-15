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
  wallTiles: Array<Array<number>> = [];
  enemyTiles: Array<Array<number>> = [];
  player:Player = {
          health: 50,
          level: 1,
          xp: 0,
          minAttack: 3,
          maxAttack: 4,
          weapon: "Iron Sword",
          currentRoom: 1,
          hasKey: false
        }
  enemiesLvl1: Enemy[] = [
      { health: 10, minAttack: 4, maxAttack: 6, location: [] },
      { health: 10, minAttack: 4, maxAttack: 6, location: [] },
      { health: 10, minAttack: 4, maxAttack: 6, location: [] },
      { health: 10, minAttack: 4, maxAttack: 6, location: [] },
      { health: 10, minAttack: 4, maxAttack: 6, location: [] },
      { health: 10, minAttack: 4, maxAttack: 6, location: [] },
      { health: 10, minAttack: 4, maxAttack: 6, location: [] },
      { health: 10, minAttack: 4, maxAttack: 6, location: [] },
      { health: 10, minAttack: 4, maxAttack: 6, location: [] },
      { health: 10, minAttack: 4, maxAttack: 6, location: [] },
    ];
  keyTile: number[];
  weaponTile: number[];
  potionTiles: Array<Array<number>> = [];

  ngOnInit() {
    this.canvas = <HTMLCanvasElement> document.getElementById('dungeonMap');
    this.ctx = this.canvas.getContext('2d');
    this.canvasWidth = 860;
    this.canvasHeight = 640;
    this.buildBoard();
    this.placePlayer();
    this.placeEnemies();
    this.placeKey();
    this.placePotions();
    this.placeWeapon();
  }

  // Build the game board
  buildBoard() {
    for (var j = 0; j < this.canvasHeight; j++) {
      for (var i = 0; i < this.canvasWidth; i++) {
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(i * 10, j * 10, 10, 10);
      }
    }
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
    // Generate 10 enemies and randomly place them on the canvas
    for(let i = 0; i < this.enemiesLvl1.length; i++) {
      this.enemiesLvl1[i].location = this.placeItemInRoom();
      this.enemyTiles.push(this.enemiesLvl1[i].location);
      this.ctx.fillStyle = "purple";
      this.ctx.fillRect(this.enemiesLvl1[i].location[0] * 10, this.enemiesLvl1[i].location[1] * 10, 10, 10);
    }
  }

  // Place a key somewhere in the dungeon
  // Keys could be in an imp's pocket or hidden under other items, seach carefully!
  placeKey() {
    this.keyTile = this.placeItemInRoom();
    this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(this.keyTile[0] * 10, this.keyTile[1] * 10, 10, 10);
  }

  // Place three health potions somewhere in the dungeon
  placePotions() {
    for (let i = 0; i < 3; i++) {
      this.potionTiles.push(this.placeItemInRoom());
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(this.potionTiles[i][0] * 10, this.potionTiles[i][1] * 10, 10, 10);
    } 
  }

  // Place upgrade weapon somewhere in the dungeon
  placeWeapon() {
    this.weaponTile = this.placeItemInRoom();
    this.ctx.fillStyle = "silver";
    this.ctx.fillRect(this.weaponTile[0] * 10, this.weaponTile[1] * 10, 10, 10);
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
          // If player collides with enemy
          else if (JSON.stringify(this.enemyTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1) {
            this.playerLocation[0] += 1;
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
            // Enemy hits between 4-6 damage. Need to add level multiplier to this
            var enemyHit = Math.floor(Math.random() * (this.enemiesLvl1[0].maxAttack - this.enemiesLvl1[0].minAttack + 1)) + this.enemiesLvl1[0].minAttack;
            this.player.health = this.player.health - enemyHit;
            // If the player dies, end the game
            if (this.player.health <= 0) {
              // Add Game Over functionality here
              console.log("Game Over!");
            }
            // Player hits between a range of damage * player level
            var playerHit = Math.floor(Math.random() * (this.player.maxAttack * this.player.level - this.player.minAttack * this.player.level + 1)) + this.player.minAttack * this.player.level;
            this.enemiesLvl1[0].health = this.enemiesLvl1[0].health - playerHit;
            // If the enemy dies, move into his space and gain XP
            if (this.enemiesLvl1[0].health <= 0) {
              this.player.xp += 10;
              this.ctx.fillStyle = "gray";
              this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
              this.playerLocation[0] -= 1;
              this.ctx.fillStyle = "green";
              this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
            }
          }
          // If the space the player is moving into is not a wall or an enemy, move player into that new space 
          else {
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
            // If player steps on key, add to player inventory
            if (JSON.stringify(this.keyTile) == JSON.stringify(this.playerLocation)) {
              this.player.hasKey = true;
            }
            // If player steps on potion, increase player health by 25
            else if (JSON.stringify(this.potionTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1) {
              this.player.health += 25;
            }
            else if (JSON.stringify(this.weaponTile) == JSON.stringify(this.playerLocation)) {
              switch(this.player.weapon) {
                case 'Iron Sword':
                  this.player.weapon = 'Mithril Sword';
                  this.player.minAttack = 5;
                  this.player.maxAttack = 7;
                  break;
                case 'Mithril Sword':
                  this.player.weapon = 'Excalibur';
                  this.player.minAttack = 9;
                  this.player.maxAttack = 12;
                  break;
              }
            }
            this.determineCurrentRoom();
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
          // If player collides with enemy
          else if (JSON.stringify(this.enemyTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1) {
            this.playerLocation[1] += 1;
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
            // Enemy hits between 4-6 damage. Need to add level multiplier to this
            var enemyHit = Math.floor(Math.random() * (this.enemiesLvl1[0].maxAttack - this.enemiesLvl1[0].minAttack + 1)) + this.enemiesLvl1[0].minAttack;
            this.player.health = this.player.health - enemyHit;
            // If the player dies, end the game
            if (this.player.health <= 0) {
              // Add Game Over functionality here
              console.log("Game Over!");
            }
            // Player hits between a range of damage * player level
            var playerHit = Math.floor(Math.random() * (this.player.maxAttack * this.player.level - this.player.minAttack * this.player.level + 1)) + this.player.minAttack * this.player.level;
            this.enemiesLvl1[0].health = this.enemiesLvl1[0].health - playerHit;
            // If the enemy dies, move into his space and gain XP
            if (this.enemiesLvl1[0].health <= 0) {
              this.player.xp += 10;
              this.ctx.fillStyle = "gray";
              this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
              this.playerLocation[1] -= 1;
              this.ctx.fillStyle = "green";
              this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
            }
          }
          // If the space the player is moving into is not a wall or an enemy, move player into that new space 
          else {
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
            // If player steps on key, add to player inventory
            if (JSON.stringify(this.keyTile) == JSON.stringify(this.playerLocation)) {
              this.player.hasKey = true;
            }
            // If player steps on potion, increase player health by 25
            else if (JSON.stringify(this.potionTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1) {
              this.player.health += 25;
            }
            else if (JSON.stringify(this.weaponTile) == JSON.stringify(this.playerLocation)) {
              switch(this.player.weapon) {
                case 'Iron Sword':
                  this.player.weapon = 'Mithril Sword';
                  this.player.minAttack = this.player.level * 5;
                  this.player.maxAttack = this.player.level * 7;
                  break;
                case 'Mithril Sword':
                  this.player.weapon = 'Excalibur';
                  this.player.minAttack = this.player.level * 9;
                  this.player.maxAttack = this.player.level * 12;
                  break;
              }
            }
            this.determineCurrentRoom();
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
          // If player collides with enemy
          else if (JSON.stringify(this.enemyTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1) {
            this.playerLocation[0] -= 1;
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
            // Enemy hits between 4-6 damage. Need to add level multiplier to this
            var enemyHit = Math.floor(Math.random() * (this.enemiesLvl1[0].maxAttack - this.enemiesLvl1[0].minAttack + 1)) + this.enemiesLvl1[0].minAttack;
            this.player.health = this.player.health - enemyHit;
            // If the player dies, end the game
            if (this.player.health <= 0) {
              // Add Game Over functionality here
              console.log("Game Over!");
            }
            // Player hits between a range of damage * player level
            var playerHit = Math.floor(Math.random() * (this.player.maxAttack * this.player.level - this.player.minAttack * this.player.level + 1)) + this.player.minAttack * this.player.level;
            this.enemiesLvl1[0].health = this.enemiesLvl1[0].health - playerHit;
            // If the enemy dies, move into his space and gain XP
            if (this.enemiesLvl1[0].health <= 0) {
              this.player.xp += 10;
              this.ctx.fillStyle = "gray";
              this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
              this.playerLocation[0] += 1;
              this.ctx.fillStyle = "green";
              this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
            }
          }
          // If the space the player is moving into is not a wall or an enemy, move player into that new space 
          else {
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
            // If player steps on key, add to player inventory
            if (JSON.stringify(this.keyTile) == JSON.stringify(this.playerLocation)) {
              this.player.hasKey = true;
            }
            // If player steps on potion, increase player health by 25
            else if (JSON.stringify(this.potionTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1) {
              this.player.health += 25;
            }
            else if (JSON.stringify(this.weaponTile) == JSON.stringify(this.playerLocation)) {
              switch(this.player.weapon) {
                case 'Iron Sword':
                  this.player.weapon = 'Mithril Sword';
                  this.player.minAttack = this.player.level * 5;
                  this.player.maxAttack = this.player.level * 7;
                  break;
                case 'Mithril Sword':
                  this.player.weapon = 'Excalibur';
                  this.player.minAttack = this.player.level * 9;
                  this.player.maxAttack = this.player.level * 12;
                  break;
              }
            }
            this.determineCurrentRoom();
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
          // If player collides with enemy
          else if (JSON.stringify(this.enemyTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1) {
            this.playerLocation[1] -= 1;
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
            // Enemy hits between 4-6 damage. Need to add level multiplier to this
            var enemyHit = Math.floor(Math.random() * (this.enemiesLvl1[0].maxAttack - this.enemiesLvl1[0].minAttack + 1)) + this.enemiesLvl1[0].minAttack;
            this.player.health = this.player.health - enemyHit;
            // If the player dies, end the game
            if (this.player.health <= 0) {
              // Add Game Over functionality here
              console.log("Game Over!");
            }
            // Player hits between a range of damage * player level
            var playerHit = Math.floor(Math.random() * (this.player.maxAttack * this.player.level - this.player.minAttack * this.player.level + 1)) + this.player.minAttack * this.player.level;
            this.enemiesLvl1[0].health = this.enemiesLvl1[0].health - playerHit;
            // If the enemy dies, move into his space and gain XP
            if (this.enemiesLvl1[0].health <= 0) {
              this.player.xp += 10;
              this.ctx.fillStyle = "gray";
              this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
              this.playerLocation[1] += 1;
              this.ctx.fillStyle = "green";
              this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
            }
          }
          // If the space the player is moving into is not a wall or an enemy, move player into that new space 
          else {
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
            // If player steps on key, add to player inventory
            if (JSON.stringify(this.keyTile) == JSON.stringify(this.playerLocation)) {
              this.player.hasKey = true;
            }
            // If player steps on potion, increase player health by 25
            else if (JSON.stringify(this.potionTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1) {
              this.player.health += 25;
            }
            else if (JSON.stringify(this.weaponTile) == JSON.stringify(this.playerLocation)) {
              switch(this.player.weapon) {
                case 'Iron Sword':
                  this.player.weapon = 'Mithril Sword';
                  this.player.minAttack = this.player.level * 5;
                  this.player.maxAttack = this.player.level * 7;
                  break;
                case 'Mithril Sword':
                  this.player.weapon = 'Excalibur';
                  this.player.minAttack = this.player.level * 9;
                  this.player.maxAttack = this.player.level * 12;
                  break;
              }
            }
            this.determineCurrentRoom();
          }
          break;
      }
  }

  determineCurrentRoom() {
    if (this.playerLocation[0] < 21 && this.playerLocation[1] < 21) {
      this.player.currentRoom = 1;
    }
    else if (this.playerLocation[0] >= 21 && this.playerLocation[0] < 43 && this.playerLocation[1] < 21) {
      this.player.currentRoom = 2;
    }
    else if (this.playerLocation[0] >= 43 && this.playerLocation[0] < 65 && this.playerLocation[1] < 21) {
      this.player.currentRoom = 3;
    }
    else if (this.playerLocation[0] >= 65 && this.playerLocation[1] < 21) {
      this.player.currentRoom = 4;
    }
    else if (this.playerLocation[0] < 21 && this.playerLocation[1] >= 21 && this.playerLocation[1] < 43) {
      this.player.currentRoom = 5;
    }
    else if (this.playerLocation[0] >= 21 && this.playerLocation[0] < 43 && this.playerLocation[1] >= 21 && this.playerLocation[1] < 43) {
      this.player.currentRoom = 6;
    }
    else if (this.playerLocation[0] >= 43 && this.playerLocation[0] < 65 && this.playerLocation[1] >= 21 && this.playerLocation[1] < 43) {
      this.player.currentRoom = 7;
    }
    else if (this.playerLocation[0] >= 65 && this.playerLocation[1] >= 21 && this.playerLocation[1] < 43) {
      this.player.currentRoom = 8;
    }
    else if (this.playerLocation[0] < 21 && this.playerLocation[1] >= 43 && this.playerLocation[1] < 64) {
      this.player.currentRoom = 9;
    }
    else if (this.playerLocation[0] >= 21 && this.playerLocation[0] < 43 && this.playerLocation[1] >= 43 && this.playerLocation[1] < 64) {
      this.player.currentRoom = 10;
    }
    else if (this.playerLocation[0] >= 43 && this.playerLocation[0] < 65 && this.playerLocation[1] >= 43 && this.playerLocation[1] < 64) {
      this.player.currentRoom = 11;
    }
    else if (this.playerLocation[0] >= 65 && this.playerLocation[1] > 42 && this.playerLocation[1] < 64) {
      this.player.currentRoom = 12;
    }
  }

  // Function to generate random locations for enemies and items
  placeItemInRoom() {
    // Generate random x location, but don't allow that x coordinate
    // to be in any of the columns where there is a vertical wall
    var xLoc = Math.floor(Math.random() * (85 - 0 + 1)) + 0;
    if (xLoc === 20 || xLoc === 42 || xLoc === 64) {
      xLoc -= 1;
    } else if (xLoc === 21 || xLoc === 43 || xLoc === 65) {
      xLoc += 1;
    }
    // Generate random y location, but don't allow that y coordinate
    // to be in any of the rows where there is a horizontal wall
    var yLoc = Math.floor(Math.random() * (63 - 0 + 1)) + 0;
    if (yLoc === 20 || yLoc === 42) {
      yLoc -= 1;
    } else if (yLoc === 21 || yLoc === 43) {
      yLoc += 1;
    }
    // Don't let enemies be placed where hero starts
    // ***** This will have to be expanded to not allow items to be placed on top of other items *****
    if (xLoc === 5 && yLoc === 5) {
      xLoc += 1;
    }
    return [xLoc, yLoc];
  }





// Combine this into a function named drawPlayer()
// this.ctx.fillStyle = "green";
// this.ctx.fillRect(this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);)


/***** TODO *****/

  // - Add level up function when player reaches 100XP
  // - Add level multiplier for enemy damage to Player
  // - Add game over functionality
  // - Add final boss
  // - Add doors to stairwell
  // - Add door unlocking with key functionality
  // - Add stairwell
  // - Add functionality to regenerate map upon reaching another floor
  // - Add shadow functionality
  // - Add a legend
  // - Skin dungeon with patterns rather than flat colors
  // - Add instructions area
  // - Add story area with music
  
/****************/

}

