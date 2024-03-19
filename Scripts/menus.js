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
    $('.pages').addClass("style1");
    $('.link').css("filter", "drop-shadow(0px 0px 1px black)");
}
function basicTheme() {
    $('.pages').removeClass("style1");
    $('.link').css("filter", "none");
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