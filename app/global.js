// project information
var projects = [
	{
		title: "React Chess",
		src: "assets/img/projects/react-chess.png",
		url: "https://github.com/jeffrey-xiao/react-chess",
		description: "<span class='emphasis'>Chess clone</span> developed with <span class='emphasis'>Node</span>, <span class='emphasis'>Express</span>, <span class='emphasis'>React</span>, and <span class='emphasis'>Socket</span>. Supports room creation, different game modes (Bughouse, Crazyhouse, Regular), timer, a chatroom, and a history of moves."	
	},
	{
		title: "Intelligario",
		src: "assets/img/projects/intelligario.png",
		url: "http://devpost.com/software/intelligario",
		description: "<span class='emphasis'>Agar.io clone</span> that allows for human input through the live adjustment of an \"aggression\" factor. Spikes will automatically kill any blob. Communication is done through <span class='emphasis'>Socket</span> and the graphics is done through <span class='emphasis'>FabricJS</span>. The underlying implementation of the search algorithm is an <span class='emphasis'>optimized, multithreated Dijkstra's algorithm</span>."
	},
	{
		title: "React Reddit",
		src: "assets/img/projects/react-reddit.png",
		url: "https://github.com/jeffrey-xiao/react-reddit",
		description: "<span class='emphasis'>Reddit clone</span> developed with <span class='emphasis'>Node</span>, <span class='emphasis'>Express</span>, <span class='emphasis'>Firebase</span>, and <span class='emphasis'>React</span>. The features include self-posting, linked posts, voting, account management, and live post and commrent creation. The styling is very minimal."
	},
    {
        title: "MAL Recommender",
        src: "assets/img/projects/mal-recommender.png",
        url: "https://github.com/jeffrey-xiao/Mal-Recommender",
        description: "<span class='emphasis'>Python</span> application that uses <span class='emphasis'>collaborative filtering</span> to predict scores for MyAnimeList users. Computes 1000 features and weights for both users and anime. Since MAL did not have a developed API, user and anime data were crawled using BeautifulSoup. Machine learning framework is <span class='emphasis'>NumPy</span> and <span class='emphasis'>SciPy</span>."
    },
    {
        title: "Snatch N' Go",
        src: "assets/img/projects/snatch-n-go.png",
        url: "http://devpost.com/software/snatchngo",
        description: "<span class='emphasis'>Android</span> application for customers and <span class='emphasis'>web</span> application for restaurant managers that faciliate easy <span class='emphasis'>food ordering</span> and <span class='emphasis'>pick-ups</span>. The web app essentially serves as a work-flow tool to track and manage placed orders, while the Android app is a clean interface to find and order from nearby restaurants. Built with <span class='emphasis'>Firebase</span> and <span class='emphasis'>Twilio</span>."
    },
    {
        title: "SwagMusic.js",
        src: "assets/img/projects/swagmusic.png",
        url: "https://github.com/xelendt/swagmusic.js",
        description: "<span class='emphasis'>3D model</span> that <span class='emphasis'>dances</span> to the beat of any music. Built with <span class='emphasis'>WebGL</span>, <span class='emphasis'>three.js</span>, <span class='emphasis'>Web Audio API</span>, and <span class='emphasis'>Twilio</span>. It currently can take the URL of any <span class='emphasis'>Soundcloud</span> link, but integration with other music sharing sites like <span class='emphasis'>Spotify</span> is doable."
    },
    {
        title: "In the Loop",
        src: "assets/img/projects/in-the-loop.jpg",
        url : "http://devpost.com/software/in-the-loop-real-time-news-aggregating-web-app",
        description: "<span class='emphasis'>AngularJS</span> application and <span class='emphasis'>Python</span> backend that <span class='emphasis'>aggregates current news information</span> in live time. Built with <span class='emphasis'>Twitter API</span>, <span class='emphasis'>Bing Search API</span>, <span class='emphasis'>Newspaper</span>, <span class='emphasis'>Firebase</span>, <span class='emphasis'>Indico</span>, <span class='emphasis'>Google Places</span>, and <span class='emphasis'>Wolfram Alpha</span>. It also uses a <span class='emphasis'>custom matching algorithm</span> to select best paragraphs."
    },
    {
        title: "WhizBridge",
        src: "assets/img/projects/whizbridge.jpg",
        url : "http://devpost.com/software/whizbridge-yrfq5g",
        description: "<span class='emphasis'>Web</span> and <span class='emphasis'>iOS</span> application that provides a <span class='emphasis'>buyer-oriented marketplace</span> for tech support. The job posting process is accountless, secure, and convenient, and each job is associated with a temporary hash. Built with <span class='emphasis'>Twilio</span> and <span class='emphasis'>BrainTree</span>."
    },
    {
        title: "Resistora",
        src: "assets/img/projects/resistora.png",
        url : "http://devpost.com/software/resistora",
        description: "<span class='emphasis'>Android</span> application that determines the <span class='emphasis'>resistance</span> of various resistors using the camera. It uses a <span class='emphasis'>custom image analysis algorithm</span> based on the <span class='emphasis'>saturation</span> and <span class='emphasis'>lightness</span> of each vertical strip when the image is converted to HSL."
    },
    {
        title: "Competitive Programming",
        src: "assets/img/projects/competitive-programming.png",
        url: "https://github.com/jeffrey-xiao/Competitive-Programming",
        description: "Repository containing all the work I've done for competitive programming. The <span class='emphasis'>codebook</span> package stores useful <span class='emphasis'>algorithms</span> and <span class='emphasis'>data structures</span>, and the <span class='emphasis'>contest</span> package stores my <span class='emphasis'>solutions</span>."
    },
    {
        title: "Five Hundred Miles for Parkison's",
        src: "assets/img/projects/fivehundredmiles.png",
        url: "http://fivehundredmiles.org/",
        description: "Developed stable <span class='emphasis'>AngularJS</span> website for <span class='emphasis'>Five Hundred Miles for Parkison's</span>."
    },
    {
        title: "Gravity Collision Simulator",
        src: "assets/img/projects/gravity-simulator.png",
        url : "https://github.com/jeffrey-xiao/Gravity-Collision-Simulator",
        description: "<span class='emphasis'>java.swing application</span> that emulates <span class='emphasis'>two dimensional collisions</span>. The coefficient of resistitution, frames per second, the accleration of gravity, and the path size are all adjustable. Upon creation, ball overlap is automatically detected and adjusted."
    },
    {
        title: "Single Player Tetris",
        src: "assets/img/projects/tetris-single.png",
        url : "https://github.com/jeffrey-xiao/Tetris-Single-Player",
        description: "<span class='emphasis'>java.awt</span> clone of <span class='emphasis'>single player Tetris</span>. Mechanics are ones you would typically find in a modern Tetris clone."
    },
    {
        title: "Multiplayer Tetris",
        src: "assets/img/projects/tetris-multi.png",
        url : "https://github.com/jeffrey-xiao/Tetris-Multiplayer",
        description: "<span class='emphasis'>java.awt</span> clone of <span class='emphasis'>local multiplayer Tetris</span> (Online play coming soon). Mechanics are ones you would typically find in a modern Tetris clone. Combos are factored into account when sending garbage lines."
    },
    {
        title: "Genetic Programming Reversi",
        src: "assets/img/projects/reversi.png",
        url : "https://github.com/jeffrey-xiao/Genetic-Reversi",
        description: "<span class='emphasis'>Java</span> application that uses <span class='emphasis'>genetic programming</span> to create artificial intelligence to play <span class='emphasis'>Reversi</span>. Each genetic player uses the symmetry of the board to evaluate moves. It plays relatively well against random players and 2-3 look greedy players."
    }
]


// parsing blog posts and initializing all the variables
var posts = {
	"2016-04-08 ECOO Round 1 Analysis":             ["Programming", "Competition"],
	"2016-03-11 CCOQR 2016 Analysis":               ["Programming", "Competition"],
	"2016-02-17 CCC 2016 Analysis":                 ["Programming", "Competition"],
	"2016-02-16 Machine Learning Notes":            ["Programming", "Machine Learning"],
	"2016-01-25 UofTHacks":                         ["Competition", "Hackathon", "Programming", "Webgl", "Music", "Physics"],
    "2015-12-14 Divide and Conquer Optimization":   ["Dynamic Programming", "Programming"],
    "2015-12-07 Knuth's Optimization":              ["Dynamic Programming", "Programming"],
    "2015-11-30 Convex Hull Trick":                 ["Dynamic Programming", "Programming"],
    "2015-11-29 Hack Western":                      ["Competition", "Hackathon", "Programming", "Machine Learning"],
    "2015-11-24 Harvard MIT Math Tournament":       ["Competition","Math"],
    "2015-11-24 First Post":                        ["Misc"]
};

var tags = {}

var archive = {}

var numOfPosts = {}

var desc = {}

function getData (blogName) {
    var request = $.get('../app/posts/' + blogName.replace(/ /g,'-') + '.html');
    request.success(function (data) {
        var ret = "";
        var page = $('<div>/</div>');
        
        page.html(data);
        
        var words = $('p', page)[0].textContent.split(" ");
        for (var i = 0; i < Math.min(words.length, 40); i++)
            if (words[i].trim().length > 0)
                ret += words[i].trim() + " ";
        
        desc[blogName] = ret.substring(0, ret.length - 1);
    });
}

for (var post in posts) {
    // processing the information for the archive
    var year = post.substring(0, 4);
    var month = post.substring(5, 7);
    if (archive[year] == undefined) {
        archive[year] = {}
        numOfPosts[year] = 0;
    }
    if (archive[year][month] == undefined)
        archive[year][month] = [];
    numOfPosts[year]++;
    archive[year][month].push(post);

    // processing the information for the tags
    for (var i = 0; i < posts[post].length; i++) {
        if (tags[posts[post][i]] == undefined)
            tags[posts[post][i]] = [];
        tags[posts[post][i]].push(post);
    }

    // processing the information for the descriptions
    getData(post);
}

angular.module('global', [])
	.value('posts', posts)
	.value('tags', tags)
	.value('archive', archive)
	.value('numOfPosts', numOfPosts)
	.value('desc', desc)
	.value('disqusInitialized', false)
	.factory('Global', function () {
		return {
			getPosts : function () {
				return posts;
			},
			getTags: function () {
				return tags;
			},
			getArchive: function () {
				return archive;
			},
			getNumOfPosts: function () {
				return numOfPosts;
			},
			getDesc: function () {
				return desc;
			},
			removeActiveClasses: function ($document) {
				$document[0].getElementById('home-label').classList.remove('active-large');
				$document[0].getElementById('home-label').classList.remove('active-small');
				$document[0].getElementById('projects-label').classList.remove('active-large');
				$document[0].getElementById('projects-label').classList.remove('active-small');
				$document[0].getElementById('blog-label').classList.remove('active-large');
				$document[0].getElementById('blog-label').classList.remove('active-small');
				$document[0].getElementById('contact-label').classList.remove('active-large');
				$document[0].getElementById('contact-label').classList.remove('active-small');
			}
		};
	})
	
	// factory for page titles
	.factory('Page', function() {
   		var title = 'default';
   		return {
     		getTitle: function() {
         		return title;
     		},
     		setTitle: function(newTitle) {
         		title = newTitle;
     		}
   		};
	})

	// transforming numbers to month names
	.filter('monthName', [function() {
		return function (monthNumber) {
			var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			return monthNames[monthNumber - 1];
		}
	}]);