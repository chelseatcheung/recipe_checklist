angular.module('services', [])

.factory('Links', function($http) {
  var getRecipes = function (data) {
    return $http({
      method:'POST',
      data: {info:data},
      url: '/callyumly'
    })
  };

  return {
    getRecipes: getRecipes
  }
})