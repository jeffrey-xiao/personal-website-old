var blogController = function ($scope, $routeParams, Page, $document, $location, pagination, Global) {
	// determining page number and then redirecting if page number is invalid
	$scope.totalPages = ((Object.keys(posts).length + pagination.pageSize - 1) / pagination.pageSize) >> 0;
	$scope.location = '#!/blog';
	
	if ($routeParams.pageNum === undefined)
		$scope.pageNum = 1;
	else
		$scope.pageNum = parseInt($routeParams.pageNum);
	
	setTimeout(function () {
		if (!$.isNumeric($scope.pageNum) || $scope.pageNum > $scope.totalPages)
			window.location.href = '#!/blog';
	}, 0);
	
    Page.setTitle('Jeffrey Xiao - Blog');
    Global.removeActiveClasses($document);
    $document[0].getElementById('blog-label').classList.add('active');
	
	$(window).trigger('resize');
};

blogController.$inject = ['$scope', '$routeParams', 'Page', '$document', '$location', 'pagination', 'Global'];

angular.module('site').controller('blogController', blogController);