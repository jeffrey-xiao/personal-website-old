var contactController = function ($scope, Page, $document, Global) {
    Page.setTitle('Jeffrey Xiao - Contact');
    Global.removeActiveClasses($document);
    $document[0].getElementById('contact-label').classList.add('active');
    
	
	// constants for form sizes
	$scope.nameMaxLength = 50;
	$scope.emailMaxLength = 50;
	$scope.commentMaxLength = 500;
	
	$(window).trigger('resize');
};

contactController.$inject = ['$scope', 'Page', '$document', 'Global'];

angular.module('site').controller('contactController', contactController);