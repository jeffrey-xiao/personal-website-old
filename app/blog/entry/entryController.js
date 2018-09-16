var entryController = function ($scope, $routeParams, Page, $sce, $document, Global) {
    // initializing disqus blog
    if (!Global.disqusInitialized) {
        var d = document, s = d.createElement('script');

        s.src = '//jeffrey-xiao.disqus.com/embed.js';

        s.setAttribute('data-timestamp', +new Date());
        d.head.appendChild(s);
		
        Global.disqusInitialized = true;
    }

    Page.setTitle('Jeffrey Xiao - Blog');
    Global.removeActiveClasses($document);
    $document[0].getElementById('blog-label').classList.add('active');

    $scope.title = $routeParams.id.substring(11).replace(/-/g," ");
    $scope.date = $routeParams.id.substring(0, 10);
    $scope.postTags = posts[$scope.date+" "+$scope.title];
    
    var postTitles = Object.keys(posts);
    postTitles.sort();
    
    var postIndex = postTitles.indexOf($scope.date+" "+$scope.title);
    
    if (postIndex > 0)
        $scope.prevPost = postTitles[postIndex - 1];
    if (postIndex < postTitles.length)
        $scope.nextPost = postTitles[postIndex + 1];
    
    $scope.getUrl = function (post) {
        return post.replace(/ /g, '-');
    }
    
    // requesting the relevant blog post
    var request = $.get('../app/posts/'+$routeParams.id+'.html');

    // injecting the associated HTML page with a disqus thread. Additionally refreshing MathJax and Disqus
    request.success(function (data) {
        $scope.body = data;
        $scope.$apply();
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        function showComments () {
            if (typeof DISQUS == 'undefined') {
                setTimeout(showComments, 500);
            } else {
                DISQUS.reset({
                    reload: true,
                    config: function () {
                        this.page.title = $routeParams.id;
                        this.page.url = "http://jeffrey-xiao.github.io/#!/blog/posts/"+$routeParams.id;
                        this.page.identifier = "http://jeffrey-xiao.github.io/#!/blog/posts/"+$routeParams.id;
                    }
                });
            }
        }
        setTimeout(showComments, 500);
    });

    // if there is no associated page, then output "Blog Not Found"
    request.error(function (jqXHR, textStatus, errorThrown) {
        $scope.title = "Blog Not Found";
        $scope.$apply();
    });
	
	$(window).trigger('resize');
};

entryController.$inject = ['$scope', '$routeParams', 'Page', '$sce', '$document', 'Global'];

angular.module('site').controller('entryController', entryController);
