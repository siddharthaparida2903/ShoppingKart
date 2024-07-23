var loadStarRatings = (containerRef, rating) => { // rating 2.5
    var fullStarCount = parseInt(rating);
    var halfStarCount = (rating % 1 == 0) ? 0 : 1;
    var disabledStarCount = 5 - (fullStarCount + halfStarCount);
    var mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "ratingBlock");

    for (var i = 0 ; i < fullStarCount; i++) {
        var fullstarDiv = document.createElement("div");
        fullstarDiv.setAttribute("class", "fullStar");

        mainDiv.append(fullstarDiv);
    }
    if (halfStarCount) {
        var halfStar = document.createElement("div");
        halfStar.setAttribute("class", "halfStar");
        mainDiv.append(halfStar);
    }
    for (var i = 0 ; i < disabledStarCount; i++) {
        var disableStarDiv = document.createElement("div");
        disableStarDiv.setAttribute("class", "disabledStar");

        mainDiv.append(disableStarDiv);
    }
    document.querySelector(containerRef).append(mainDiv);
}