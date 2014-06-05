(function() {
    "use strict";

    var suggestionList = ["Augsburg", "Stuttgart", "Berlin", "München"];

    var page = WinJS.UI.Pages.define("default.html", {
        ready: function(element, options) {
            var searchBox = document.getElementById("searchBox");
            searchBox.addEventListener("suggestionsrequested", suggestionsRequestHandler);
            searchBox.addEventListener("querysubmitted", querySubmittedHandler);
            searchBox.winControl.focusOnKeyboardInput = true;
        },
        unload: function() {
            document.getElementById("searchBox").winControl.focusOnKeyboardInput = false;
        }
    });

    function suggestionsRequestHandler(eventObject) {
        var queryText = eventObject.detail.queryText,
            query = queryText.toLowerCase(),
            suggestionCollection = eventObject.detail.searchSuggestionCollection;
        if (queryText.length > 0) {
            for (var i = 0, len = suggestionList.length; i < len; i++) {
                if (suggestionList[i].substr(0, query.length).toLowerCase() === query) {
                    suggestionCollection.appendQuerySuggestion(suggestionList[i]);
                }
            }
        }
    }

    function querySubmittedHandler(eventObject) {
        var queryText = eventObject.detail.queryText;
        document.getElementById("messageDiv").innerHTML += queryText + "<br/>";
    }
})();