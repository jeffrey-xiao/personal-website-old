var homeController = function ($scope, Page, $document, $sce, Global) {
	Page.setTitle('Jeffrey Xiao - Home');
	Global.removeActiveClasses($document);
	
	$document[0].getElementById('home-label').classList.add('active');

	$scope.project = projects[0];
	$scope.blogTitle = Object.keys(posts)[0];
	$scope.blogDesc = desc[$scope.blogTitle];

	$scope.serialize = function (st) {
		return st.replace(/ /g, '-');
	};

	$scope.to_trusted = function (html_code) {
		return $sce.trustAsHtml(html_code);
	};
	
	$(window).trigger('resize');
};

homeController.$inject = ['$scope', 'Page', '$document', '$sce', 'Global'];

angular.module('site').controller('homeController', homeController);
								  
