// var getWhyQuitDOM = function() {
// 	var url = ENVIRONMENT["HOST"] + "/whyquit/source";
// 	$.get(url, function(whyQuitContent) {
// 		var domParser = new DOMParser();
// 		return domParser.parseFromString(whyQuitContent, "text/html");
// 	})
// };

var getTopStories = function(onTopStoriesReturned) {
	var url = ENVIRONMENT["HOST"] + "/whyquit/top-stories";
	$.get(url, function(topStories) {
		onTopStoriesReturned(topStories);
	});
}

var hexToBase64 = function(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
};

document.addEventListener("DOMContentLoaded", function(event) {
	// var whyQuitDOM = getWhyQuitDOM();
	// var earlyDeathPicutres = document.getElementsByTagName("body")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0];
	//  console.log("yep " + earlyDeathPicutre);
	getTopStories(function(topStories) {
		topStories.forEach(function(topStory, index) {	
			console.log("the story: " + JSON.stringify(topStory));
			var slide = document.createElement("div");
			var slideClasslist = ["carousel-item"];
			if (index == 0) {
				slideClasslist.push("active");
			}
			slide.classList.add(slideClasslist);

			var image = document.createElement("img");
			image.classList.add("d-block", "w-100", "carousel-image");
			image.setAttribute("src", ENVIRONMENT["HOST"] + "/whyquit/images/" + topStory["imageFilename"]);

			// var imageUrl = ENVIRONMENT["HOST"] + "/whyquit/images/" + topStory["imageFilename"];
			// $.get(imageUrl, function(imageBinaryData) {
			// 	//var base64EncodedData = btoa(imageBinaryData);
			// 	image.setAttribute("src", "data:image/jpeg;base64," + hexToBase64(imageBinaryData));
			// });

			var caption = document.createElement("div");
			caption.classList.add(["carousel-caption", "d-md-block"]);
			var captionText = document.createElement("h5");
			captionText.innerHTML = topStory["title"];
			caption.appendChild(captionText);

			slide.appendChild(image);
			slide.appendChild(caption);

			var slidesContainer = document.getElementById("slidesContainer");
			slidesContainer.appendChild(slide);
		});
		
		var indicators = document.getElementById("tobaccoDeathsCarouselIndicators");
		for (var i = 0; i < topStories.length; i++) {
			var indicator = document.createElement("li");
			indicator.setAttribute("data-target", "#tobaccoDeathsCarouselIndicators");
			indicator.setAttribute("data-slide-to", i);

			if (i == 0) {
				indicator.classList.add(["active"]);
			}
			indicators.appendChild(indicator);
		}
	});
});