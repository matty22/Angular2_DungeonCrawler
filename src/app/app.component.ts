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
  canvasOverlay: any;
  overlayCtx: any;
  canvasWidth: number;
  canvasHeight: number;
  playerLocation: number[];
  dungeonFloor: number = 0;
  gameMessage: string = "";
  doorLocations: Array<Array<number>> = [[75, 42], [75, 43], [76, 42], [76, 43], [64, 53], [64, 54], [65, 53], [65, 54]];
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
  enemies: Enemy[] = [
      { health: 10, minAttack: 4, maxAttack: 6, location: [] },           // Level 1 enemy stats
      { health: 20, minAttack: 8, maxAttack: 10, location: [] },          // Level 2 enemy stats
      { health: 50, minAttack: 12, maxAttack: 14, location: [] },        // Level 3 enemy stats
      { health: 100, minAttack: 16, maxAttack: 18, location: [] },        // Boss enemy stats
      { health: 10, minAttack: 4, maxAttack: 6, location: [] },
      { health: 10, minAttack: 4, maxAttack: 6, location: [] },
      { health: 10, minAttack: 4, maxAttack: 6, location: [] },
      { health: 10, minAttack: 4, maxAttack: 6, location: [] },
      { health: 10, minAttack: 4, maxAttack: 6, location: [] },
      { health: 10, minAttack: 4, maxAttack: 6, location: [] },
    ];
  keyTile: number[];
  weaponTile: number[];
  stairBossTile:number [];
  bossLocation: Array<Array<number>>;
  potionTiles: Array<Array<number>> = [];

  ngOnInit() {
    this.canvas = <HTMLCanvasElement> document.getElementById('dungeonMap');
    this.ctx = this.canvas.getContext('2d');
    this.canvasOverlay = <HTMLCanvasElement> document.getElementById('shadowOverlay');
    this.overlayCtx = this.canvasOverlay.getContext('2d');
    this.canvasWidth = 860;
    this.canvasHeight = 640;
    this.buildBoard();
    this.placePlayer();
    this.placeEnemies();
    this.placeKey();
    this.placePotions();
    this.placeWeapon();
    this.placeStairsOrBoss();
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
    this.buildDoors();
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

  buildDoors() {
    for (let i = 0; i < this.doorLocations.length; i++) {
      this.ctx.fillStyle = "#8b4513";
      this.ctx.fillRect(this.doorLocations[i][0] * 10, this.doorLocations[i][1] * 10, 10, 10);
    }
  }

  // Assign player location upon page load
  placePlayer() {
    this.playerLocation = [5, 5];
    this.paintPlayer();
  }

  placeEnemies() {
    // Generate 10 enemies and randomly place them on the canvas
    for(let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].location = this.placeItemInRoom();
      this.enemyTiles.push(this.enemies[i].location);
      this.ctx.fillStyle = "purple";
      this.ctx.fillRect(this.enemies[i].location[0] * 10, this.enemies[i].location[1] * 10, 10, 10);
    }
  }

  // Place a key somewhere in the dungeon
  // Keys could be in an imp's pocket or hidden under other items, seach carefully!
  placeKey() {
    this.keyTile = this.placeItemInRoom();
    // If the key generates inside the locked room, move it into the room on the left
    if (this.keyTile[0] > 66 && this.keyTile[1] > 40) {
      this.keyTile = [50, 60];
    }
    this.paintKey();
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
    this.paintWeapon();
  }

  // Places stairwell if on floor 0 or 1, places dungeon boss if on floor 2
  placeStairsOrBoss() {
    this.stairBossTile = [76, 56];
    if (this.dungeonFloor == 0 || this.dungeonFloor == 1) {
      this.paintStairs();
    } else {
      this.bossLocation = [[76, 56], [77, 56], [76, 57], [77, 57]];
      this.paintBoss();
    }
  }

  // Move player upon key press
  movePlayer(pressedKey) {
      switch (pressedKey.keyCode) {
        // Player pushes left arrow key
        case 37:
          // Fill in the space player is leaving with gray background color
          this.paintFloorBehindPlayer();
          this.playerLocation[0] -= 1;
          // If the space the player is moving into is a wall, move player back to left 1 space
          if (JSON.stringify(this.wallTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1 || this.playerLocation[0] == -1) {
            this.playerLocation[0] += 1;
            this.paintPlayer();
          }
          // If the player hits a door and does not have the key, player cannot pass
          else if (JSON.stringify(this.doorLocations).indexOf(JSON.stringify(this.playerLocation)) !== -1 && this.player.hasKey == false) {
            this.playerLocation[0] += 1;
            this.paintPlayer();
          }
          // If player collides with enemy
          else if (JSON.stringify(this.enemyTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1) {
            this.playerLocation[0] += 1;
            this.paintPlayer();
            // Enemies do damage based on which level of the dungeon the player is on
            // Floor 0: 4-6 damage
            // Floor 1: 8-10 damage
            // Floor 2: 12-14 damage
            var enemyHit = Math.floor(Math.random() * (this.enemies[this.dungeonFloor].maxAttack - this.enemies[this.dungeonFloor].minAttack + 1)) + this.enemies[this.dungeonFloor].minAttack;
            this.player.health = this.player.health - enemyHit;
            // If the player dies, end the game
            if (this.player.health <= 0) {
              // Add Game Over functionality here
              this.gameMessage = "You Lose";
            }
            // Player hits between a range of damage * player level
            // Enemy health pool based on which level of the dungeon the player is on
            // Floor 0: 10
            // Floor 1: 50
            // Floor 2: 100
            var playerHit = Math.floor(Math.random() * (this.player.maxAttack * this.player.level - this.player.minAttack * this.player.level + 1)) + this.player.minAttack * this.player.level;
            this.enemies[this.dungeonFloor].health = this.enemies[this.dungeonFloor].health - playerHit;
            // If the enemy dies, move into his space and gain XP
            if (this.enemies[this.dungeonFloor].health <= 0) {
              this.player.xp += 10;
              if (this.player.xp >= 100) {
                this.player.level += 1;
                this.player.xp = 0;
              }
              this.paintFloorBehindPlayer();
              this.playerLocation[0] -= 1;
              this.paintPlayer();
              // Reset enemy health so it is ready for the next enemy
              switch(this.dungeonFloor) {
                case 0: 
                  this.enemies[this.dungeonFloor].health = 10;
                  break;
                case 1:
                  this.enemies[this.dungeonFloor].health = 20;
                  break;
                case 2:
                  this.enemies[this.dungeonFloor].health = 50;
                  break;
              }
            }
          }
          // If player collides with boss enemy
          else if (this.dungeonFloor == 2 && JSON.stringify(this.bossLocation).indexOf(JSON.stringify(this.playerLocation)) !== -1) {
                this.playerLocation[0] += 1;
                this.paintPlayer();
                var bossHit = Math.floor(Math.random() * (this.enemies[3].maxAttack - this.enemies[3].minAttack + 1)) + this.enemies[3].minAttack;
                this.player.health = this.player.health - bossHit;
                // If the player dies, end the game
                if (this.player.health <= 0) {
                  // Add Game Over functionality here
                  this.gameMessage = "You Lose";
                }
                // Player hits between a range of damage * player level
                // Enemy health pool based on which level of the dungeon the player is on
                // Floor 0: 10
                // Floor 1: 50
                // Floor 2: 100
                // Boss: 200
                var playerHit = Math.floor(Math.random() * (this.player.maxAttack * this.player.level - this.player.minAttack * this.player.level + 1)) + this.player.minAttack * this.player.level;
                this.enemies[3].health = this.enemies[3].health - playerHit;
                // If the enemy dies, move into his space and gain XP
                if (this.enemies[3].health <= 0) {
                  this.gameMessage = "You Win!";
                }
           }
          // If the space the player is moving into is not a wall or an enemy, move player into that new space 
          else {
            this.paintPlayer();
            // If player steps on key, add to player inventory
            if (JSON.stringify(this.keyTile) == JSON.stringify(this.playerLocation)) {
              this.player.hasKey = true;
            }
            // If player steps on stairs
            if (this.playerLocation[0] == this.stairBossTile[0] && this.playerLocation[1] == this.stairBossTile[1]) {
              this.changeFloor();
            }
            // If player steps on potion, increase player health by 25
            if (JSON.stringify(this.potionTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1) {
              this.player.health += 25;
            }
            // If player steps on weapon, upgrade weapon
            if (JSON.stringify(this.weaponTile) == JSON.stringify(this.playerLocation)) {
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
                case 'Excalibur':
                  this.player.weapon = 'Ragnarok';
                  this.player.minAttack = 12;
                  this.player.maxAttack = 15;
                  break;
              }
            }
            this.determineCurrentRoom();
          }
          break;

        // Player pushes up arrow key
        case 38:
          // Fill in the space player is leaving with gray background color
          this.paintFloorBehindPlayer();
          this.playerLocation[1] -= 1;
          // If the space the player is moving into is a wall, move player back to left 1 space
          if (JSON.stringify(this.wallTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1 || this.playerLocation[1] == -1) {
            this.playerLocation[1] += 1;
            this.paintPlayer();
          }
          // If the player hits a door and does not have the key, player cannot pass
          else if (JSON.stringify(this.doorLocations).indexOf(JSON.stringify(this.playerLocation)) !== -1 && this.player.hasKey == false) {
            this.playerLocation[1] += 1;
            this.paintPlayer();
          }
          // If player collides with enemy
          else if (JSON.stringify(this.enemyTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1) {
            this.playerLocation[1] += 1;
            this.paintPlayer();
            // Enemies do damage based on which level of the dungeon the player is on
            // Floor 0: 4-6 damage
            // Floor 1: 8-10 damage
            // Floor 2: 12-14 damage
            var enemyHit = Math.floor(Math.random() * (this.enemies[this.dungeonFloor].maxAttack - this.enemies[this.dungeonFloor].minAttack + 1)) + this.enemies[this.dungeonFloor].minAttack;
            this.player.health = this.player.health - enemyHit;
            // If the player dies, end the game
            if (this.player.health <= 0) {
              // Add Game Over functionality here
              this.gameMessage = "You Lose";
            }
            // Player hits between a range of damage * player level
            // Enemy health pool based on which level of the dungeon the player is on
            // Floor 0: 10
            // Floor 1: 50
            // Floor 2: 100
            var playerHit = Math.floor(Math.random() * (this.player.maxAttack * this.player.level - this.player.minAttack * this.player.level + 1)) + this.player.minAttack * this.player.level;
            this.enemies[this.dungeonFloor].health = this.enemies[this.dungeonFloor].health - playerHit;
            // If the enemy dies, move into his space and gain XP
            if (this.enemies[this.dungeonFloor].health <= 0) {
              this.player.xp += 10;
              if (this.player.xp >= 100) {
                this.player.level += 1;
                this.player.xp = 0;
              }
              this.paintFloorBehindPlayer();
              this.playerLocation[1] -= 1;
              this.paintPlayer();
              // Reset enemy health so it is ready for the next enemy
              switch(this.dungeonFloor) {
                case 0: 
                  this.enemies[this.dungeonFloor].health = 10;
                  break;
                case 1:
                  this.enemies[this.dungeonFloor].health = 20;
                  break;
                case 2:
                  this.enemies[this.dungeonFloor].health = 50;
                  break;
              }
            }
          }
          // If player collides with boss enemy
          else if (this.dungeonFloor == 2 && JSON.stringify(this.bossLocation).indexOf(JSON.stringify(this.playerLocation)) !== -1) {
                this.playerLocation[1] += 1;
                this.paintPlayer();
                var bossHit = Math.floor(Math.random() * (this.enemies[3].maxAttack - this.enemies[3].minAttack + 1)) + this.enemies[3].minAttack;
                this.player.health = this.player.health - bossHit;
                // If the player dies, end the game
                if (this.player.health <= 0) {
                  // Add Game Over functionality here
                  this.gameMessage = "You Lose";
                }
                // Player hits between a range of damage * player level
                // Enemy health pool based on which level of the dungeon the player is on
                // Floor 0: 10
                // Floor 1: 50
                // Floor 2: 100
                // Boss: 200
                var playerHit = Math.floor(Math.random() * (this.player.maxAttack * this.player.level - this.player.minAttack * this.player.level + 1)) + this.player.minAttack * this.player.level;
                this.enemies[3].health = this.enemies[3].health - playerHit;
                // If the enemy dies, move into his space and gain XP
                if (this.enemies[3].health <= 0) {
                  this.gameMessage = "You Win!";
                }
           }
          // If the space the player is moving into is not a wall or an enemy, move player into that new space 
          else {
            this.paintPlayer();
            // If player steps on key, add to player inventory
            if (JSON.stringify(this.keyTile) == JSON.stringify(this.playerLocation)) {
              this.player.hasKey = true;
            }
            // If player steps on stairs
            if (this.playerLocation[0] == this.stairBossTile[0] && this.playerLocation[1] == this.stairBossTile[1]) {
              this.changeFloor();
            }
            // If player steps on stairs
            if (this.playerLocation[0] == this.stairBossTile[0] && this.playerLocation[1] == this.stairBossTile[1]) {
              this.changeFloor();
            }
            // If player steps on potion, increase player health by 25
            if (JSON.stringify(this.potionTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1) {
              this.player.health += 25;
            }
            // If player steps on weapon, upgrade weapon
            if (JSON.stringify(this.weaponTile) == JSON.stringify(this.playerLocation)) {
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
                case 'Excalibur':
                  this.player.weapon = 'Ragnarok';
                  this.player.minAttack = 12;
                  this.player.maxAttack = 15;
                  break;
              }
            }
            this.determineCurrentRoom();
          }
          break;
        
        // Player pushes right arrow key
        case 39:
          // Fill in the space player is leaving with gray background color
          this.paintFloorBehindPlayer();
          this.playerLocation[0] += 1;
          // If the space the player is moving into is a wall, move player back to left 1 space
          if (JSON.stringify(this.wallTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1 || this.playerLocation[0] == 86) {
            this.playerLocation[0] -= 1;
            this.paintPlayer();
          }
           // If the player hits a door and does not have the key, player cannot pass
          else if (JSON.stringify(this.doorLocations).indexOf(JSON.stringify(this.playerLocation)) !== -1 && this.player.hasKey == false) {
            this.playerLocation[0] -= 1;
            this.paintPlayer();
          }
          // If player collides with enemy
          else if (JSON.stringify(this.enemyTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1) {
            this.playerLocation[0] -= 1;
            this.paintPlayer();
            // Enemies do damage based on which level of the dungeon the player is on
            // Floor 0: 4-6 damage
            // Floor 1: 8-10 damage
            // Floor 2: 12-14 damage
            var enemyHit = Math.floor(Math.random() * (this.enemies[this.dungeonFloor].maxAttack - this.enemies[this.dungeonFloor].minAttack + 1)) + this.enemies[this.dungeonFloor].minAttack;
            this.player.health = this.player.health - enemyHit;
            // If the player dies, end the game
            if (this.player.health <= 0) {
              // Add Game Over functionality here
              this.gameMessage = "You Lose";
            }
            // Player hits between a range of damage * player level
            // Enemy health pool based on which level of the dungeon the player is on
            // Floor 0: 10
            // Floor 1: 50
            // Floor 2: 100
            var playerHit = Math.floor(Math.random() * (this.player.maxAttack * this.player.level - this.player.minAttack * this.player.level + 1)) + this.player.minAttack * this.player.level;
            this.enemies[this.dungeonFloor].health = this.enemies[this.dungeonFloor].health - playerHit;
            // If the enemy dies, move into his space and gain XP
            if (this.enemies[this.dungeonFloor].health <= 0) {
              this.player.xp += 10;
              if (this.player.xp >= 100) {
                this.player.level += 1;
                this.player.xp = 0;
              }
              this.paintFloorBehindPlayer();
              this.playerLocation[0] += 1;
              this.paintPlayer();
              // Reset enemy health so it is ready for the next enemy
              switch(this.dungeonFloor) {
                case 0: 
                  this.enemies[this.dungeonFloor].health = 10;
                  break;
                case 1:
                  this.enemies[this.dungeonFloor].health = 20;
                  break;
                case 2:
                  this.enemies[this.dungeonFloor].health = 50;
                  break;
              }
            }
          }
          // If player collides with boss enemy
          else if (this.dungeonFloor == 2 && JSON.stringify(this.bossLocation).indexOf(JSON.stringify(this.playerLocation)) !== -1) {
                this.playerLocation[0] -= 1;
                this.paintPlayer();
                var bossHit = Math.floor(Math.random() * (this.enemies[3].maxAttack - this.enemies[3].minAttack + 1)) + this.enemies[3].minAttack;
                this.player.health = this.player.health - bossHit;
                // If the player dies, end the game
                if (this.player.health <= 0) {
                  // Add Game Over functionality here
                  this.gameMessage = "You Lose";
                }
                // Player hits between a range of damage * player level
                // Enemy health pool based on which level of the dungeon the player is on
                // Floor 0: 10
                // Floor 1: 50
                // Floor 2: 100
                // Boss: 200
                var playerHit = Math.floor(Math.random() * (this.player.maxAttack * this.player.level - this.player.minAttack * this.player.level + 1)) + this.player.minAttack * this.player.level;
                this.enemies[3].health = this.enemies[3].health - playerHit;
                // If the enemy dies, move into his space and gain XP
                if (this.enemies[3].health <= 0) {
                  this.gameMessage = "You Win!";
                }
           }
          // If the space the player is moving into is not a wall or an enemy, move player into that new space 
          else {
            this.paintPlayer();
            // If player steps on key, add to player inventory
            if (JSON.stringify(this.keyTile) == JSON.stringify(this.playerLocation)) {
              this.player.hasKey = true;
            }
            // If player steps on stairs
            if (this.playerLocation[0] == this.stairBossTile[0] && this.playerLocation[1] == this.stairBossTile[1]) {
              this.changeFloor();
            }
            // If player steps on potion, increase player health by 25
            if (JSON.stringify(this.potionTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1) {
              this.player.health += 25;
            }
            // If player steps on weapon, upgrade weapon
            if (JSON.stringify(this.weaponTile) == JSON.stringify(this.playerLocation)) {
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
                case 'Excalibur':
                  this.player.weapon = 'Ragnarok';
                  this.player.minAttack = 12;
                  this.player.maxAttack = 15;
                  break;
              }
            }
            this.determineCurrentRoom();
          }
          break;
        
        // Player pushes down arrow key
        case 40:
          this.paintFloorBehindPlayer();
          this.playerLocation[1] += 1;
          // If the space the player is moving into is a wall, move player back to left 1 space
          if (JSON.stringify(this.wallTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1 || this.playerLocation[1] == 64) {
            this.playerLocation[1] -= 1;
            this.paintPlayer();
          }
          // If the player hits a door and does not have the key, player cannot pass
          else if (JSON.stringify(this.doorLocations).indexOf(JSON.stringify(this.playerLocation)) !== -1 && this.player.hasKey == false) {
            this.playerLocation[1] -= 1;
            this.paintPlayer();
          }
          // If player collides with enemy
          else if (JSON.stringify(this.enemyTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1) {
            this.playerLocation[1] -= 1;
            this.paintPlayer();
            // Enemies do damage based on which level of the dungeon the player is on
            // Floor 0: 4-6 damage
            // Floor 1: 8-10 damage
            // Floor 2: 12-14 damage
            var enemyHit = Math.floor(Math.random() * (this.enemies[this.dungeonFloor].maxAttack - this.enemies[this.dungeonFloor].minAttack + 1)) + this.enemies[this.dungeonFloor].minAttack;
            this.player.health = this.player.health - enemyHit;
            // If the player dies, end the game
            if (this.player.health <= 0) {
              // Add Game Over functionality here
              this.gameMessage = "You Lose";
            }
            // Player hits between a range of damage * player level
            // Enemy health pool based on which level of the dungeon the player is on
            // Floor 0: 10
            // Floor 1: 50
            // Floor 2: 100
            var playerHit = Math.floor(Math.random() * (this.player.maxAttack * this.player.level - this.player.minAttack * this.player.level + 1)) + this.player.minAttack * this.player.level;
            this.enemies[this.dungeonFloor].health = this.enemies[this.dungeonFloor].health - playerHit;
            // If the enemy dies, move into his space and gain XP
            if (this.enemies[this.dungeonFloor].health <= 0) {
              this.player.xp += 10;
              if (this.player.xp >= 100) {
                this.player.level += 1;
                this.player.xp = 0;
              }
              this.paintFloorBehindPlayer();
              this.playerLocation[1] += 1;
              this.paintPlayer();
              // Reset enemy health so it is ready for the next enemy
              switch(this.dungeonFloor) {
                case 0: 
                  this.enemies[this.dungeonFloor].health = 10;
                  break;
                case 1:
                  this.enemies[this.dungeonFloor].health = 20;
                  break;
                case 2:
                  this.enemies[this.dungeonFloor].health = 50;
                  break;
              }
              
            }
          }
          // If player collides with boss enemy
          else if (this.dungeonFloor == 2 && JSON.stringify(this.bossLocation).indexOf(JSON.stringify(this.playerLocation)) !== -1) {
                this.playerLocation[1] -= 1;
                this.paintPlayer();
                var bossHit = Math.floor(Math.random() * (this.enemies[3].maxAttack - this.enemies[3].minAttack + 1)) + this.enemies[3].minAttack;
                this.player.health = this.player.health - bossHit;
                // If the player dies, end the game
                if (this.player.health <= 0) {
                  // Add Game Over functionality here
                  this.gameMessage = "You Lose";
                }
                // Player hits between a range of damage * player level
                // Enemy health pool based on which level of the dungeon the player is on
                // Floor 0: 10
                // Floor 1: 50
                // Floor 2: 100
                // Boss: 200
                var playerHit = Math.floor(Math.random() * (this.player.maxAttack * this.player.level - this.player.minAttack * this.player.level + 1)) + this.player.minAttack * this.player.level;
                this.enemies[3].health = this.enemies[3].health - playerHit;
                // If the enemy dies, move into his space and gain XP
                if (this.enemies[3].health <= 0) {
                  this.gameMessage = "You Win!";
                }
           }
          // If the space the player is moving into is not a wall or an enemy, move player into that new space 
          else {
            this.paintPlayer();
            // If player steps on key, add to player inventory
            if (JSON.stringify(this.keyTile) == JSON.stringify(this.playerLocation)) {
              this.player.hasKey = true;
            }
            // If player steps on stairs
            if (this.dungeonFloor < 2 && this.playerLocation[0] == this.stairBossTile[0] && this.playerLocation[1] == this.stairBossTile[1]) {
              this.changeFloor();
               // If player contacts boss enemy
            }
            // If player steps on potion, increase player health by 25
            if (JSON.stringify(this.potionTiles).indexOf(JSON.stringify(this.playerLocation)) !== -1) {
              this.player.health += 25;
            }
            // If player steps on weapon, upgrade weapon
            if (JSON.stringify(this.weaponTile) == JSON.stringify(this.playerLocation)) {
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
                case 'Excalibur':
                  this.player.weapon = 'Ragnarok';
                  this.player.minAttack = 12;
                  this.player.maxAttack = 15;
                  break;
              }
            }
            this.determineCurrentRoom();
          }
          break;
      }
  }

  determineCurrentRoom() {
    // Top row of rooms
    if (this.playerLocation[0] < 21 && this.playerLocation[1] < 21) {
      this.player.currentRoom = 1;
      this.overlayCtx.clearRect(0, 0, 860, 640);
      this.overlayCtx.fillStyle = "black";
      // Shadow room 2, 3, 4
      this.overlayCtx.fillRect(21 * 10, 0 * 10, 650, 210)
      // Shadow second and third rows
      this.overlayCtx.fillRect(0, 21 * 10, 860, 430);
      
    }
    else if (this.playerLocation[0] >= 21 && this.playerLocation[0] < 43 && this.playerLocation[1] < 21) {
      this.player.currentRoom = 2;
      this.overlayCtx.clearRect(0, 0, 860, 640);
      this.overlayCtx.fillStyle = "black";
      // Shadow room 1
      this.overlayCtx.fillRect(0, 0, 210, 220);
      // Shadow room 3, 4
      this.overlayCtx.fillRect(43 * 10, 0, 480, 220);
      // Shadow second and third rows
      this.overlayCtx.fillRect(0, 21 * 10, 860, 430);
    }
    else if (this.playerLocation[0] >= 43 && this.playerLocation[0] < 65 && this.playerLocation[1] < 21) {
      this.player.currentRoom = 3;
      this.overlayCtx.clearRect(0, 0, 860, 640);
      this.overlayCtx.fillStyle = "black";
      // Shadow room 1 and 2
      this.overlayCtx.fillRect(0, 0, 430, 230);
      // Shadow room 4
      this.overlayCtx.fillRect(65 * 10, 0, 220, 210);
      // Shadow second and third rows
      this.overlayCtx.fillRect(0, 21 * 10, 860, 430);
    }
    else if (this.playerLocation[0] >= 65 && this.playerLocation[1] < 21) {
      this.player.currentRoom = 4;
      this.overlayCtx.clearRect(0, 0, 860, 640);
      this.overlayCtx.fillStyle = "black";
      //Shadow room 1, 2, 3
      this.overlayCtx.fillRect(0, 0, 650, 210);
      // Shadow second and third rows
      this.overlayCtx.fillRect(0, 21 * 10, 860, 430);
    }
    // Second row of rooms
    else if (this.playerLocation[0] < 21 && this.playerLocation[1] >= 21 && this.playerLocation[1] < 43) {
      this.player.currentRoom = 5;
      this.overlayCtx.clearRect(0, 0, 860, 640);
      this.overlayCtx.fillStyle = "black";
      // Shadow rooms 6, 7, 8
      this.overlayCtx.fillRect(21 * 10, 21 * 10, 650, 220);
      // Shadow first and third rows
      this.overlayCtx.fillRect(0, 0, 860, 210);
      this.overlayCtx.fillRect(0, 43 * 10, 860, 210);
    }
    else if (this.playerLocation[0] >= 21 && this.playerLocation[0] < 43 && this.playerLocation[1] >= 21 && this.playerLocation[1] < 43) {
      this.player.currentRoom = 6;
      this.overlayCtx.clearRect(0, 0, 860, 640);
      this.overlayCtx.fillStyle = "black";
      // Shadow room 5, 7, and 8
      this.overlayCtx.fillRect(0, 21 * 10, 210, 220);
      this.overlayCtx.fillRect(43 * 10, 21 * 10, 430, 220);
      // Shadow first and third rows
      this.overlayCtx.fillRect(0, 0, 860, 210);
      this.overlayCtx.fillRect(0, 43 * 10, 860, 210);
    }
    else if (this.playerLocation[0] >= 43 && this.playerLocation[0] < 65 && this.playerLocation[1] >= 21 && this.playerLocation[1] < 43) {
      this.player.currentRoom = 7;
      this.overlayCtx.clearRect(0, 0, 860, 640);
      this.overlayCtx.fillStyle = "black";
      //Shadow room 5, 6, and 8
      this.overlayCtx.fillRect(0, 21 * 10, 430, 220);
      this.overlayCtx.fillRect(65 * 10, 21 * 10, 210, 220);
      // Shadow first and third rows
      this.overlayCtx.fillRect(0, 0, 860, 210);
      this.overlayCtx.fillRect(0, 43 * 10, 860, 210);
    }
    else if (this.playerLocation[0] >= 65 && this.playerLocation[1] >= 21 && this.playerLocation[1] < 43) {
      this.player.currentRoom = 8;
      this.overlayCtx.clearRect(0, 0, 860, 640);
      this.overlayCtx.fillStyle = "black";
      // Shadow rooms 5, 6, and 7
      this.overlayCtx.fillRect(0, 21 * 10, 650, 220);
      // Shadow first and third rows
      this.overlayCtx.fillRect(0, 0, 860, 210);
      this.overlayCtx.fillRect(0, 43 * 10, 860, 210);
    }
    // Third row of rooms
    else if (this.playerLocation[0] < 21 && this.playerLocation[1] >= 43 && this.playerLocation[1] < 64) {
      this.player.currentRoom = 9;
      this.overlayCtx.clearRect(0, 0, 860, 640);
      this.overlayCtx.fillStyle = "black";
      // Shadow rooms 10, 11, and 12
      this.overlayCtx.fillRect(21 * 10, 43 * 10, 650, 220);
      // Shadow first and second rows
      this.overlayCtx.fillRect(0, 0, 860, 430);
    }
    else if (this.playerLocation[0] >= 21 && this.playerLocation[0] < 43 && this.playerLocation[1] >= 43 && this.playerLocation[1] < 64) {
      this.player.currentRoom = 10;
      this.overlayCtx.clearRect(0, 0, 860, 640);
      this.overlayCtx.fillStyle = "black";
      // Shadow rooms 9, 11, and 12
      this.overlayCtx.fillRect(0, 43 * 10, 210, 210);
      this.overlayCtx.fillRect(43 * 10, 43 * 10, 430, 210);
      // Shadow first and second rows
      this.overlayCtx.fillRect(0, 0, 860, 430);
    }
    else if (this.playerLocation[0] >= 43 && this.playerLocation[0] < 65 && this.playerLocation[1] >= 43 && this.playerLocation[1] < 64) {
      this.player.currentRoom = 11;
      this.overlayCtx.clearRect(0, 0, 860, 640);
      this.overlayCtx.fillStyle = "black";
      // Shadow rooms 9, 10, and 12
      this.overlayCtx.fillRect(0, 43 * 10, 430, 210);
      this.overlayCtx.fillRect(65 * 10, 43 * 10, 210, 210)
      // Shadow first and second rows
      this.overlayCtx.fillRect(0, 0, 860, 430);
    }
    else if (this.playerLocation[0] >= 65 && this.playerLocation[1] > 42 && this.playerLocation[1] < 64) {
      this.player.currentRoom = 12;this.overlayCtx.clearRect(0, 0, 860, 640);
      this.overlayCtx.fillStyle = "black";
      // Shadow rooms 9, 10, and 11
      this.overlayCtx.fillRect(0, 43 * 10, 650, 210);
      // Shadow first and second rows
      this.overlayCtx.fillRect(0, 0, 860, 430);
    }
  }

  // Function that runs when player moves to another floor
  changeFloor() {
    this.player.hasKey = false;
    this.player.currentRoom = 1;
    this.dungeonFloor += 1;
    this.paintFloorBehindPlayer();
    this.placePlayer();
    this.placeEnemies();
    this.placeKey();
    this.placeWeapon();
    this.placePotions();
    this.buildDoors();
    this.placeStairsOrBoss();
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


/***** Cell painting functions *****/
  paintPlayer() {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
  }

  paintFloorBehindPlayer() {
    this.ctx.fillStyle = "gray";
    this.ctx.fillRect(this.playerLocation[0] * 10, this.playerLocation[1] * 10, 10, 10);
  }

  paintKey() {
    this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(this.keyTile[0] * 10, this.keyTile[1] * 10, 10, 10);
  }

  paintWeapon() {
    this.ctx.fillStyle = "silver";
    this.ctx.fillRect(this.weaponTile[0] * 10, this.weaponTile[1] * 10, 10, 10);
  }

  paintStairs() {
    this.ctx.fillStyle = "brown";
    this.ctx.fillRect(this.stairBossTile[0] * 10, this.stairBossTile[1] * 10, 10, 10);
  }

  paintBoss() {
    this.ctx.fillStyle = "pink";
    this.ctx.fillRect(this.stairBossTile[0] * 10, this.stairBossTile[1] * 10, 20, 20);
  }
/***** End cell painting functions *****/


/***** TODO *****/

  // - Add shadow functionality
  // - Skin dungeon with patterns rather than flat colors
  // - Add a legend
  // - Add instructions area
  // - Add story area with music
  // - Key still sometimes gets generated in locked room
  // - Hidden enemies are being generated, but not colored -- When an enemy is defeated splice it out of the enemyTiles array
  
/****************/


/***** Optional TODO *****/

  // - When player unlocks a door cell, remove all door cells and paint floor gray
  // - Further tuning of the damage model
  // - Improve game win functionality
  // - Improve game loss functionality

/*************************/



}

