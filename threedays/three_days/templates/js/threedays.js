$(document).ready( function() {

	$(document).on('click', ".choiceButton", function() {
		var parentData = $(this).parent().parent().get(0).dataset;
		categoryDict[parentData.category] = (categoryDict[parentData.category] || 0) + 1;
		three_new_places("#responseContainer", parentData.category);
		add_to_itinerary(parentData.name, parentData.yelpurl, parentData.imageurl);
	});

	$(document).on('click', "#itineraryButton", function() {
		show_itinerary();
	});
});

var chicagojson = {"0":{"name":"The Cloud Gate aka The Bean", "url":"http://www.yelp.com/biz/the-cloud-gate-aka-the-bean-chicago", "image_url":"http://s3-media4.fl.yelpcdn.com/bphoto/uFT4lrX-omWGu5Uifguzlw/ms.jpg", "snippet_text":"I came to see the Bean, I touched the Bean, I took picture with the Bean, I walked under the Bean, and I walked out like a champ.\n\nBelieve it or not, but...", "category":"landmarks"},
"1":{"name":"The Second City", "url":"http://www.yelp.com/biz/the-second-city-chicago", "image_url":"http://s3-media4.fl.yelpcdn.com/bphoto/DUa84MUtO0jQ3oQN3Menjw/ms.jpg", "snippet_text":"I've been here three times and there is a reason I keep coming back. I saw #Dateme with my girlfriend last Friday and we both loved the show. The improv was...", "category": "theater"},
"2":{"name":"Wrigley Field", "url":"http://www.yelp.com/biz/wrigley-field-chicago", "image_url":"http://s3-media4.fl.yelpcdn.com/bphoto/dMIdLRru0DxT3GKKhok3jQ/ms.jpg", "snippet_text":"I was super lucky to come through here during right after one of my conferences has ended.  This park has so much history to it and it was simply a joy to...", "category":"stadiumsarenas"},
"3":{"name":"Willis Tower", "url":"http://www.yelp.com/biz/willis-tower-chicago-2", "image_url":"http://s3-media1.fl.yelpcdn.com/bphoto/cYwUCY8ROXL8JM6SAoGwZg/ms.jpg", "snippet_text":"First things first.  The locals of Chicago will never call this place Willis Tower.  So, they will always refer to it as it was originally intended to be,...", "category":"landmarks"},
"4":{"name":"Millennium Park", "url":"http://www.yelp.com/biz/millennium-park-chicago", "image_url":"http://s3-media2.fl.yelpcdn.com/bphoto/c4lfVi_DngWM-zTy7iDioA/ms.jpg", "snippet_text":"After visiting many other cities, I am really thankful for having this huge $475 million park in Chicago. Besides New York, you will not find a better park...", "category":"parks"},
"5":{"name":"The Magnificent Mile", "url":"http://www.yelp.com/biz/the-magnificent-mile-chicago", "image_url":"http://s3-media3.fl.yelpcdn.com/bphoto/UXIuqgYLqEGXnsJNougQaw/ms.jpg", "snippet_text":"When in Chicagoland, you have to shop the Magnificent Mile! Not only is this area brimming with shops that would most likely make you knock over a wall in...", "category":"shoppingcenters"},
"6":{"name":"Navy Pier", "url":"http://www.yelp.com/biz/navy-pier-chicago", "image_url":"http://s3-media2.fl.yelpcdn.com/bphoto/MwcxV3xK8smuNjzp_y53FA/ms.jpg", "snippet_text":"This attraction is packed with tourists (like us) even on a gloomy day!  The rain eventually made its way down as we were by the ferris wheel (which was...", "category":"amusementparks"},
"7":{"name": "Chicago Theatre", "url":"http://www.yelp.com/biz/chicago-theatre-chicago", "image_url":"http://s3-media3.fl.yelpcdn.com/bphoto/X22udnxYcrgUe-GnrwUMtw/ms.jpg", "snippet_text": "Came here for the premier showing of the Blackhawks championship film, Hat Trick. (Excellent film) \nIt had been some time since I had been in the Chicago...", "category":"theater"},
"8":{"name": "Billy Goat Tavern", "url":"http://www.yelp.com/biz/billy-goat-tavern-chicago", "image_url":"http://s3-media3.fl.yelpcdn.com/bphoto/12aLcqIdb6cgFkwMcDfs3w/ms.jpg", "snippet_text": "You've probably heard of the Billy Goat Tavern before. You may not, but this greasy spoon has a wild history.\n\nThere isn't much space, but the restaurant...", "category":"divebars"},
"9":{"name": "Oak Street Beach", "url":"http://www.yelp.com/biz/oak-street-beach-chicago", "image_url":"http://s3-media2.fl.yelpcdn.com/bphoto/R6nqyPnlGH-SP7pKlbLO6w/ms.jpg", "snippet_text": "Two words: \"man candy\"\n\nOak street beach is quite popular for triathletes to train for the swimming portion of their race. Well, the stretch of Lake between...", "category":"beaches"},
}

var itineraryJson = {};
var categoryDict = {};


var counter = 0;
var offset = 2

function three_new_places(divId, category){
	counter++;
	offset+=2;
    $.ajax({
        url: "http://127.0.0.1:8000/chooseOne/?location=Chicago, IL&offset="+(categoryDict[category] || 0).toString() +"&category_filter="+category,
        success : function(data) {
            console.log("requested access complete");
            // console.log(data);
            $.ajax({
        		url: "http://127.0.0.1:8000/chooseOne/?location=Chicago, IL&offset="+offset,
		        success : function(data2) {
		            console.log("requested access complete");
		            // console.log(data2);
		            // THIS WILL HIDE DIVS ITERATIVELY
		            $("#round" + (counter -1)).hide();
		            $("#itineraryCount").html(counter);
                    $(divId).append(
		            	"<div class=\"row\" id=\"round" + counter + "\">" +
		            		"<div class=\"col-md-12 text-left\">" +
		            			"<div class=\"col-md-4 bg-hover\" data-name=\""+ data['businesses'][0]['name'] + "\"data-yelpurl=\""+ data['businesses'][0]['url'] + "\"data-imageurl=\""+ data['businesses'][0]['image_url'] + "\"data-category=\"" + data['businesses'][0]['categories'][0][1] +"\">" +
					            	"<a class=\"place-box\" href=\"" + data['businesses'][0]['url'] + "\">" +
						            	"<figure><img src=\"" + data['businesses'][0]['image_url'] + "\" alt=\"yelp image\" class=\"img responsive\"></figure>" +
						            	"<figcaption>" +
						            	"<h3>" + data['businesses'][0]['name'] + "</h3>" +
						            	"<p>Category: " + data['businesses'][0]['categories'][0][1] + "</p>" +
						            	"<p class=\"description\">" + data['businesses'][0]['snippet_text'] + "</p>" +
						            	"</figcaption>" +
					            	"</a>" +
					            	"<div class=\"text-center\">" +
			                            "<button class=\"button choiceButton\" style=\"color: black;\">" +
			                                "<span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>" +
			                            "</button>" +
		                        	"</div>" +
				            	"</div>" +
				            	"<div class=\"col-md-4 bg-hover\" data-name=\""+ data2['businesses'][0]['name'] + "\"data-yelpurl=\""+ data2['businesses'][0]['url'] + "\"data-imageurl=\""+ data2['businesses'][0]['image_url'] + "\"data-category=\"" + data2['businesses'][0]['categories'][0][1] + "\">" +
					            	"<a class=\"place-box\" href=\"" + data2['businesses'][0]['url'] + "\">" +
						            	"<figure><img src=\"" + data2['businesses'][0]['image_url'] + "\" alt=\"yelp image\" class=\"img responsive\"></figure>" +
						            	"<figcaption>" +
						            	"<h3>" + data2['businesses'][0]['name'] + "</h3>" +
						            	"<p>Category: " + data2['businesses'][0]['categories'][0][1] + "</p>" +
						            	"<p class=\"description\">" + data2['businesses'][0]['snippet_text'] + "</p>" +
						            	"</figcaption>" +
					            	"</a>" +
					            	"<div class=\"text-center\">" +
			                            "<button class=\"button choiceButton\" style=\"color: black;\">" +
			                                "<span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>" +
			                            "</button>" +
		                        	"</div>" +
				            	"</div>" +
				            	"<div class=\"col-md-4 bg-hover\" data-name=\""+ chicagojson[counter]['name'] + "\"data-yelpurl=\""+ chicagojson[counter]['url'] + "\"data-imageurl=\""+ chicagojson[counter]['image_url'] + "\"data-category=\"" + chicagojson[counter]['category'] + "\">" +
					            	"<a class=\"place-box\" href=\"" + chicagojson[counter]['url'] + "\">" +
						            	"<figure><img src=\"" + chicagojson[counter]['image_url'] + "\" alt=\"yelp image\" class=\"img responsive\"></figure>" +
						            	"<figcaption>" +
						            	"<h3>" + chicagojson[counter]['name'] + "</h3>" +
						            	"<p>Category: " + chicagojson[counter]['category'] + "</p>" +
						            	"<p class=\"description\">" + chicagojson[counter]['snippet_text'] + "</p>" +
						            	"</figcaption>" +
					            	"</a>" +
					            	"<div class=\"text-center\">" +
			                            "<button class=\"button choiceButton\" style=\"color: black;\">" +
			                                "<span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>" +
			                            "</button>" +
		                        	"</div>" +
				            	"</div>" +
			            	"</div>" +
		            	"</div>")
        		}
    		})
        }
    })
}

function add_to_itinerary(name, yelp_url, image_url) {
	itineraryJson[counter.toString()] = {"name" : name, "yelp_url" : yelp_url, "image_url" : image_url};
	console.log(itineraryJson);
}

function show_itinerary() {
	$.each(itineraryJson, function(key, val) {
		console.log(val.name);
	});
}