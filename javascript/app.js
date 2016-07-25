'use strict'

angular.module('myApp',[])
.controller('appCtrl', function($scope, $http){

  //set options
  $scope.colors = [{
      value: '1',
      label: 'Black'
    },
    {
      value: '2',
      label: 'Blue'
    },
    {
      value: '3',
      label: 'Brown'
    },
    {
      value: '4',
      label: 'Gray'
    },
    {
      value: '5',
      label: 'Green'
    },
    {
      value: '6',
      label: 'Pink'
    },
    {
      value: '7',
      label: 'Purple'
    },
    {
      value: '8',
      label: 'Red'
    },
    {
      value: '9',
      label: 'White'
    },
    {
      value: '10',
      label: 'Yellow'
    },
  ];

  $scope.getItemByColor = function(colorIndex){

    var nameList = [];
    $scope.imageList = [];

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
