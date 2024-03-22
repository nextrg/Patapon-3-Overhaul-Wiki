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
    basicTheme();
}
if (localStorage.style == "acrylic") {
    $('#styles').val("acrylic");
    acrylicTheme();
}

function acrylicTheme() {
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
function basicTheme() {
    $(document).ready(function () {
        $('.pages').removeClass("acrylic-main");
        $('.mainarticles').removeClass("acrylic-container");
        $('.helpnotification').removeClass("acrylic-container");
        $('.articlelist').removeClass("acrylic-container");
        $('.classcontainer').removeClass("acrylic-container");
        $('.skillcontainer').removeClass("acrylic-container");
        $('.classlistcontrols span').removeClass("acrylic-container");
        $('table').removeClass("acrylic-container");
    });
}

$("#styles").change(function () {
    var style = $(this).val();
    if (style == "acrylic") {
        acrylicTheme();
        localStorage.setItem("style", "acrylic");
    }
    if (style == "basic") {
        basicTheme();
        localStorage.setItem("style", "basic");
    }
});