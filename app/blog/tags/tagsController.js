var tagsController = function ($scope, $routeParams, Page, $document, pagination, Global) {
    // determining page number and then redirecting if page number is invalid
	$scope.tagName = $routeParams.id;
	var postList = $scope.tagName in tags ? tags[$scope.tagName] : [];
	$scope.totalPages = ((Object.keys(postList).length + pagination.pageSize - 1) / pagination.pageSize) >> 0;
	$scope.location = '#!/blog/tags/' + $scope.tagName;
	
	if ($routeParams.pageNum === undefined)
		$scope.pageNum = 1;
	else
		$scope.pageNum = parseInt($routeParams.pageNum);
	
	setTimeout(function () {
		if (!$.isNumeric($scope.pageNum) || $scope.pageNum > $scope.totalPages)
			window.location.href = '#!/blog/tags/' + $scope.tagName;
	}, 0);
	
	Page.setTitle('Jeffrey Xiao - Blog');
    Global.removeActiveClasses($document);
    $document[0].getElementById('blog-label').classList.add('active');

    $scope.serialize = function (st) {
        return st.replace(/ /g, '-');
    };
	
	$(window).trigger('resize');
}

tagsController.$inject = ['$scope', '$routeParams', 'Page', '$document', 'pagination', 'Global'];

angular.module('site').controller('tagsController', tagsController);
