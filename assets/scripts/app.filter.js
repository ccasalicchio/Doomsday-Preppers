app.angular.filter('aliasfilter', function () {
  return function(input, filter) {

    var result = [];
    angular.forEach(input, function (item) {
      angular.forEach(filter, function (isfiltered, type) {
        if (isfiltered && parseInt(type) === item.category) {
          result.push(item);
        }
      });
    });
    return result;
  };
});