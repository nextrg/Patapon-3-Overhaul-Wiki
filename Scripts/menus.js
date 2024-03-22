function closeChildren() {
    Array.from(document.querySelector('.imagegallerybackground').children).forEach(function (e) {
        document.querySelector('.imagegallerybackground').style.display = "none";
        e.style.display = "none";
    });
}

function showImageGallery() {
    closeChildren();
    $('.imagegallerybackground').css("display", "block");
    $('.imagegallery').css("display", "flex");
}

function showSearchMenu() {
    closeChildren();
    $('.imagegallerybackground').css("display", "block");
    $('.searchmenu').css("display", "block");
}

function showSettings() {
    closeChildren();
    $('.imagegallerybackground').css("display", "block");
    $('.settings').css("display", "flex");
}

if (localStorage.style == undefined) {
    localStorage.setItem("style", "basic");
}
if (localStorage.style == "basic") {
    $('#styles').val("basic");
    clearTheme();
}
if (localStorage.style == "acrylic") {
    $('#styles').val("acrylic");
    acrylicTheme();
}
if (localStorage.style == "darkhero") {
    $('#styles').val("darkhero");
    darkheroTheme();
}

function acrylicTheme() {
    clearTheme();
    $(document).ready(function () {
        $('.pages').addClass("acrylic-main");
        $('.mainarticles').addClass("acrylic-container");
        $('.helpnotification').addClass("acrylic-container");
        $('.articlelist').addClass("acrylic-container");
        $('.classcontainer').addClass("acrylic-container");
        $('.skillcontainer').addClass("acrylic-container");
        $('.classlistcontrols span').addClass("acrylic-container");
        $('table').addClass("acrylic-container");
    });
}

function darkheroTheme() {
    clearTheme();
    $(document).ready(function() {
        $('.pages').addClass("darkhero-main");
        $('.mainarticles').addClass("darkhero-container");
        $('.helpnotification').addClass("darkhero-container");
        $('.articlelist').addClass("darkhero-container");
        $('.classcontainer').addClass("darkhero-container");
        $('.skillcontainer').addClass("darkhero-container");
        $('.classlistcontrols span').addClass("darkhero-container");
        $('table').addClass("darkhero-container");
    });
}

function clearTheme() {
    $(document).ready(function () {
        $('.pages').removeClass("acrylic-main").removeClass("darkhero-main");
        $('.mainarticles').removeClass("acrylic-container").removeClass("darkhero-container");
        $('.helpnotification').removeClass("acrylic-container").removeClass("darkhero-container");
        $('.articlelist').removeClass("acrylic-container").removeClass("darkhero-container");
        $('.classcontainer').removeClass("acrylic-container").removeClass("darkhero-container");
        $('.skillcontainer').removeClass("acrylic-container").removeClass("darkhero-container");
        $('.classlistcontrols span').removeClass("acrylic-container").removeClass("darkhero-container");
        $('table').removeClass("acrylic-container").removeClass("darkhero-container");
    });
}

$("#styles").change(function () {
    var style = $(this).val();
    if (style == "acrylic") {
        acrylicTheme();
        localStorage.setItem("style", "acrylic");
    }
    if (style == "basic") {
        clearTheme();
        localStorage.setItem("style", "basic");
    }
    if (style == "darkhero") {
        darkheroTheme();
        localStorage.setItem("style", "darkhero");
    }
});