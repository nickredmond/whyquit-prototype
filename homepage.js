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
	var windowHeight = window.innerHeight;
	var logoHeight = $("#mainSiteLogo").height();
	var BUFFER_HEIGHT = 75;
	var maxCarouselHeight = windowHeight - logoHeight - BUFFER_HEIGHT;

	getTopStories(function(topStories) {
		topStories.forEach(function(topStory, index) {	
			console.log("the story: " + JSON.stringify(topStory));
			var slide = document.createElement("div");
			if (index == 0) {
				slide.classList.add("carousel-item", "active");
			}
			else {
				slide.classList.add("carousel-item");
			}

			var imageAnchor = document.createElement("a");
			imageAnchor.setAttribute("href", topStory["whyquit_link"]);
			imageAnchor.setAttribute("target", "_blank");

			var slideImg = new Image(); 

			slideImg.onload = function(){
				slideImg.style.maxHeight = maxCarouselHeight + "px";
				var scalingFactor = maxCarouselHeight / slideImg.height;
				slideImg.style.maxWidth = (slideImg.width * scalingFactor) + "px";
				imageAnchor.appendChild(slideImg);
			};

			slideImg.src = ENVIRONMENT["HOST"] + "/whyquit/images/" + topStory["imageFilename"];
			slideImg.classList.add("d-block", "w-75", "carousel-image");

			var caption = document.createElement("div");
			caption.classList.add("w-75", "top-story-caption-block");
			var captionText = document.createElement("h5");
			captionText.innerHTML = topStory["title"];
			caption.appendChild(captionText);

			slide.appendChild(imageAnchor);
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