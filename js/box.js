class Box {
    y;
    x;
    available;
    htmlBox;
    weapon;
    player;

    constructor(x, y) {
            this.x = x;
            this.y = y;
            this.available = true;
            this.weapon = false;
            this.player = false;
            this.displayBox(this.x, this.y);
            this.htmlBox = $("." + this.y + "-" + this.x);
        }
        //affiche visuellement le tableau
    displayBox(x, y) {
        var board = $(".board");
        var content = "<div class= 'box " + y + "-" + x + "'></div>";
        board.append(content);
    }

    //permet d'ajouter une classe CSS dans le HTML
    addCssClass(classe) {
            this.htmlBox.addClass(classe);
        }
        //affiche visuellemnt les armes
    displayWeapon() {
            this.loadImage(this.weapon.image, 55, 55, this.htmlBox);
        }
        //affiche visuellement les joueurs
    displayPlayer() {
            this.loadImage(this.player.image, 50, 50, this.htmlBox);
        }
        //clique
    addOnClick(classe) {
            this.htmlBox.attr('onClick', classe);
        }
        //affiche l'image avec ces dimensions
    loadImage(path, width, height, target) {
            $('<img src="' + path + '">').load(function() {
                $(this).width(width).height(height).appendTo(target);
            });
        }
        //réinitialise l'affichage
    resetDisplay(action) {
        this.htmlBox.removeClass(action);
        this.htmlBox.prop("onclick", null).off("click");

    }

}