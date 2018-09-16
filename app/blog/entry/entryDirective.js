angular.module('entryDirective', [])
	// directive for captionedImages
	.directive('captionedImage', function () {
		return {
			restrict: 'E',
			transclude: true,
			scope: true,
			controller: ['$scope', '$attrs', function ($scope, $attrs) {
				$scope.src = $attrs.src;
				$scope.maxHeight = $attrs.maxHeight;
				$scope.maxWidth = $attrs.maxWidth;

				if ($scope.maxHeight == undefined)
					$scope.maxHeight = "100%";
				if ($scope.maxWidth == undefined)
					$scope.maxWidth = "100%";
			}],
			link: function($scope, $el, $attrs, $ctrl, $transclude) {
				$el.find('.caption').append($transclude());
				$el.removeAttr('src');
				$el.removeAttr('max-height');
			},
			template:
				'<div class="img-holder">'+
					'<div class = "img-container">'+
						'<img src="{{src}}" class="img-responsive" style = "max-height:{{maxHeight}}; max-width:{{maxWidth}};">'+
						'<div class = "caption">'+
						'</div>'+
					'</div>'+
				'</div>',
			replace: true
		};
	})

	// directive for compiling html files (I.E. posts)
	.directive('bindHtmlCompile', ['$compile', function ($compile) {
		return {
			restrict: 'A',
			link: function ($scope, $element, $attrs) {
				$scope.$watch(function () {
					return $scope.$eval($attrs.bindHtmlCompile);
				}, function (value) {
					$element.html(value);
					$compile($element.contents())($scope);
				});
			}
		};
	}])

	// directive for code snippets
	.directive('codeSnippet', function () {
		return {
			restrict: 'E',
			scope: true,
			transclude: true,
			controller: ['$scope', '$element', function ($scope, $element) {
				$scope.rawCode = "asd";
				$scope.copyClicked = function () {
					$element.find('textarea').select();
					document.execCommand("copy");
				}
			}],
			link: function ($scope, $el, $attrs, $ctrl, $transclude) {
				var html = $el.find('code').children().html();
				$scope.rawCode = html;
				if ($attrs.language == 'cpp') {
					html = highlight_cpp(html);
					$scope.lang = "C++";
				} else if ($attrs.language == 'python') {
					html = highlight_python(html);
					$scope.lang = "Python";
				} else if ($attrs.language == 'java') {
					html = highlight_java(html);
					$scope.lang = "Java";
				} else if ($attrs.language == 'javascript') {
					html = highlight_javascript(html);
					$scope.lang = "Javascript";
				} else {
					html = highlight_default(html);
				}
				$el.find('code').children().html(html);
				$el.removeAttr('language');
			},
			template:
					'<div class="code-snippet">' +
						'<b ng-if="lang != undefined" style="margin-top:-5px; display:block">Language: {{lang}}</b>' +
						'<pre>' +
							'<code ng-transclude>' +
							'</code>' +
						'</pre>' +
						'<button ng-click="copyClicked()">Copy</button>' +
						'<textarea ng-model="rawCode"></textarea>' +
					'</div>',
			replace: true
		};
	});

// keywords for the different languages
var keyWords_cpp = ['unordered_multiset', 'unordered_multimap', 'initializer_list', 'reinterpret_cast', 'istringstream', 'ostringstream', 'unordered_set', 'unordered_map', 'static_assert', 'stringstream', 'dynamic_cast', 'thread_local', 'static_cast', 'shared_ptr', 'unique_ptr', 'const_cast', 'constexpr', 'namespace', 'protected', 'auto_ptr', 'multiset', 'multimap', 'isxdigit', 'snprintf', 'vfprintf', 'vsprintf', 'char16_t', 'char32_t', 'continue', 'decltype', 'explicit', 'noexcept', 'operator', 'register', 'requires', 'template', 'typename', 'unsigned', 'volatile', 'fprintf', 'isalnum', 'isalpha', 'iscntrl', 'isdigit', 'isgraph', 'islower', 'isprint', 'ispunct', 'isspace', 'isupper', 'tolower', 'toupper', 'realloc', 'putchar', 'sprintf', 'strcspn', 'strncat', 'strncmp', 'strncpy', 'strpbrk', 'strrchr', 'vprintf', 'alignof', 'concept', 'default', 'mutable', 'nullptr', 'private', 'typedef', 'virtual', 'wchar_t', 'string', 'stdout', 'stderr', 'vector', 'bitset', 'calloc', 'fscanf', 'malloc', 'memchr', 'memcmp', 'memcpy', 'memset', 'printf', 'sscanf', 'strcat', 'strchr', 'strcmp', 'strcpy', 'strlen', 'strspn', 'strstr', 'lignas', 'and_eq', 'bitand', 'delete', 'double', 'export', 'extern', 'friend', 'inline', 'not_eq', 'public', 'return', 'signed', 'sizeof', 'static', 'struct', 'switch', 'typeid', 'xor_eq', 'stdin', 'deque', 'queue', 'stack', 'array', 'abort', 'atan2', 'floor', 'fputs', 'frexp', 'ldexp', 'log10', 'scanf', 'bitor', 'break', 'catch', 'class', 'compl', 'const', 'false', 'float', 'or_eq', 'short', 'throw', 'union', 'using', 'while', 'cout', 'cerr', 'clog', 'list', 'acos', 'asin', 'atan', 'ceil', 'cosh', 'exit', 'fabs', 'fmod', 'free', 'labs', 'modf', 'puts', 'sinh', 'sqrt', 'tanh', 'endl', 'auto', 'bool', 'case', 'char', 'else', 'enum', 'goto', 'long', 'this', 'true', 'void', 'std', 'cin', 'map', 'set', 'abs', 'cos', 'exp', 'log', 'pow', 'sin', 'tan', 'and', 'asm', 'for', 'int', 'new', 'not', 'try', 'xor', 'do', 'if', 'or'];

var keyWords_python = ['and', 'del', 'from', 'not', 'while', 'as', 'elif', 'global', 'or', 'with', 'assert', 'else', 'if', 'pass', 'yield', 'break', 'except', 'import', 'print', 'class', 'exec', 'in', 'raise', 'continue', 'finally', 'is', 'return', 'def', 'for', 'lambda', 'try'];

var keyWords_java = ['abstract', 'continue', 'for', 'new', 'switch', 'assert', 'default', 'goto', 'package', 'synchronized', 'boolean', 'do', 'if', 'private', 'this', 'break', 'double', 'implements', 'protected', 'throw', 'byte', 'else', 'import', 'public', 'throws', 'case', 'enu', 'instanceof', 'return', 'transient', 'catch', 'extends', 'int', 'short', 'try', 'char', 'final', 'interface', 'static', 'void', 'class', 'finally', 'long', 'strictfp', 'volatile', 'const', 'float', 'native', 'super', 'while'];

var keyWords_javascript = ['abstract', 'arguments', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while', 'with', 'yield']

var highlight_default = function (innerHTML) {
	var element = innerHTML;
	element = element.split(/\r?\n/);
    var res = "";
    for (var j = 0; j < element.length; j++)
        res += "<span class=\"line"+((j % 2 == 0) ? " odd" : " even")+"\">"+element[j]+"</span>\n";

    res = res.replace(/\r?\n/g, '');
    return res;
}

var highlight_javascript = function (innerHTML) {
	var element = innerHTML;
    element = element.replace(new RegExp("=", "g"), "&equals;");
    element = element.replace(/(['"].*?['"])/g, "<span class=\"string\">$1</span>");

    element = element.replace(/((\d+))/g, "<span class=\"number\">$1</span>");
    element = element.replace(/((&equals;)|(&amp;)|(&gt;)|(&lt;)|\{|\}|\(|\)|\[|\]|!|\?)/g, "<span class=\"sc\">$1</span>");
	
    for (var j = 0; j < keyWords_javascript.length; j++) {
        var re = new RegExp("<span.*?<\/span>|(\\b"+keyWords_javascript[j]+"\\b)", "g");
        element = element.replace(re, function(m, group1) {
            if (typeof group1 == 'undefined') {
                return m;
            } else {
                return "<span class=\"keyword\">"+group1+"</span>";
            }
        });
    }
    element = element.replace(/(\/\/.*?\n)/g, function(m){
        return "<span class=\"comment\">"+m.substring(0, m.length-1)+"</span>\n";
    });
    element = element.replace(/(\/\*[\s\S]*?\*\/)/g, function(m){
        m = m.split(/\r?\n/);
        var len = m.length;
        var res = "";
        for (var j = 0; j < len; j++)
            res += "<span class=\"comment\">"+m[j]+"</span>\n";
        return res.substring(0, res.length-1);
    });
    element = element.split(/\r?\n/);
    var res = "";
    for (var j = 0; j < element.length; j++)
        res += "<span class=\"line"+((j % 2 == 0) ? " odd" : " even")+"\">"+element[j]+"</span>\n";

    res = res.replace(/\r?\n/g, '');
    return res;
}

var highlight_python = function (innerHTML) {
    var element = innerHTML;
    element = element.replace(new RegExp("=", "g"), "&equals;");
    element = element.replace(/(['"].*?['"])/g, "<span class=\"string\">$1</span>");

    element = element.replace(/((\d+))/g, "<span class=\"number\">$1</span>");
    element = element.replace(/((&equals;)|(&amp;)|(&gt;)|(&lt;)|\{|\}|\(|\)|\[|\]|!|\?)/g, "<span class=\"sc\">$1</span>");
    for (var j = 0; j < keyWords_python.length; j++) {
        var re = new RegExp("<span.*?<\/span>|(\\b"+keyWords_python[j]+"\\b)", "g");
        element = element.replace(re, function(m, group1) {
            if (typeof group1 == 'undefined') {
                return m;
            } else {
                return "<span class=\"keyword\">"+group1+"</span>";
            }
        });
    }
    element = element.replace(/(#.*\n)/g, function(m){
        return "<span class=\"comment\">"+m.substring(0, m.length-1)+"</span>\n";
    });
    element = element.split(/\r?\n/);
    var res = "";
    for (var j = 0; j < element.length; j++)
        res += "<span class=\"line"+((j % 2 == 0) ? " odd" : " even")+"\">"+element[j]+"</span>\n";

    res = res.replace(/\r?\n/g, '');
    return res;
}

var highlight_cpp = function (innerHTML) {
    var element = innerHTML;
    element = element.replace(new RegExp("=", "g"), "&equals;");
    element = element.replace(/(['"].*?['"])/g, "<span class=\"string\">$1</span>");

    element = element.replace(/((\d+)((l|u|U|l|L|ul|UL|f|F))*(\d*))/g, "<span class=\"number\">$1</span>");
    element = element.replace(/((&equals;)|(&amp;)|(&gt;)|(&lt;)|\{|\}|\(|\)|\[|\]|!|\?)/g, "<span class=\"sc\">$1</span>");
    for (var j = 0; j < keyWords_cpp.length; j++) {
        var re = new RegExp("<span.*?<\/span>|(\\b"+keyWords_cpp[j]+"\\b)", "g");
        element = element.replace(re, function(m, group1) {
            if (typeof group1 == 'undefined') {
                return m;
            } else {
                return "<span class=\"keyword\">"+group1+"</span>";
            }
        });
    }
    element = element.replace(/(\/\/.*?\n)/g, function(m){
        return "<span class=\"comment\">"+m.substring(0, m.length-1)+"</span>\n";
    });
    element = element.replace(/(#.*\n)/g, function(m){
        return "<span class=\"global\">"+m.substring(0, m.length-1)+"</span>\n";
    });
    element = element.replace(/(\/\*[\s\S]*?\*\/)/g, function(m){
        m = m.split(/\r?\n/);
        var len = m.length;
        var res = "";
        for (var j = 0; j < len; j++)
            res += "<span class=\"comment\">"+m[j]+"</span>\n";
        return res.substring(0, res.length-1);
    });
    element = element.split(/\r?\n/);
    var res = "";
    for (var j = 0; j < element.length; j++)
        res += "<span class=\"line"+((j % 2 == 0) ? " odd" : " even")+"\">"+element[j]+"</span>\n";

    res = res.replace(/\r?\n/g, '');
    return res;
}

var highlight_java = function (innerHTML) {
    var element = innerHTML;
    element = element.replace(new RegExp("=", "g"), "&equals;");
    element = element.replace(/(['"].*?['"])/g, "<span class=\"string\">$1</span>");

    element = element.replace(/((\d+)((l|u|U|l|L|ul|UL|f|F))*(\d*))/g, "<span class=\"number\">$1</span>");
    element = element.replace(/((&equals;)|(&amp;)|(&gt;)|(&lt;)|\{|\}|\(|\)|\[|\]|!|\?)/g, "<span class=\"sc\">$1</span>");
    for (var j = 0; j < keyWords_java.length; j++) {
        var re = new RegExp("<span.*?<\/span>|(\\b"+keyWords_java[j]+"\\b)", "g");
        element = element.replace(re, function(m, group1) {
            if (typeof group1 == 'undefined') {
                return m;
            } else {
                return "<span class=\"keyword\">"+group1+"</span>";
            }
        });
    }

    element = element.replace(/(\/\/.*?\n)/g, function(m){
        return "<span class=\"comment\">"+m.substring(0, m.length-1)+"</span>\n";
    });

    element = element.replace(/(\/\*[\s\S]*?\*\/)/g, function(m){
        m = m.split(/\r?\n/);
        var len = m.length;
        var res = "";
        for (var j = 0; j < len; j++)
            res += "<span class=\"comment\">"+m[j]+"</span>\n";
        return res.substring(0, res.length-1);
    });
    element = element.split(/\r?\n/);
    var res = "";
    for (var j = 0; j < element.length; j++)
        res += "<span class=\"line"+((j % 2 == 0) ? " odd" : " even")+"\">"+element[j]+"</span>";

    res = res.replace(/\r?\n/g, '');
    return res;
}
