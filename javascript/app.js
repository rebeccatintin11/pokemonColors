'use strict'

angular.module('myApp',[])
.controller('appCtrl', function($scope, $http){

  var nameList = [];
  $scope.imageList = [];

  $scope.getItemByColor = function(colorIndex){
    $http.get('http://pokeapi.co/api/v2/pokemon-color/'+colorIndex)
        .then(function(data){
          console.log(data.data);
          $scope.list = data.data;
          angular.forEach(data.data.pokemon_species, function(value, index){
            nameList.push(value.name);
          });
          console.log(nameList);

          angular.forEach(nameList, function(value, index){
            $http.get('http://pokeapi.co/api/v2/pokemon/'+value)
                .then(function(data){
                  console.log(data.data.sprites.front_default);
                  $scope.imageList.push({ name : value, url : data.data.sprites.front_default});
              });
          });
          console.log($scope.imageList);
      });
  };

});
