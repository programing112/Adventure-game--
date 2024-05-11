import inquirer from "inquirer";

class Hero {
  name: string;
  health = 100;

  constructor(name: string) {
    this.name = name;
  }

  decreaseHealth() {
    this.health -= 20;
  }

  increaseHealth() {
    this.health = 100;
  }
}

class Enemy {
  name: string;
  health = 100;

  constructor(name: string) {
    this.name = name;
  }

  decreaseHealth() {
    this.health -= 20;
  }

  increaseHealth() {
    this.health = 100;
  }
}

async function main() {
  const { HeroName } = await inquirer.prompt([
    {
      type: "input",
      name: "HeroName",
      message: "Enter your hero name",
    },
  ]);

  const { enemyType } = await inquirer.prompt([
    {
      type: "list",
      name: "enemyType",
      choices: ["alien", "witch", "zombie"],
      message: "Select the enemy you fight with:",
    },
  ]);

  const hero = new Hero(HeroName);
  const enemy = new Enemy(enemyType);

  console.log(`${enemy.name} vs ${hero.name}`);

  while (hero.health > 0 && enemy.health > 0) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        choices: ["attack", "defend", "range target", "run"],
        message: "Choose the attack type to perform action",
      },
    ]);

    switch (action) {
      case "attack":
        const randomNum = Math.random();
        if (randomNum > 0.5) {
          hero.decreaseHealth();
          console.log(`${hero.name} health: ${hero.health}`);
          console.log(`${enemy.name} health: ${enemy.health}`);
          if (hero.health <= 0) {
            console.log("You lost! Try again.");
            return;
          }
        } else {
          enemy.decreaseHealth();
          console.log(`${hero.name} health: ${hero.health}`);
          console.log(`${enemy.name} health: ${enemy.health}`);
          if (enemy.health <= 0) {
            console.log("Congratulations! You win.");
            return;
          }
        }
        break;
    }
  }
}

main();
