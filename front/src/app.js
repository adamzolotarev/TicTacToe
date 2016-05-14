/*global ko */

var TicTacToe = TicTacToe || {};

TicTacToe.Game = function(){
	'use strict';	
	// var initialSquares = [{
	// 	symbol: , //x/0/empty
	// 	position: 0,
	// }];

	var Square = function(data) {					
		this.imgSrc = ko.observable(data.imgSrc);		
		this.wasClicked = ko.observable(false);
		this.type = ko.observable(data.type);
		this.position = data.position;
		this.row =  ko.computed(function(){
			if(this.position === 1 || this.position === 2 ||  this.position === 3){
				return 1;
			}
			else if(this.position === 4 || this.position === 5 ||  this.position === 6){
				return 2;
			}
			else if(this.position === 7 || this.position === 8 ||  this.position === 9){
				return 3;
			}
			return 0;
			}, this);
	};

	var game = (function(){
		var getInitialSquares = function(){
			var squares = [];
			for (var i = 1; i < 10; i++) {
				squares.push(new Square(
					{
						imgSrc:'',
						wasClicked: false,
						position: i,
						type:''
					}));
				}
			return squares;
		},

		whoWon = function(){
			return '';
		};

		return {
			getInitialSquares: getInitialSquares,
			whoWon: whoWon
		};
	})();

	var ViewModel = function(){
		var self = this;

		self.squares = ko.observableArray([]);
		self.isXmove = ko.observable(true);
		self.gameOver = ko.observable(false);
		self.winner = ko.computed(function(){
			var winner = game.whoWon();
			if(winner === ''){
				return;
			}
			else {
				return 'Someone just won! The game is over.';
			}			
		}, this);		

		game.getInitialSquares().forEach(function(squareData){
			self.squares.push(new Square(squareData));
		});
		
		self.squareClick = function(square){
			if(square.wasClicked()) {
				return;
			}

			square.wasClicked(true);
			if(self.isXmove()){
				square.type('X');
				square.imgSrc('images/x.jpg');
				self.isXmove(false);
			}
			else{
				square.type('0');
				square.imgSrc('images/O.svg');
				self.isXmove(true);
			}			
		};
	};

	ko.applyBindings(new ViewModel());

}();