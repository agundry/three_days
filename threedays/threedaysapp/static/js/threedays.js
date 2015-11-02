$(document).ready( function() {

    // $("#about-btn").click( function(event) {
    //     alert("You clicked the button using JQuery!");
    // });

//$("#about-btn").click(find_a_place(this));
	$("#secondTier").hide();
	$("#thirdTier").hide();
	$("#fourthTier").hide();
});

// function find_a_place($this, divId){
//     console.log("button clicked");
//     $.ajax({
//         url: "http://127.0.0.1:8000/chooseOne/?location=Milwaukee, WI",
//         success : function(data) {
//             console.log("requested access complete");
//             console.log(data);
//             console.log(data['businesses']);
//             console.log(data['businesses'][0]['name']);
//             // $(divId).html('');
//             $(divId).append(
//             	"<div class=\"row\">" +
//             	"<div class=\"col-md-12 text-left\">" +
//             	"<div class=\"col-md-4 bg-hover\">" +
//             	"<a class=\"place-box\" href=\"" + data['businesses'][0]['url'] + "\">" +
//             	"<figure><img src=\"" + data['businesses'][0]['image_url'] + "\" alt=\"yelp image\" class=\"img responsive\"></figure>" +
//             	"<figcaption>" +
//             	"<h3>" + data['businesses'][0]['name'] + "</h3>" +
//             	"<p>Category: " + data['businesses'][0]['categories'][0][0] + "</p>" +
//             	"<p class=\"description\">" + data['businesses'][0]['snippet_text'] + "</p>" +
//             	"</figcaption>" +
//             	"</a>" +
//             	"</div>")
//         }
//     })
// 	$.ajax({
//         url: "http://127.0.0.1:8000/chooseOne/?location=Houston, TX",
//         success : function(data2) {
//             console.log("requested access complete");
//             console.log(data2);
//             console.log(data2['businesses']);
//             console.log(data2['businesses'][0]['name']);
//             $(divId).append(
//             	"<div class=\"col-md-4 bg-hover\">" +
//             	"<a class=\"place-box\" href=\"" + data2['businesses'][0]['url'] + "\">" +
//             	"<figure><img src=\"" + data2['businesses'][0]['image_url'] + "\" alt=\"yelp image\" class=\"img responsive\"></figure>" +
//             	"<figcaption>" +
//             	"<h3>" + data2['businesses'][0]['name'] + "</h3>" +
//             	"<p>Category: " + data2['businesses'][0]['categories'][0][0] + "</p>" +
//             	"<p class=\"description\">" + data2['businesses'][0]['snippet_text'] + "</p>" +
//             	"</figcaption>" +
//             	"</a>" +
//             	"</div>")
//         }
//     })
// 	$.ajax({
//         url: "http://127.0.0.1:8000/chooseOne/?location=Dallas, TX",
//         success : function(data3) {
//             console.log("requested access complete");
//             console.log(data3);
//             console.log(data3['businesses']);
//             console.log(data3['businesses'][0]['name']);
//             $(divId).append(
//             	"<div class=\"col-md-4 bg-hover\">" +
//             	"<a class=\"place-box\" href=\"" + data3['businesses'][0]['url'] + "\">" +
//             	"<figure><img src=\"" + data3['businesses'][0]['image_url'] + "\" alt=\"yelp image\" class=\"img responsive\"></figure>" +
//             	"<figcaption>" +
//             	"<h3>" + data3['businesses'][0]['name'] + "</h3>" +
//             	"<p>Category: " + data3['businesses'][0]['categories'][0][0] + "</p>" +
//             	"<p class=\"description\">" + data3['businesses'][0]['snippet_text'] + "</p>" +
//             	"</figcaption>" +
//             	"</a>" +
//             	"</div>" +
//             	"</div>" +
//             	"</div>")
//             // $(divId).show();
//         }
//     })
// }
// 
var chicagojson = {"0":{"name":"The Cloud Gate aka The Bean", "url":"http://www.yelp.com/biz/the-cloud-gate-aka-the-bean-chicago", "image_url":"http://s3-media4.fl.yelpcdn.com/bphoto/uFT4lrX-omWGu5Uifguzlw/ms.jpg", "snippet_text":"I came to see the Bean, I touched the Bean, I took picture with the Bean, I walked under the Bean, and I walked out like a champ.\n\nBelieve it or not, but...", "category":"landmarks"},
"1":{"name":"Willis Tower", "url":"http://www.yelp.com/biz/willis-tower-chicago-2", "image_url":"http://s3-media1.fl.yelpcdn.com/bphoto/cYwUCY8ROXL8JM6SAoGwZg/ms.jpg", "snippet_text":"First things first.  The locals of Chicago will never call this place Willis Tower.  So, they will always refer to it as it was originally intended to be,...", "category":"landmarks"},
"2":{"name":"Millennium Park", "url":"http://www.yelp.com/biz/millennium-park-chicago", "image_url":"http://s3-media2.fl.yelpcdn.com/bphoto/c4lfVi_DngWM-zTy7iDioA/ms.jpg", "snippet_text":"After visiting many other cities, I am really thankful for having this huge $475 million park in Chicago. Besides New York, you will not find a better park...", "category":"parks"},
"3":{"name":"The Magnificent Mile", "url":"http://www.yelp.com/biz/the-magnificent-mile-chicago", "image_url":"http://s3-media3.fl.yelpcdn.com/bphoto/UXIuqgYLqEGXnsJNougQaw/ms.jpg", "snippet_text":"When in Chicagoland, you have to shop the Magnificent Mile! Not only is this area brimming with shops that would most likely make you knock over a wall in...", "category":"shoppingcenters"},
"4":{"name":"Wrigley Field", "url":"http://www.yelp.com/biz/wrigley-field-chicago", "image_url":"http://s3-media4.fl.yelpcdn.com/bphoto/dMIdLRru0DxT3GKKhok3jQ/ms.jpg", "snippet_text":"I was super lucky to come through here during right after one of my conferences has ended.  This park has so much history to it and it was simply a joy to...", "category":"stadiumsarenas"},
"5":{"name":"Navy Pier", "url":"http://www.yelp.com/biz/navy-pier-chicago", "image_url":"http://s3-media2.fl.yelpcdn.com/bphoto/MwcxV3xK8smuNjzp_y53FA/ms.jpg", "snippet_text":"This attraction is packed with tourists (like us) even on a gloomy day!  The rain eventually made its way down as we were by the ferris wheel (which was...", "category":"amusementparks"},
"6":{"name":"The Second City", "url":"http://www.yelp.com/biz/the-second-city-chicago", "image_url":"http://s3-media4.fl.yelpcdn.com/bphoto/DUa84MUtO0jQ3oQN3Menjw/ms.jpg", "snippet_text":"I've been here three times and there is a reason I keep coming back. I saw #Dateme with my girlfriend last Friday and we both loved the show. The improv was...", "category": "theater"}}
var counter = 0;
var offset = 2

function find_a_place($this, divId, category){
	counter++;
	offset+=2;
	console.log(category);
	console.log(chicagojson);
    console.log("button clicked");
    $.ajax({
        url: "http://127.0.0.1:8000/chooseOne/?location=Chicago, IL&offset=1&category_filter="+category,
        success : function(data) {
            console.log("requested access complete");
            console.log(data);
            // console.log(data['businesses']);
            // console.log(data['businesses'][0]['name']);
            // $(divId).html('');
            $.ajax({
        		url: "http://127.0.0.1:8000/chooseOne/?location=Chicago, IL&offset="+offset,
		        success : function(data2) {
		            console.log("requested access complete");
		            console.log(data2);
		            // console.log(data2['businesses']);
		            // console.log(data2['businesses'][0]['name']);
                    $(divId).append(
		            	"<div class=\"row\">" +
		            		"<div class=\"col-md-12 text-left\">" +
		            			"<div class=\"col-md-4 bg-hover\">" +
					            	"<a class=\"place-box\" href=\"" + data['businesses'][0]['url'] + "\">" +
						            	"<figure><img src=\"" + data['businesses'][0]['image_url'] + "\" alt=\"yelp image\" class=\"img responsive\"></figure>" +
						            	"<figcaption>" +
						            	"<h3>" + data['businesses'][0]['name'] + "</h3>" +
						            	"<p>Category: " + data['businesses'][0]['categories'][0][1] + "</p>" +
						            	"<p class=\"description\">" + data['businesses'][0]['snippet_text'] + "</p>" +
						            	"</figcaption>" +
					            	"</a>" +
					            	"<div class=\"text-center\">" +
			                            "<button class=\"button\" onclick=\"find_a_place(this, '#responseContainer', '" + data['businesses'][0]['categories'][0][1] + "')\" style=\"color: black;\">" +
			                                "<span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>" +
			                            "</button>" +
		                        	"</div>" +
				            	"</div>" +
				            	"<div class=\"col-md-4 bg-hover\">" +
					            	"<a class=\"place-box\" href=\"" + data2['businesses'][0]['url'] + "\">" +
						            	"<figure><img src=\"" + data2['businesses'][0]['image_url'] + "\" alt=\"yelp image\" class=\"img responsive\"></figure>" +
						            	"<figcaption>" +
						            	"<h3>" + data2['businesses'][0]['name'] + "</h3>" +
						            	"<p>Category: " + data2['businesses'][0]['categories'][0][1] + "</p>" +
						            	"<p class=\"description\">" + data2['businesses'][0]['snippet_text'] + "</p>" +
						            	"</figcaption>" +
					            	"</a>" +
					            	"<div class=\"text-center\">" +
			                            "<button class=\"button\" onclick=\"find_a_place(this, '#responseContainer', '"+data2['businesses'][0]['categories'][0][1] + "')\" style=\"color: black;\">" +
			                                "<span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>" +
			                            "</button>" +
		                        	"</div>" +
				            	"</div>" +
				            	// "<div class=\"col-md-4 bg-hover\">" +
					            // 	"<a class=\"place-box\" href=\"" + data3['businesses'][0]['url'] + "\">" +
						           //  	"<figure><img src=\"" + data3['businesses'][0]['image_url'] + "\" alt=\"yelp image\" class=\"img responsive\"></figure>" +
						           //  	"<figcaption>" +
						           //  	"<h3>" + data3['businesses'][0]['name'] + "</h3>" +
						           //  	"<p>Category: " + data3['businesses'][0]['categories'][0][0] + "</p>" +
						           //  	"<p class=\"description\">" + data3['businesses'][0]['snippet_text'] + "</p>" +
						           //  	"</figcaption>" +
					            // 	"</a>" +
					            // 	"<div class=\"text-center\">" +
			              //               "<button class=\"button\" onclick=\"find_a_place(this, '#responseContainer')\" style=\"color: black;\">" +
			              //                   "<span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>" +
			              //               "</button>" +
		               //          	"</div>" +
				            	// "</div>" +
				            	"<div class=\"col-md-4 bg-hover\">" +
					            	"<a class=\"place-box\" href=\"" + chicagojson[counter]['url'] + "\">" +
						            	"<figure><img src=\"" + chicagojson[counter]['image_url'] + "\" alt=\"yelp image\" class=\"img responsive\"></figure>" +
						            	"<figcaption>" +
						            	"<h3>" + chicagojson[counter]['name'] + "</h3>" +
						            	"<p>Category: " + chicagojson[counter]['category'] + "</p>" +
						            	"<p class=\"description\">" + chicagojson[counter]['snippet_text'] + "</p>" +
						            	"</figcaption>" +
					            	"</a>" +
					            	"<div class=\"text-center\">" +
			                            "<button class=\"button\" onclick=\"find_a_place(this, '#responseContainer', '" + chicagojson[counter]['category'] + "')\" style=\"color: black;\">" +
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