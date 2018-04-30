// var getWhyQuitDOM = function() {
// 	var url = ENVIRONMENT["HOST"] + "/whyquit/source";
// 	$.get(url, function(whyQuitContent) {
// 		var domParser = new DOMParser();
// 		return domParser.parseFromString(whyQuitContent, "text/html");
// 	})
// };

var getInfoFromServer = function(onInfoReturned, path) {
	var url = ENVIRONMENT["HOST"] + "/" + path;
	$.get(url, function(info) {
		onInfoReturned(info);
	});
}
var getTopStories = function(onTopStoriesReturned) {
	getInfoFromServer(onTopStoriesReturned, "whyquit/top-stories");
};
var getSecondaryStories = function(onSecondaryStoriesReturned) {
	getInfoFromServer(onSecondaryStoriesReturned, "whyquit/secondary-stories");
};
var getTooYoungCardsInfo = function(onTooYoungInfoReturned) {
	getInfoFromServer(onTooYoungInfoReturned, "whyquit/too-young");
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

var makeTooYoungCardRow = function() {
	var row = document.createElement("row");
	row.classList.add("row", "image-cards-row", "w-75");
	return row;
};

var populateTooYoungCards = function(tooYoungCardsInfo) {
	const CARDS_PER_ROW = 3;
	var tooYoungCardsContainer = document.getElementById("diedTooYoungContainer");
	var currentRow = makeTooYoungCardRow();

	tooYoungCardsInfo.forEach(function(cardInfo, index) {
		if (index % CARDS_PER_ROW == 0) {
			tooYoungCardsContainer.appendChild(currentRow);
			currentRow = makeTooYoungCardRow();
		}

		var cardInfoArea = document.createElement("div");
		cardInfoArea.classList.add("col-sm-4");

		var cardInfoLink = document.createElement("a");
		cardInfoLink.classList.add("too-young-story-link");
		cardInfoLink.setAttribute("href", cardInfo["whyquit_link"]);
		cardInfoLink.setAttribute("target", "_blank");
		
		var cardTitle = document.createElement("div");
		cardTitle.classList.add("image-card-title");

		var cardTitleText = document.createElement("p");
		cardTitleText.classList.add("image-card-title-text");
		cardTitleText.innerHTML = cardInfo["victim_name"];
		cardTitle.appendChild(cardTitleText);

		var cardTitleSubtext = document.createElement("p");
		var subtextSmall = document.createElement("small");
		subtextSmall.innerHTML = cardInfo["victim_age"] + " years old";
		cardTitleSubtext.appendChild(subtextSmall);
		cardTitle.appendChild(cardTitleSubtext);

		var cardImage = new Image();
		cardImage.onload = function() {
			cardInfoLink.appendChild(cardImage);
			cardInfoLink.appendChild(cardTitle);
		};
		cardImage.src = ENVIRONMENT["HOST"] + "/whyquit/images/too-young/" + cardInfo["imageFilename"];
		cardImage.classList.add("card-img-top");

		cardInfoArea.appendChild(cardInfoLink);
		currentRow.appendChild(cardInfoArea);
		
		tooYoungCardsContainer.appendChild(currentRow);
	});
};

document.addEventListener("DOMContentLoaded", function(event) {
	document.getElementById("whyquit-icon").src = ENVIRONMENT["HOST"] + "/whyquit/images/icons/whyquit-icon.ico";

	getTopStories(addTopStoriesToPage);
	getSecondaryStories(addSecondaryStoriesToPage);
	getTooYoungCardsInfo(populateTooYoungCards);
});