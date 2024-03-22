function hidePages() {
    var pages = document.querySelectorAll(".singlepage")
    pages.forEach(function (e) {
        e.style.display = "none";
    });
}

function openPage(element) {
    hidePages();
    if (typeof element === 'object') {
        var page = element;
        document.title = element.id.replaceAll("_", " ");
    }
    else {
        var page = document.querySelector("#" + element);
        document.title = element.replaceAll("_", " ");
    }
    page.style.display = "block";
    if (page.classList.contains("clicked")) {
        if (page.scrollHeight > element.clientHeight) {
            $('.scrollbar').css("opacity", "100%");
        }
        else {
            $('.scrollbar').css("opacity", "0%");
        }
    }
    classmove('reset');
}

function goHome() {
    hidePages();
    document.title = "Home";
    var home = document.getElementById("Home");
    home.style.display = "block";
    if (home.classList.contains("clicked")) {
        if (home.scrollHeight > homeid.clientHeight) {
            $('.scrollbar').css("opacity", "100%");
        }
        else {
            $('.scrollbar').css("opacity", "0%");
        }
    }
}

goHome();