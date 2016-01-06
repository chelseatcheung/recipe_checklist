angular.module('recipe_ingredients', [])

.controller('LinksController', function ($scope, Links) {

  $scope.savedRecipes = [];
  
  $scope.getLinks = function(data) {
    $scope.recipes = [];
    $scope.links = [];
    $scope.ingredients = [];
    $scope.imgs = [];
    Links.getRecipes(data)
      .success(function(data) {
        for(var i = 0; i < data.matches.length; i++) {
          if($scope.recipes.indexOf(data.matches[i].recipeName) === -1) {
            $scope.recipes.push(data.matches[i].recipeName);
          } 
          if($scope.links.indexOf(data.matches[i].id)===-1) {
            $scope.links.push(data.matches[i].id);
          }
          if($scope.ingredients.indexOf(data.matches[i].ingredients)=== -1) {
            $scope.ingredients.push(data.matches[i].ingredients);
          }
          if($scope.ingredients.indexOf(data.matches[i].imageUrlsBySize) === -1) {
            $scope.imgs.push(data.matches[i].imageUrlsBySize);
          }      
        }

        for(var i=0; i < $scope.recipes.length; i++) {
          if($scope.recipes[i].length > 24) {
            $scope.recipes[i] = $scope.recipes[i].substr(0, 24)+ '...';
          }
        }
    
        $scope.repeatData = $scope.recipes.map(function(value, index) {
          return {
            recipes: value,
            links: $scope.links[index],
            ingredients: $scope.ingredients[index],
            img: $scope.imgs[index],
            saved: $scope.savedRecipes[index]
          }
        })
      
      });

    $scope.getIngredients = function(data) {
      $('.ingredient-list').html('');
      console.log('data is: ' + data.ingredients)
      for(var i =0; i < data.ingredients.length; i++) {
          $('.ingredient-list').append('<br>' + '<center>' + '<input type="checkbox" name="ingredient">' + data.ingredients[i] + '</center>' + '</br>');
      }
    }

    $scope.saveRecipes = function(data) {
      console.log('data is :' + JSON.stringify(data));
      var recipeName = data['recipes'].toLowerCase();
      var imgData = data['img'][90];
      var imgUrl = data['links'];
      var split = recipeName.split(' ');
      for(var i=0; i < split.length; i++) {
        split[i] = split[i][0].toUpperCase() + split[i].substr(1);
      }
      recipeName = split.join(' ');
      if(recipeName.length > 16) {
        recipeName = recipeName.substr(0, 16)
      }
      $scope.savedRecipes.push({image:imgData, url:imgUrl, name: recipeName});
    }

    $scope.deleteRecipe = function(data) {
      console.log('data is ', data)
      for(var i=0; i< $scope.savedRecipes.length; i++) {
        if($scope.savedRecipes[i].name === data.name) {
          console.log('in if statement')
          $scope.savedRecipes.splice(i,1)
        }
      }
    }
  }

  
})