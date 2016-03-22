angular.module('getContentFilterApp', [])
.filter('getContent', function() {
  return function(input) {
    //May need to take into account the possibility that sliders may display outside the "content" div
    //in later iterations
    var startPattern = /<div[^>]*\sclass="[A-Za-z0-9-_]*\s+content">/,
      endPattern = /<\/div>/g,
      countPattern = /<div\s/g;
    if(angular.isString(input)) {
      var startIndex = startPattern.exec(input).index,
      fromContentStart = input.slice(startIndex);
    }
  }
});
