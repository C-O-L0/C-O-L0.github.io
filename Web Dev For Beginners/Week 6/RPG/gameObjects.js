class GameObject {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.dead = false;
  }

  draw(ctx) {
    ctx.fillText(this.name, this.x, this.y);
  }
}

class Character extends GameObject {
  constructor(name, x, y, health, attackPower) {
    super(name, x, y);
    this.health = health;
    this.attackPower = attackPower;
    this.inventory = [];
  }

  attack(target) {
    target.health -= this.attackPower;
    if (target.health <= 0) {
      target.dead = true;
    }
  }
}

class NPC extends GameObject {
  constructor(name, x, y, dialogue) {
    super(name, x, y);
    this.dialogue = dialogue;
  }

  interact() {
    console.log(this.dialogue);
  }
}

class Enemy extends GameObject {
  constructor(name, x, y, health, attackPower) {
    super(name, x, y);
    this.health = health;
    this.attackPower = attackPower;
  }

  attack(target) {
    target.health -= this.attackPower;
    if (target.health <= 0) {
      target.dead = true;
    }
  }
}

class Boss extends Enemy {
  constructor(name, x, y, health, attackPower, specialAttackPower) {
    super(name, x, y, health, attackPower);
    this.specialAttackPower = specialAttackPower;
  }

  specialAttack(target) {
    target.health -= this.specialAttackPower;
    if (target.health <= 0) {
      target.dead = true;
    }
  }
}

class Item extends GameObject {
  constructor(name, x, y, effect) {
    super(name, x, y);
    this.effect = effect;
  }

  use(target) {
    this.effect(target);
  }
}

export { GameObject, Character, NPC, Enemy, Boss, Item };
