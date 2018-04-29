// var getWhyQuitDOM = function() {
// 	var url = ENVIRONMENT["HOST"] + "/whyquit/source";
// 	$.get(url, function(whyQuitContent) {
// 		var domParser = new DOMParser();
// 		return domParser.parseFromString(whyQuitContent, "text/html");
// 	})
// };

var getStories = function(onStoriesReturned, path) {
	var url = ENVIRONMENT["HOST"] + "/" + path;
	$.get(url, function(topStories) {
		onStoriesReturned(topStories);
	});
}
var getTopStories = function(onTopStoriesReturned) {
	getStories(onTopStoriesReturned, "whyquit/top-stories");
};
var getSecondaryStories = function(onSecondaryStoriesReturned) {
	getStories(onSecondaryStoriesReturned, "whyquit/secondary-stories");
};

var getMaxCarouselHeight = function() {
	var windowHeight = window.innerHeight;
	var logoHeight = $("#mainSiteLogo").height();
	var BUFFER_HEIGHT = 75;
	return windowHeight - logoHeight - BUFFER_HEIGHT;
};

var addTopStoriesToPage = function(topStories) {
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

		var maxCarouselHeight = getMaxCarouselHeight();
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
};

var addSecondaryStoriesToPage = function(secondaryStories) {
	var secondaryStoriesList = document.getElementById("secondaryStoriesList");
	
	secondaryStories.forEach(function(secondaryStory) {
		var listItemLink = document.createElement("a");
		listItemLink.setAttribute("href", secondaryStory["whyquit_link"]);
		listItemLink.setAttribute("target", "_blank");
		listItemLink.classList.add("list-group-item", "list-group-item-action", "flex-column", "align-items-start");

		var storyTitleContainer = document.createElement("div");
		storyTitleContainer.classList.add("d-flex", "w-100", "justify-content-between");
		
		var storyTitle = document.createElement("h5");
		storyTitle.classList.add("mb-1");
		storyTitle.innerHTML = secondaryStory["title"];
		storyTitleContainer.appendChild(storyTitle);
		listItemLink.appendChild(storyTitleContainer);

		var storyDescription = document.createElement("p");
		storyDescription.classList.add("mb-1", "text-muted");
		storyDescription.innerHTML = secondaryStory["description"];
		listItemLink.appendChild(storyDescription);

		secondaryStoriesList.appendChild(listItemLink);
	});
};

document.addEventListener("DOMContentLoaded", function(event) {
	getTopStories(addTopStoriesToPage);
	getSecondaryStories(addSecondaryStoriesToPage);
});