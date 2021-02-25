class Game {
    boxs = [];
    player = [];
    area = [];
    droppedWeapon = [];
    indexOfCurrentPlayer;

    constructor(totalBox, wall) {
            this.createBoxs(totalBox);
            this.createWall(wall);
            this.attrWeapon();
            this.attrPlayers();
            this.aleaPlayer();
            this.roundPlayer();

        }
        //créer un tableau 2d avec des position x et y 
    createBoxs(totalBox) {
            for (let y = 0; y < totalBox; y++) {
                for (let x = 0; x < totalBox; x++) {
                    this.boxs.push(new Box(x, y));
                }
            }
            this.createWall();

        }
        //créer les obstale dans le tableau aléatoirement
    createWall(wall) {
            for (let index = 0; index < wall; index++) {

                var currentBox = this.boxs[Math.floor(Math.random() * this.boxs.length)];
                while (!currentBox.available) {
                    currentBox = this.boxs[Math.floor(Math.random() * this.boxs.length)];
                }


                currentBox.available = false;
                currentBox.addCssClass('wall');
            }

        }
        //attribue aléatoirement la classe CSS 'weapon' dans une case accecible 
    attrWeapon() {
            for (let index = 0; index < weapons.length; index++) {
                var currentBox = this.boxs[Math.floor(Math.random() * this.boxs.length)];
                while (!currentBox.available && !currentBox.weapon) {
                    currentBox = this.boxs[Math.floor(Math.random() * this.boxs.length)];
                }
                currentBox.weapon = weapons[index];
                currentBox.addCssClass('weapon');
                currentBox.displayWeapon(); // affiche les image des armes

            }
        }
        //attribue aleatoirement la classe CSS 'player' dans une case qui n'est ni un obstacle ni une arme ni un joueur
    attrPlayers() {

            for (let index = 0; index < players.length; index++) {
                var currentBox = this.boxs[Math.floor(Math.random() * this.boxs.length)];
                this.attrCanMove(2, currentBox);
                var check = this.area.find(e => e.player)
                while (currentBox.available == false || currentBox.weapon || currentBox.player || check !== undefined) {
                    currentBox = this.boxs[Math.floor(Math.random() * this.boxs.length)];
                }
                this.area = []
                this.player.push(new Player(currentBox.x, currentBox.y, players[index]));
                currentBox.player = players[index];
                currentBox.addCssClass('player');
                currentBox.displayPlayer();


            }


        }
        // choisit un joueur aléatoirement pour commencer    
    aleaPlayer() {
            if (Math.floor((Math.random() * 2) + 1) > 1) {
                this.currentPlayer = this.player[0];
                console.log(this.currentPlayer.name + " commence la partie");

            } else {
                this.currentPlayer = this.player[1];
                console.log(this.currentPlayer.name + "commence la partie");
            }
        }
        //gestion du tour par tour
    roundPlayer() {
            if (this.indexOfCurrentPlayer > 0) {
                this.indexOfCurrentPlayer = 0;
            } else {
                this.indexOfCurrentPlayer = 1;
            }
            this.currentPlayer = this.player[this.indexOfCurrentPlayer];
            console.log("c'est a " + this.currentPlayer.name + " de jouer");


            this.attrCanMove(4, this.currentPlayer);
            this.addActionOnArea("canMove");

        }
        // element.addOnClick('game.move(this)');
    attrCanMove(range, currentBox) {
        this.area = [];
        var wallUp = false;
        var wallDown = false;
        var wallRight = false;
        var wallLeft = false;
        for (let index = 1; index < range; index++) {

            var indexOfTarget = parseInt((currentBox.y + index) + "" + (currentBox.x));
            console.log(indexOfTarget);
            if (this.boxs[indexOfTarget] && this.boxs[indexOfTarget].available && wallDown === false && this.boxs[indexOfTarget].player === false) {
                this.area.push(this.boxs[indexOfTarget]);
            } else { wallDown = true }

            indexOfTarget = parseInt((currentBox.y - index) + "" + (currentBox.x));
            console.log(indexOfTarget)
            if (this.boxs[indexOfTarget] && this.boxs[indexOfTarget].available && wallUp === false && this.boxs[indexOfTarget].player === false) {
                this.area.push(this.boxs[indexOfTarget]);
            } else { wallUp = true }

            indexOfTarget = parseInt((currentBox.y) + "" + (currentBox.x + index));
            console.log(indexOfTarget)
            if (this.boxs[indexOfTarget] && this.boxs[indexOfTarget].available && wallRight === false && this.boxs[indexOfTarget].player === false) {
                this.area.push(this.boxs[indexOfTarget]);
            } else { wallRight = true }

            indexOfTarget = parseInt((currentBox.y) + "" + (currentBox.x - index));
            console.log(indexOfTarget)
            if (this.boxs[indexOfTarget] && this.boxs[indexOfTarget].available && wallLeft === false && this.boxs[indexOfTarget].player === false) {
                this.area.push(this.boxs[indexOfTarget]);
            } else { wallLeft = true }

        }
        return (true);


    }

    canMove(clickedBox) {
        //ETAPE 1 RECUPERE LES INDEX DE LA BOITE COURANTE ET DE LA BOITE CIBLE
        var currentPlayerBox = this.player[this.indexOfCurrentPlayer];
        currentPlayerBox = parseInt(currentPlayerBox.y + "" + currentPlayerBox.x);
        currentPlayerBox = this.boxs[currentPlayerBox];
        var clickedPlayerBox = clickedBox.classList[1];
        clickedPlayerBox = parseInt(clickedPlayerBox.replace("-", ""));
        clickedPlayerBox = this.boxs[clickedPlayerBox];
        //ETAPE 2 
        clickedPlayerBox.player = currentPlayerBox.player;
        currentPlayerBox.player = false;

        //ETAPE 3 VISUEL
        var playerImage = currentPlayerBox.htmlBox.children();
        currentPlayerBox.htmlBox.children().remove();
        clickedPlayerBox.htmlBox.append(playerImage);
        console.log(currentPlayerBox.htmlBox.children());
        this.player[this.indexOfCurrentPlayer].updatePosition(clickedPlayerBox.x, clickedPlayerBox.y);
        this.removeActionOnArea("canMove");
        this.roundPlayer();
    }
    addActionOnArea(action) {
        this.area.forEach(element => {
            element.addCssClass(action);
            element.addOnClick(`game.${action}(this)`);
        });
    }
    removeActionOnArea(action) {
        this.area.forEach(element => {
            element.resetDisplay(action);


        });
    }
    walkOnWeapon() {
        if (this.player.weapon) {
            this.player.droppedWeapon = this.player.weapon;
            this.player.weapon = this.boxs;
        }
    }
}