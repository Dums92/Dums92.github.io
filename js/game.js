class Game {
    coord = []
    boxs = [];
    player = [];
    area = [];
    droppedWeapon = [];
    indexOfCurrentPlayer;
    indexOfTarget;
    mustFight = false;

    constructor(totalBox, wall) {
            this.createBoxs(totalBox);
            this.createWall(wall);
            this.attrWeapon();
            this.attrPlayers();
            // this.aleaPlayer();
            this.roundPlayer();
        }
        //créer un tableau 2d avec des position x et y
    createBoxs(totalBox) {
        for (let line = 0; line < totalBox; line++) {
            for (let column = 0; column < totalBox; column++) {
                var newBox = new Box(line, column)
                this.boxs.push(newBox);
                this.coord.push([line, column])
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
            currentBox.addCssClass("wall");
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
                currentBox.addCssClass("weapon");
                currentBox.displayWeapon(); // affiche les image des armes
            }
        }
        //attribue aleatoirement la classe CSS 'player' dans une case qui n'est ni un obstacle ni une arme ni un joueur
    attrPlayers() {
        for (let index = 0; index < players.length; index++) {
            var currentBox = this.boxs[Math.floor(Math.random() * this.boxs.length)];

            var check = this.area.find((e) => e.player);
            while (!currentBox.available ||
                currentBox.weapon ||
                currentBox.player ||
                check !== undefined &&
                this.attrCanMove(1, this.player[this.indexOfCurrentPlayer])) {
                currentBox = this.boxs[Math.floor(Math.random() * this.boxs.length)];
            } {
                this.area = [];
                this.player.push(
                    new Player(currentBox.line, currentBox.column, players[index], players[index].hp, null, index)
                );
                currentBox.player = players[index];
                currentBox.addCssClass("player");
                currentBox.displayPlayer();



            }
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
            var mustFight = this.attrCanMove(1, this.currentPlayer);

            var checkForOpponentForFight = this.area.find((e) => e.player !== false);
            if (checkForOpponentForFight) {
                this.mustFight = mustFight;
                console.log("I MUST FIGHT");
                this.displayFight();
                this.currentPlayer;
            } else {
                this.attrCanMove(3, this.currentPlayer);
                this.addActionOnArea("canMove");
            }

        }
        // element.addOnClick('game.move(this)');
        /*renvoit un tableau qui contient la liste des cases sur lesquelles 
                          je peux bouger 
                              
                          range : int = nb de case de déplacement voulut 
                          current : objet box de reférence pour examiner les deplacements
                          */

    //renvoi un tableau de case suivant certaine regles
    attrCanMove(range, currentBox) {
            this.area = []; // la valeur de retour
            var wallUp = false;
            var wallDown = false;
            var wallRight = false;
            var wallLeft = false;
            for (let index = 1; index <= range; index++) {
                // 0 parcequ'on peux 1 case
                // on regarde a index + 1 a droite en haut a gauche en bas par rapport a l'objet currentbox
                var indexOfTarget = parseInt(
                    currentBox.line + index + "" + currentBox.column
                );
                if (currentBox.line + index >= 10) {
                    this.removeActionOnArea("canMove");
                } else {
                    if (
                        this.boxs[indexOfTarget] &&
                        this.boxs[indexOfTarget].available &&
                        wallDown === false
                    ) {
                        this.area.push(this.boxs[indexOfTarget]);
                    } else {
                        wallDown = true;
                    }
                }

                indexOfTarget = parseInt(
                    currentBox.line - index + "" + currentBox.column
                );
                if (currentBox.line - index <= -1) {
                    this.removeActionOnArea("canMove");
                } else {
                    if (
                        this.boxs[indexOfTarget] &&
                        this.boxs[indexOfTarget].available &&
                        wallUp === false
                    ) {
                        this.area.push(this.boxs[indexOfTarget]);

                        if (this.boxs[indexOfTarget].player === false) {}
                    } else {
                        wallUp = true;
                    }
                }
                indexOfTarget = parseInt(
                    currentBox.line + "" + (currentBox.column + index)
                );
                if (currentBox.column + index >= 10) {
                    this.removeActionOnArea("canMove");
                } else {
                    if (
                        this.boxs[indexOfTarget] &&
                        this.boxs[indexOfTarget].available &&
                        wallRight === false
                    ) {
                        this.area.push(this.boxs[indexOfTarget]);
                    } else {
                        wallRight = true;
                    }
                }
                indexOfTarget = parseInt(
                    currentBox.line + "" + (currentBox.column - index)
                );
                if (currentBox.column - index <= -1) {
                    this.removeActionOnArea("canMove");
                } else {
                    if (
                        this.boxs[indexOfTarget] &&
                        this.boxs[indexOfTarget].available &&
                        wallLeft === false
                    ) {
                        this.area.push(this.boxs[indexOfTarget]);
                        if (this.boxs[indexOfTarget].player === false) {}
                    } else {
                        wallLeft = true;
                    }
                }
            }
            return false;
        }
        //TODO:renaming -> u need to be more revelent /!\ u not paid at the caractere


    //deplace le joueur
    canMove(clickedBoxDom) {
        var targetBox = this.boxs[
            parseInt(clickedBoxDom.classList[1].replace("-", ""))
        ];
        if (targetBox.weapon) {
            var weaponImage = $(".weaponImg", targetBox.htmlBox);
            weaponImage.hide();
            weaponImage.attr("src", this.currentPlayer.weapon.image);
            this.pickWeapon(targetBox.weapon, this.currentPlayer, targetBox);
        }
        //ETAPE 1 RECUPERE LES INDEX DE LA BOITE COURANTE ET DE LA BOITE CIBLE
        var originBox = this.player[this.indexOfCurrentPlayer];
        originBox = this.boxs[parseInt(originBox.line + "" + originBox.column)];

        //ETAPE 2
        targetBox.player = this.player[this.indexOfCurrentPlayer];
        originBox.player = false;

        //ETAPE 3 VISUEL
        var playerImage = $("img:not([class*=weaponImg])", originBox.htmlBox);
        targetBox.htmlBox.append(playerImage);
        this.currentPlayer.updatePosition(targetBox.line, targetBox.column);
        originBox.displayWeapon();
        this.removeActionOnArea("canMove");

        this.roundPlayer();
        /*         if (this.mustFight == true) {    
                       
                    } */
    }
    addActionOnArea(action) {
        this.area.forEach((element) => {
            if (!element.player) {
                element.addCssClass(action);
                element.addOnClick(`game.${action}(this)`); // CHECK MENTOR PLS !!!!!!!!
            }

        });
    }
    removeActionOnArea(action) {
        this.area.forEach((element) => {
            element.resetDisplay(action);
        });
    }
    pickWeapon(newWeapon, player, box) {
        console.log(player)
        var playerWeapon = player.weapon;
        player.weapon = newWeapon;
        box.weapon = playerWeapon;
        player.insertDataToDisplay()
    }
    displayFight() {

        var buttonSelector = $(`.${this.indexOfCurrentPlayer}>.hidden`)
        buttonSelector.removeClass("hidden");
        var buttonSelectorDefend = buttonSelector.children().first();
        var buttonSelectorAttack = buttonSelector.children().last();
        buttonSelectorDefend.attr("Onclick", "game.defend(this)");
        buttonSelectorAttack.attr("Onclick", "game.attack(this)");



    }
    attack(that) {

        $(that).parent().addClass('hidden');

        //chercher le joueur qui ne joue pas

        var source = this.player[this.indexOfCurrentPlayer];
        var target = this.player[this.indexOfCurrentPlayer === 0 ? 0 : 1];
        var dmg;

        if (target.isProtect) {
            dmg = target.weapon.damage / 2;
        } else {
            dmg = source.weapon.damage;
        }
        target.hp -= dmg;
        this.roundPlayer();
        console.log("sourceHp,", source.hp)
        console.log("targetHp,", target.hp)

        if (target.hp <= 0) {
            alert(target.name + " est mort ")
        }

        target.isProtect = false;
        source.insertDataToDisplay();
        target.insertDataToDisplay();
    }
    defend(that) {
        $(that).parent().addClass('hidden');

        var target = this.player[this.indexOfTarget];
        var source = this.player[this.indexOfCurrentPlayer];

        source.isProtect = true;
        this.roundPlayer();
        source.insertDataToDisplay();
        target.insertDataToDisplay();
    }
}