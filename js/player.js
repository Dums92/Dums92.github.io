const players = [{
        name: 'bowser',
        hp: 100,
        weapon: {
            damage: 15,
            image: "img/epeeDeFer.png",
            name: "epee de fer",
        },
        image: 'img/bowser.png',
    },
    {
        name: 'peach',
        hp: 100,
        weapon: {
            damage: 15,
            image: "img/epeeDeFer.png",
            name: "epee de fer",
        },
        image: 'img/peach.png',
    }
]

class Player {
    x;
    y;
    image;
    name;
    weapon;
    hp;
    damage;
    attack;
    defend;
    constructor(x, y, data, hp, damage) {
        this.x = x;
        this.y = y;
        this.image = data.image;
        this.name = data.name;
        this.weapon = data.weapon;
        this.hp = hp;
        this.damage = damage;
        this.attack = false;
        this.defend = false;


    }

    attrData() {
        if (this.name == "Peach") {
            this.htmlBox = {
                hp: document.getElementById("hpPeach"),
                weapon: document.getElementById("weaponPeach"),
                damage: document.getElementById("damagePeach"),

            }
        }
        if (this.name == "Bowser") {
            this.htmlBox = {
                hp: document.getElementById("hpBowser"),
                weapon: document.getElementById("weaponBowser"),
                damage: document.getElementById("damageBowser"),

            }
        }
    }
    updateInfo() {
        this.hp = hp;
        this.damage = damage;
        this.weapon = weapon;
    }
    updatePosition(x, y) {
        this.x = x;
        this.y = y;

    }


}