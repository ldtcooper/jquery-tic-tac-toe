const Game = require('./game.js');

class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $('li').on('click', event => {
      const $li = $(event.currentTarget);
      try {
        this.makeMove($li);
      } catch(err) {
        alert(`${err.msg}`);
      }

    });
    $('li').on('click', event => {
      if (this.game.isOver()) {
        let gameWinner = this.game.winner();
        $('figure')
        .append(`<figcaption>${this.game.winner()} wins!</figcaption>`);

        $("li").css('background', 'white').css('color', 'red');

        $(`[player="${this.game.winner()}"]`)
        .css('background', 'green').css('color', 'white');

        $("li").off("click");
        $("li").off("mouseenter mouseleave");
      }
    });
  }

  makeMove($square) {
    $square.text(this.game.currentPlayer);
    $square.attr('player', `${this.game.currentPlayer}`);
    this.game.playMove($square.data('pos'));
    $square.css('background', 'white');
    $square.off("mouseenter mouseleave");
  }

  setupBoard() {
    const $ul = $('<ul></ul>');
    $('figure').append($ul);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let $li = $('<li></li>');
        $li.data('pos', [i, j]);
        $ul.append($li);
      }
    }

    this.hoverColorChange();
  }

  hoverColorChange() {
    $('li').hover(
      function() {
        $( this ).css('background', 'yellow');
      },
      function() {
        $( this ).css('background', 'grey');
      }
    );
  }

}

module.exports = View;
