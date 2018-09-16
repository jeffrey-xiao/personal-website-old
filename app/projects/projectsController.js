var projectsController = function ($scope, Page, $document, $sce, Global) {
    Page.setTitle('Jeffrey Xiao - Projects');
    Global.removeActiveClasses($document);
    $document[0].getElementById('projects-label').classList.add('active');

    $scope.projects = projects;
	
    $scope.to_trusted = function (html_code) {
        return $sce.trustAsHtml(html_code);
    };
	
	$(window).trigger('resize');
};

projectsController.$inject = ['$scope', 'Page', '$document', '$sce', 'Global'];

angular.module('site').controller('projectsController', projectsController);