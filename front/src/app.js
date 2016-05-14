/*global ko */

var TicTacToe = TicTacToe || {};

TicTacToe.Game = function(){
	'use strict';	

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

		// winnableCombinations = function(){
		// 	return [
		// 	[1,2,3],
		// 	[4,5,6],
		// 	[7,8,9],
		// 	[1,4,7],
		// 	[2,5,8],
		// 	[3,6,9],
		// 	[1,5,9],
		// 	[3,5,7]
		// 	];
		// },

		isInCombination = function(combination, squareValues){
			for(var c = 0; c < combination.length; c++){
					if(squareValues.indexOf(combination[c]) === -1)
						return false;
				}

			return true;
		},

		weHaveAWinner = function(squares){
			var winnableCombinations = [
				[1,2,3],
				[4,5,6],
				[7,8,9],
				[1,4,7],
				[2,5,8],
				[3,6,9],
				[1,5,9],
				[3,5,7]
			];

			for(var i = 0; i< winnableCombinations.length; i++){
				var combination = winnableCombinations[i];
				if(isInCombination(combination, squares)) {
						return true;
					}
				}				
			return false;
		},

		whoWon = function(squares){
			var xCombinations = [],
				oCombinations = [];

			for(var i=0; i< squares.length; i++){
				if(squares[i].type() === 'X'){
					xCombinations.push(squares[i].position);
				}
				else if(squares[i].type() === 'O'){{
					oCombinations.push(squares[i].position);
					}				
				}
			}
			debugger;
			if(weHaveAWinner(xCombinations)){
				return "X";
			}
			else if(weHaveAWinner(oCombinations)){
				return "O";
			}

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
		self.numberOfRows = ko.observable(3);

		game.getInitialSquares().forEach(function(squareData){
			self.squares.push(new Square(squareData));
		});
		
		self.squareClick = function(square){
			if(square.wasClicked()) {
				return;
			}
			if(self.gameOver()){
				alert('The game is over');
				return;
			}


			square.wasClicked(true);
			if(self.isXmove()){
				square.type('X');
				square.imgSrc('images/x.jpg');
				self.isXmove(false);
			}
			else{
				square.type('O');
				square.imgSrc('images/O.svg');
				self.isXmove(true);
			}

			var winner = game.whoWon(self.squares());
			if(winner === ''){
				return;
			}
			else{
				self.gameOver(true);
				return window.alert(winner + ' just won! The game is over.');
			}					
		};
	};

	ko.applyBindings(new ViewModel());

}();