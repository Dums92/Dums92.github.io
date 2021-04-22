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
    line;
    column;
    image;
    name;
    weapon;
    hp;
    damage;
    isProtect;
    constructor(line, column, data, hp, damage, idPlayer) {
        this.line = line;
        this.column = column;
        this.image = data.image;
        this.name = data.name;
        this.weapon = data.weapon;
        this.hp = hp;
        this.damage = damage;
        this.htmlBox = $(`.${idPlayer}`);
        this.isProtect = false;
        this.insertDataToDisplay();
    }

    updateInfo(hp) {
        this.hp = hp;

    }

    insertDataToDisplay() {
        var context = this.htmlBox
        $('.hp', context).text(this.hp + ' hp')
        $('.weapon', context).text(this.weapon.name)
        $('.damage', context).text(this.weapon.damage + ' points de dégâts')
        console.log(this);
        if (this.isProtect == true) {
            $('.defend', context).text('je me défend')
        } else {
            $('.defend', context).text(' ')
        }

    }

    updatePosition(line, column) {
        this.line = line;
        this.column = column;
    }


    //displayWeaponOfCard() {}
}