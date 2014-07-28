$( document ).ready(function() {

	var cb = new Codebird,
		display;
	cb.setConsumerKey("aNlrFnYS1zaULPCF3yHKw", "VjadH4cu3MnebGFAArTnYFmmI2kDXynW0KbDDpjLUs");
	cb.setToken("394394663-JNdx2b2huLifytO8CssqVtclhIzim6zw0swxovc0", "aVs4r9bttJy6GZQOBXMzOQ8qcgMkrxfW4P6rXxgNURw");

	display = function (reply) {
    	console.log(reply)
        for (i = 0; i < reply.statuses.length; i++) {
        	var status = $("<div></div>").text(reply.statuses[i].text).addClass("col-md-10"),
        		name = $("<div></div>").text(reply.statuses[i].user.name).addClass("row"),
        		handle = $("<div></div>").text("@" + reply.statuses[i].user.screen_name).addClass("row"),
        		namecolumn = $("<div></div>").addClass("col-sm-2").append(name, handle),
        		tweetrow = $("<div></div>").addClass("row").append(namecolumn, status);
        	$("#response").append(tweetrow).append("<br>");
        }
        if (reply.statuses.length == 0) {
        	$("#response").append("No results found.")
        }
        $(".loader").hide();
        return;
    };

	$( "form" ).submit(function( event ) {
		event.preventDefault();
	  	var query = $("#queryinput").val(),
			loader = $("<div>Loading...</div>").addClass("loader");
		$("#response").empty();
		$("#response").append(loader);
	    cb.__call(
		    "search_tweets",
		    "q=" + query + "&count=50",
		    function (reply) {
		    	display(reply);
		    	$("#searches-placeholder").remove();
		    	var link = $("<a></a>").attr("href", "#").text(query).addClass("searchlink"),
		    		recentsearch = $("<li></li>").append(link);
		    	$("#searches").prepend(recentsearch);
		    	$("#searches li:gt(9)").remove();
		    },
		    true // this parameter required
		);
	  	console.log("Finished");
	  	return;
	});

	$( "#searches" ).on("click", ".searchlink", function( event ) {
	  	event.preventDefault();
		var loader = $("<div>Loading...</div>").addClass("loader"),
			query = this.text;
		console.log("Starting search");
		$("#response").empty();
		$("#response").append(loader);
		$("#queryinput").val(query)
	    cb.__call(
		    "search_tweets",
		    "q=" + query + "&count=50",
		    function (reply) {
		    	display(reply);
		    	$("#searches-placeholder").remove();
		    },
		    true // this parameter required
		);
	  	return;
	});

});
