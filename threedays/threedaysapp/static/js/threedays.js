$(document).ready( function() {
	$('.itinerary').hide();

	$(document).on('click', ".choiceButton", function() {
		counter++;
		$("#itineraryCount").html(counter);
		var parentData = $(this).parent().parent().get(0).dataset;
		categoryDict[parentData.category] = (categoryDict[parentData.category] || 0) + 1;
		if (counter <= 9) {
			var newCat = category_picker(parentData.category);
			three_new_places("#responseContainer", newCat);
		}
		add_to_itinerary(parentData.name, parentData.yelpurl, parentData.imageurl, parentData.category);
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

var categoryMap = {"nightlife": ['bars', 'nightlife'],
              "restaurants": ['turkish','spanish','restaurants','portuguese','polish','mideastern','mexican','mediterranean','malaysian', 'african', 'arabian', 'belgian', 'brazilian', 'caribbean', 'chinese', 'donburi', 'food', 'german', 'french', 'gourmet', 'italian', 'japanese', 'latin'],
              "kidfriendly": ['pets','artsandcrafts', 'education'],
              "outdoor": ['sportgoods','parks','active', 'bicycles', 'diving', 'fitness'],
              "tourist": ['historicaltours', 'landmarks', 'localflavor'],
              "budget": ['homeandgarden'],
              "entertainment": ['shopping', 'shoppingcenters','massmedia', 'festivals', 'stadiumsarenas', 'theater'],
              "art": ['photographers','arts', 'fashion', 'museums'],
              "ignore": ['specialtyschools','realestate','publicservicesgovt','professional','physicians','petservices','nonprofit','localservices', 'auto', 'c_and_mh', 'dentalhygienests', 'dentists', 'diagnosticservices', 'eventservices', 'financialservices', 'flowers', 'hair', 'hairremoval', 'health', 'homeservices', 'itservices', 'lawyers']}

var prefDict = {'nightlife': 0, 'restaurants': 0, 'kidfriendly': 0, 'outdoor': 0, 'tourist': 0, 'budget': 0, 'entertainment': 0, 'art': 0};
var max_category = "";
var max_rank = 0;

var itineraryJson = {};
var categoryDict = {};

var alternate = false;
var counter = 0;
var offset = 2;

function category_picker(picked_category) {
	var chosen_category;
	for (var cat in categoryMap) {
		if ($.inArray(picked_category, categoryMap[cat]) != -1) {
			chosen_category = cat;
			break;
		}
	}

	switch(chosen_category) {
	    case 'nightlife':
	        prefDict['entertainment'] += 1;
			prefDict['nightlife'] += 1;
			if (prefDict['kidfriendly'] > 0)
				prefDict['kidfriendly'] -= 1;
	        break;
	    case 'restaurants':
	        prefDict['restaurants'] += 1;
	        break;
	    case 'kidfriendly':
	        prefDict['kidfriendly'] += 1;
			prefDict['tourist'] += 1;
	        if (prefDict['nightlife'] > 0)
	            prefDict['nightlife'] -= 1;
	        break;
	    case 'outdoor':
	        prefDict['outdoor'] += 1;
	        break;
	    case 'tourist':
			prefDict['tourist'] += 1;
			prefDict['art'] += 1;
			break;
		case 'entertainment':
			prefDict['entertainment'] += 1;
			break;
		case 'art':
			prefDict['art'] += 1;
			prefDict['tourist'] += 1;
			break;
	    default:
	        console.log("not found");
	}

	for (var cat2 in prefDict) {
		if (prefDict[cat2] > max_rank) {
			max_rank = prefDict[cat2];
			max_category = cat2;
			break;
		}
		else if (prefDict[cat2] == max_rank && cat2 != max_category) {
			max_rank = prefDict[cat2];
			max_category = cat2;
		}
    }

    var index = Math.floor(Math.random() * categoryMap[max_category].length);
	var next_category = categoryMap[max_category][index];
	console.log("the user's max category is " + max_category + " with the rank of " + max_rank);
	console.log("next category is " + next_category);
	return next_category;
}

function three_new_places(divId, category){
	offset+=2;
    $.ajax({
        url: "http://127.0.0.1:8000/chooseOne/?location=Chicago, IL&offset="+(categoryDict[category] || 0).toString() +"&category_filter="+category,
        success : function(data) {
            //console.log("requested access complete");
            // console.log(data);
            $.ajax({
        		url: "http://127.0.0.1:8000/chooseOne/?location=Chicago, IL&offset="+offset,
		        success : function(data2) {
		            //console.log("requested access complete");
		            // console.log(data2);
		            // THIS WILL HIDE DIVS ITERATIVELY
		            $("#round" + (counter -1)).hide();
                    $(divId).append(
		            	"<div class=\"row\" id=\"round" + counter + "\">" +
		            		"<div class=\"col-md-12 text-left\">" +
		            			"<div class=\"col-md-4 bg-hover\" data-name=\""+ data['businesses'][0]['name'] + "\"data-yelpurl=\""+ data['businesses'][0]['url'] + "\"data-imageurl=\""+ data['businesses'][0]['image_url'] + "\"data-category=\"" + data['businesses'][0]['categories'][0][1] +"\">" +
		                        	"<div class=\"outer-box\">" +
                            			"<a class=\"place-box choiceButton\" href=\"#\">" +
			                                "<figure class=\"yelp-img\"><img src="+data['businesses'][0]['image_url']+" alt=\"yelp image\" class=\"img-responsive\"></figure>" +
			                                "<figcaption>" +
			                                    "<h3>"+data['businesses'][0]['name']+"</h3>" +
			                                    "<p><i class=\"fa fa-tag\"></i>"+data['businesses'][0]['categories'][0][1] +"</p>" +
			                                    "<p class=\"description\">"+data['businesses'][0]['snippet_text']+"</p>" +
			                                "</figcaption>" +
			                            "</a>" +
			                            "<div class=\"info-icon text-right\">" +
			                                "<a href="+data['businesses'][0]['url']+">or find out more <i class=\"fa fa-external-link-square\"></i></a>" +
			                            "</div>" +
			                        "</div>" +
				            	"</div>" +
				            	"<div class=\"col-md-4 bg-hover\" data-name=\""+ data2['businesses'][0]['name'] + "\"data-yelpurl=\""+ data2['businesses'][0]['url'] + "\"data-imageurl=\""+ data2['businesses'][0]['image_url'] + "\"data-category=\"" + data2['businesses'][0]['categories'][0][1] + "\">" +
					            	"<div class=\"outer-box\">" +
                            			"<a class=\"place-box choiceButton\" href=\"#\">" +
			                                "<figure class=\"yelp-img\"><img src="+data2['businesses'][0]['image_url']+" alt=\"yelp image\" class=\"img-responsive\"></figure>" +
			                                "<figcaption>" +
			                                    "<h3>"+data2['businesses'][0]['name']+"</h3>" +
			                                    "<p><i class=\"fa fa-tag\"></i>"+data2['businesses'][0]['categories'][0][1] +"</p>" +
			                                    "<p class=\"description\">"+data2['businesses'][0]['snippet_text']+"</p>" +
			                                "</figcaption>" +
			                            "</a>" +
			                            "<div class=\"info-icon text-right\">" +
			                                "<a href="+data2['businesses'][0]['url']+">or find out more <i class=\"fa fa-external-link-square\"></i></a>" +
			                            "</div>" +
			                        "</div>" +
				            	"</div>" +
				            	"<div class=\"col-md-4 bg-hover\" data-name=\""+ chicagojson[counter]['name'] + "\"data-yelpurl=\""+ chicagojson[counter]['url'] + "\"data-imageurl=\""+ chicagojson[counter]['image_url'] + "\"data-category=\"" + chicagojson[counter]['category'] + "\">" +
		                        	"<div class=\"outer-box\">" +
                            			"<a class=\"place-box choiceButton\" href=\"#\">" +
			                                "<figure class=\"yelp-img\"><img src="+chicagojson[counter]['image_url']+" alt=\"yelp image\" class=\"img-responsive\"></figure>" +
			                                "<figcaption>" +
			                                    "<h3>"+chicagojson[counter]['name']+"</h3>" +
			                                    "<p><i class=\"fa fa-tag\"></i>"+chicagojson[counter]['category']+"</p>" +
			                                    "<p class=\"description\">"+chicagojson[counter]['snippet_text']+"</p>" +
			                                "</figcaption>" +
			                            "</a>" +
			                            "<div class=\"info-icon text-right\">" +
			                                "<a href="+chicagojson[counter]['url']+">or find out more <i class=\"fa fa-external-link-square\"></i></a>" +
			                            "</div>" +
			                        "</div>" +
				            	"</div>" +
			            	"</div>" +
		            	"</div>")
        		}
    		})
        }
    })
}

function add_to_itinerary(name, yelp_url, image_url, category) {
	itineraryJson[counter.toString()] = {"name" : name, "yelp_url" : yelp_url, "image_url" : image_url, "category" : category};
	console.log(itineraryJson);
}

function show_itinerary() {
	alternate = !alternate;
	$.each(itineraryJson, function(key, val) {
		console.log(val.name);
		$("#itineraryRow").append(
			"<div class=\"col-md-3 text-center box\">" +
                        "<figure class=\"yelp-img\"><img src=\""+val.image_url+"\" alt=\"yelp image\" class=\"img-responsive\"></figure>" +
                        "<figcaption>" +
                            "<h3 class=\"it-name\">"+val.name+"</h3>" +
                            "<p class=\"it-cat\"><i class=\"fa fa-tag\"></i> "+val.category+"</p>" +
                            "<p class=\"description\">snippet_text</p>" +
                        "</figcaption>" +
                        "<div class=\"info-icon text-right\">" +
                            "<a href=\""+val.yelp_url+"\">more here <i class=\"fa fa-external-link-square\"></i></a>" +
                        "</div>" +
                    "</div>"
			)
	});

	if (alternate) {
		$(".itinerary").show();
		$("#round" + counter).hide();
	}
	else {
		$(".itinerary").hide();
		$("#itineraryRow").empty();
		$("#round" + counter).show();
	}
}