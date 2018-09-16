angular.module('blogDirective', ['global'])
	.constant('pagination', {
		"pageSize": 5,
		"pageRange": 1
	})

	// directive for archive. If post is specified, that post will be italicized
	/* Prereq
	 *  - title
	 */
	.directive('archive', function() {
		return {
			restrict: 'E',
			controller: ['$scope', '$attrs', '$timeout', 'Global', function($scope, $attrs, $timeout, Global) {
				$scope.archive = Global.getArchive();
				$scope.numOfPosts = Global.getNumOfPosts();

				$scope.getArchiveKeys = function (obj) {
					return Object.keys(obj).sort().reverse();
				}

				$scope.getId = function (obj) {
					return obj.replace(/ |'/g, '-');
				}

				$scope.serialize = function (st) {
					return st.replace(/ /g, '-');
				};

				setTimeout(function() {
					$('li:has(ul)').addClass('collapsed').children('ul');
					if ($scope.title == undefined || $scope.title == "" || $scope.title == "Blog Not Found") {
						$('ul.hierarchy').children('li').removeClass('collapsed').addClass('expanded');
						var childTags = $('ul.hierarchy').children('li').children('ul');
						for (var i = 0; i < childTags.length; i++) {
							childTags.eq(i).css('max-height', '1000px');
							childTags.eq(i).css('opacity', '1');
						}
					} else {
						var id = "#"+$scope.title.replace(/ |'/g, '-');
						var element = $(id).parents('ul:not(.hierarchy)'); 
						$(id).parents('li').removeClass('collapsed').addClass('expanded');
						$(id).css('font-style', 'italic');
						for (var i = 0; i < element.length; i++) {
							element.eq(i).css('max-height', '1000px');
							element.eq(i).css('opacity', '1');
						}
					}
				}, 500);
			}],
			template:
				'<div class="section">' +
					'<h3 class="section-header-center">Archive</h3>' +
					'<div id="archive">' +
						'<ul class="hierarchy">' +
							'<li ng-repeat="year in getArchiveKeys(archive)" ng-init="monthMap=archive[year]">' +
								'{{year}} ({{numOfPosts[year]}})' +
								'<ul>' +
									'<li ng-repeat="month in getArchiveKeys(monthMap)" ng-init="blogList=monthMap[month]">' +
										'{{month | monthName}} ({{blogList.length}})' +
										'<ul>' +
											'<li ng-repeat="blog in blogList" id="{{getId(blog.substring(11))}}">' +
												'<a class="simplelink" href="#!blog/posts/{{serialize(blog)}}" style="font-weight:400; white-space: pre-line; text-indent: -20px; margin-left: 20px; display: inline-block; padding-bottom: 10px; line-height: 15px" ng-style="blog.substring(11) === post && {\'font-style\': \'italic\'}">{{blog.substring(11)}}</a>' +
											'</li>' +
										'</ul>' +
									'</li>' +
								'</ul>' +
							'</li>' +
						'</ul>' +
					'</div>' +
				'</div>',
			replace: true
		};
	})
	
	// directive for recent posts
	.directive('tags', function () {
		return {
			restrict: 'E',
			controller: ['$scope', 'Global', function ($scope, Global) {
				$scope.tags = Global.getTags();
				$scope.getTagKeys = function (obj) {
					var ret = Object.keys(obj);
					ret.sort(function(a, b) {
						return tags[b].length - tags[a].length;
					});
					return ret;
				}
			}],
			template:
				'<div class="section">' +
					'<h3 class="section-header-center">Tags</h3>' +
					'<div style="padding: 10px 10px">' +
						'<a ng-repeat="tag in getTagKeys(tags)" ng-init="taggedPosts=tags[tag]" class="simple-button" href="#!/blog/tags/{{tag}}" style="font-weight:400; margin: 2px 4px">' +
							'<i class="fa fa-tag"></i>&nbsp;{{tag}} ({{taggedPosts.length}})' +
						'</a>' +
					'</div>' +
				'</div>',
			replace: true
		};
	})
	
	// directive for recent posts
	.directive('recent', function () {
		return {
			restrict: 'E',
			controller: ['$scope', 'Global', function ($scope, Global) {
				var postTitles = Object.keys(Global.getPosts());
				$scope.recentPosts = postTitles.slice(0, Math.min(5, postTitles.length));
				$scope.serialize = function (st) {
					return st.replace(/ /g, '-');
				};
			}],
			template:
				'<div class="section">' +
					'<h3 class="section-header-center">Recent</h3>' +
					'<ul style="line-height: 1.5; display: inline-block; text-align: left">' +
						'<li ng-repeat="post in recentPosts"><a class="simplelink" href="#!/blog/posts/{{serialize(post)}}" style="font-weight:400; white-space: normal;">{{post.substring(10)}}</a></li>' +
					'</ul>' +
				'</div>',
			replace: true
		};
	})

	// directive for all posts. If tagName is specified, it will only display posts containing specified tag
	/* Prereq:
	 *  - tagName
	 *  - pageNum
	 *  - pageSize
	 */
	.directive('posts', ['pagination', function (pagination) {
		return {
			restrict: 'E',
			controller: ['$scope', 'Global', function ($scope, Global) {
				$scope.desc = Global.getDesc();
				$scope.serialize = function (st) {
					return st.replace(/ /g, '-');
				};

				if ($scope.tagName == undefined) {
					$scope.posts = Global.getPosts();
					$scope.postList = Object.keys( Global.getPosts());
					$scope.postList.sort();
					$scope.postList.reverse();

					$scope.postList = $scope.postList.slice(($scope.pageNum - 1) * pagination.pageSize, $scope.pageNum * pagination.pageSize);
				} else {
					$scope.posts =  Global.getPosts();
					$scope.postList = $scope.tagName in  Global.getTags() ?  Global.getTags()[$scope.tagName] : [];
					$scope.postList.sort();
					$scope.postList.reverse();

					$scope.postList = $scope.postList.slice(($scope.pageNum - 1) * pagination.pageSize, $scope.pageNum * pagination.pageSize);
				}
			}],
			template:
				'<div class="section" ng-repeat="post in postList">'+
					'<div class="section-header-left" style="width: 100%">'+
						'<a class="simplelink simple-header" href="#!/blog/posts/{{serialize(post)}}">{{post.substring(10)}}</a>'+
					'</div>'+

					'{{desc[post]}}...'+

					'<h5><i class="fa fa-calendar emphasis-no-underline"></i> {{post.substring(0,10) | date: \'mediumDate\'}}</h5>'+

					'<h5>'+
						'<i class="fa fa-tags emphasis-no-underline"></i>'+
						'<span ng-repeat="tag in posts[post]">'+
							'<a class="simplelink" href="#!/blog/tags/{{tag}}" style="font-weight:400;">{{tag}}</a>{{$last ? \'\':\' / \'}}'+
						'</span>'+
					'</h5>'+
					'<a class="simple-button" href="#!/blog/posts/{{serialize(post)}}" style="white-space:normal; float:right">Read more</a>'+
					'<div class="clear"></div>'+
				'</div>',
			replace: true
		};
	}])

	// directive for pagination in blog
	/* Prereq:
	 *  - totalPages
	 *  - pageRange
	 *  - pageSize
	 *  - pageNum
	 *  - location
	 */
	.directive('pagination', ['pagination', function (pagination) {
		return {
			restrict: 'E',
			scope: true,
			controller: ['$scope', '$attrs', function ($scope, $attrs) {
				$scope.pages = [];
				var min, max;

				min = 1;
				max = Math.min($scope.totalPages, 1 + pagination.pageRange);
				for (var i = min; i <= max; i++)
					$scope.pages.push("" + i);

				if ($scope.pageNum - pagination.pageRange > 2 + pagination.pageRange)
					$scope.pages.push("...");

				min = Math.max(2 + pagination.pageRange, $scope.pageNum - pagination.pageRange);
				max = Math.min($scope.totalPages, $scope.pageNum + pagination.pageRange);
				for (var i = min; i <= max; i++)
					$scope.pages.push(i);

				if ($scope.pageNum + pagination.pageRange < $scope.totalPages - pagination.pageRange - 1)
					$scope.pages.push("...");

				min = Math.max($scope.pageNum + pagination.pageRange + 1, $scope.totalPages - pagination.pageRange);
				max = $scope.totalPages;
				for (var i = min; i <= max; i++)
					$scope.pages.push("" + i);
			}],
			template:
				'<ul class="index">' +
					'<li>' +
						'<a ng-if="pageNum != 1" ng-href="{{location}}/{{pageNum - 1}}">«</a>'+
						'<a ng-if="pageNum == 1" class="disabled">«</a>'+
					'</li>' + 
					'<li ng-repeat="page in pages track by $index" class="page-num">' +
						'<a ng-if="pageNum == page" ng-href="{{location}}/{{page}}" class="active">{{page}}</a>'+
						'<a ng-if="pageNum != page && pageNum != \'...\'" ng-href="{{location}}/{{page}}">{{page}}</a>'+
						'<a ng-if="pageNum == \'...\'" class="disabled">{{page}}</a>'+
					'</li>' + 
					'<li>' +
						'<a ng-if="pageNum != totalPages" ng-href="{{location}}/{{pageNum + 1}}">»</a>'+
						'<a ng-if="pageNum == totalPages" class="disabled">»</a>'+
					'</li>' + 
				'</ul>',
			replace: true
		}
	}]);