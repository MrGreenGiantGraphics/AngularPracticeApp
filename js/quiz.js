(function(){

	var app = angular.module('myQuiz',[]);

	/*Creating a controller*/
	/*Group together a series functions and assign them to a an div element*/
	/*$scope -> pass data from the controller to html*/
	/*$http -> Used to load data from external files like JSON*/
	/*$sce -> Strict contextual escaping. Allows us to inject HTML from JSON directly into HTML document*/
	/*Incase you want to minify angular and you dont specify, the minification can rename the parameters*/
	app.controller('QuizController', ['$scope','$http','$sce', function($scope,$http,$sce){
		$scope.score = 0;
		$scope.activeQuestion = -1; /*As Questions are zero based index. -1 means intro screen*/
		$scope.activeQuestionAnswered = 0;
		$scope.percentage = 0;

		/*$http get JSON file*/
		$http.get('quiz_data.json').then(function(quizData){
			$scope.myQuestions = quizData.data;
			$scope.totalQuestions = $scope.myQuestions.length;
		});/*$http get JSON file*/

		/*selectAnswer*/
		$scope.selectAnswer = function(qIndex,aIndex){

			var questionState = $scope.myQuestions[qIndex].questionState;/*Dont worry: value of questionState is set later, this is for the first time only*/
			if(questionState != 'answered'){
				$scope.myQuestions[qIndex].selectedAnswer = aIndex;
				var correctAnswer = $scope.myQuestions[qIndex].correct;
				if(aIndex === correctAnswer){
					$scope.myQuestions[qIndex].correctness = 'correct';
					$scope.score += 1;
				}else{
					$scope.myQuestions[qIndex].correctness = 'incorrect';
				}/*endif:aindex equals correctAnswer*/
				$scope.myQuestions[qIndex].questionState = 'answered';
			}/*endif:questionState*/	
		}/*end:selectAnswer*/
		
	}]);/*endController:QuizController*/

})();