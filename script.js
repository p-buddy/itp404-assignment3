$("#search").click(function() {
  var url = ('https://www.reddit.com/r/' + document.getElementById('searchBox').value + '.json');
  getSubreddits(url);
});

//JSON structure
//respons.data.children.data.property
function format(response) {
  var jsonArray = [];
  var responseArray = response.data.children;
  	for(var i = 0; i < responseArray.length; i++) {
  		var archive = "";
  		var selftext = "N/A";
  		if (responseArray[i].data.archived == true) {
  			archive = "Archived"
  		}
  		else {
  			archive = "Not Archived"
  		}
    	var newObj = {
      		"score" : responseArray[i].data.score,
      		"title" : responseArray[i].data.title,
      		"titleURL" : responseArray[i].data.url,
      		"commentCount" : responseArray[i].data.num_comments,
      		"archived" : archive
      	};
      jsonArray.push(newObj);
    }
  return jsonArray;
}

//didn't end up using a button
var formattedJSON = [];

function getSubreddits(subreddit) {
   $.ajax({
    url: subreddit,
    type: 'get'})
   .then(function(response) {
    		if (response != undefined) {
   			formattedJSON = format(response);
   			}
    		var templateSource = $('#subreddits-template').html();
    		var template = Handlebars.compile(templateSource);
    		var html = template({property : formattedJSON});
			$('#subreddits').html(html);
  		}, function() {
    		console.log('Nothing was found');
});
}
