// Eine Einführung zur leeren Vorlage finden Sie in der folgenden Dokumentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (eventObject) {
        if (eventObject.detail.kind == Windows.ApplicationModel.Activation.ActivationKind.launch) {
            playAudioFile(0);
        }
    };

    function id(tagName) {
        return document.getElementById(tagName);
    }
    function playAudioFile(fileIndex) {
        try {
            var musicLibrary = Windows.Storage.KnownFolders.musicLibrary;
            musicLibrary.getFilesAsync().then(function(resultLibrary) {
                if (resultLibrary.length > 0) {
                    id("messageDiv").innerHTML +=
                        "Titel: " + resultLibrary[fileIndex].name + "<br/>";
                    id("aplayer").src = URL.createObjectURL(resultLibrary[fileIndex]);
                    id("aplayer").play();
                }
            });
        } catch (ex) {
            id("messageDiv").innerHTML +=
                "Exception: " + ex.message + "<br/>";
        }
    }

    var mediaElement;
    var ptm = Windows.Media.PlayTo.PlayToManager.getForCurrentView();

    ptm.addEventListener("sourcerequested", sourceRequestHandler, false);

    function sourceRequestHandler(e) {
        try {
            var controller;

            try {
                mediaElement = id("aplayer");
                controller = mediaElement.msPlayToSource;
            } catch (ex) {
                id("messageDiv").innerHTML +=
                    "Play To fehlgeschlagen: " + ex.message + "<br/>";
            }

            e.sourceRequest.setSource(controller);
        } catch (ex) {
            id("messageDiv").innerHTML +=
                "Exception: " + ex.message + "<br/>";
        }
    }

    app.oncheckpoint = function (args) {
    };
    app.start();
})();
