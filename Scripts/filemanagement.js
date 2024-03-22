var articleamount = 0;
const list = [];
showdown.setOption('tables', 'true');
function readFileElement(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                var converter = new showdown.Converter(),
                    text = allText,
                    allTextFormatted = converter.makeHtml(text);
                var pageName = file.split(/(\\|\/)/g).pop().replace(".md", "");

                if (pageName.indexOf(".json") > -1) {
                    if (pageName.indexOf("arch") > -1) {
                        parseJSON(allText, "arch");
                    }
                    if (pageName.indexOf("shld") > -1) {
                        parseJSON(allText, "shld");
                    }
                    if (pageName.indexOf("spear") > -1) {
                        parseJSON(allText, "spear");
                    }
                    if (pageName.indexOf("dark") > -1) {
                        parseJSON(allText, "dark");
                    }
                    if (pageName.indexOf("ptpn") > -1) {
                        parseJSON(allText, "ptpn");
                    }
                }
                else {
                    var article = document.createElement("div");
                    var paragraph = document.createElement("p");
                    article.onclick = function () { openPage(pageName) };
                    article.classList += "link";
                    paragraph.textContent = pageName.replaceAll("_", " ");
                    list.push(pageName);

                    var page = document.createElement("div");
                    page.innerHTML = allTextFormatted;
                    page.classList = "singlepage";
                    page.id = pageName;
                    page.style.display = "none";

                    articleamount += 1;
                    document.querySelector(".pagecount").textContent = articleamount + " Pages";

                    article.append(paragraph);
                    $('.articles').append(article);
                    $('.pages').append(page);
                }
            }
        }
    }
    rawFile.send(null);
}

pagelist.forEach((element) => {
    readFileElement("./Pages/" + element + ".md");
});

const options = {
    keys: ['title'],
    threshold: 0.05,
    distance: 10,
    shouldSort: true
};

const fuse = new Fuse(list, options);
list.forEach(function (e) {
    var suggestion = document.createElement("span");
    suggestion.textContent = e.replaceAll("_", " ");
    suggestion.style.display = "none";
    suggestion.classList = "suggestion link " + e;
    suggestion.onclick = function () { openPage(e); closeChildren(); clearSearch(); }
    suggestion.innerHTML = "<p>" + suggestion.innerHTML + "</p>"
    $('.searchsuggestions').append(suggestion);
});

$(".searchinputbox").on("change input", function () {
    const searchResult = fuse.search(document.querySelector(".searchinputbox").value);
    if (searchResult.length !== 0) {
        searchResult.forEach(function (e) {
            var element = "." + e.item;
            document.querySelector(element).style.display = "block";
        });
    }
    else {
        document.querySelectorAll(".suggestion").forEach(function (e) {
            e.style.display = "none";
        });
    }
});

function clearSearch() {
    $(".searchinputbox").val("");
    document.querySelectorAll(".suggestion").forEach(function (e) {
        e.style.display = "none";
    });
}

function pickableClass(e) {
    var pickedoption = e + 1;
    if (pickedoption == 1) {
        $('.singleclasscontainer').css("display", "none");
        $('.shldcontainer').css("display", "block");
    }
    if (pickedoption == 2) {
        $('.singleclasscontainer').css("display", "none");
        $('.spearcontainer').css("display", "block");
    }
    if (pickedoption == 3) {
        $('.singleclasscontainer').css("display", "none");
        $('.archcontainer').css("display", "block");
    }
    if (pickedoption == 4) {
        $('.singleclasscontainer').css("display", "none");
        $('.ptpncontainer').css("display", "block");
    }
    if (pickedoption == 5) {
        $('.singleclasscontainer').css("display", "none");
        $('.darkcontainer').css("display", "block");
    }
    classmove('reset');
}

var classamount = 7;
var classselectelement = document.querySelectorAll(".classselect")
classselectelement.forEach(function (e) {
    for (let i = 0; i < classamount; i++) {
        var div = document.createElement("div");
        var div1 = document.createElement("div");
        if (i == 0 || i == 6) {
            div.style.opacity = 0;
        }
        if (i != 3) {
            div.classList = "singleclass class" + (i + 1) + " classunselected";
        }
        else {
            div.classList = "singleclass class" + (i + 1) + " mainclass";
        }
        div1.classList = "archcontainer singleclasscontainer class" + (i + 1) + "container";
        var classname = document.createElement("span");
        classname.innerHTML = "CLASSNAME";
        div.append(classname);
        div1.append(div);
        e.append(div1);
    }
    for (let i = 0; i < classamount; i++) {
        var div = document.createElement("div");
        var div1 = document.createElement("div");
        if (i == 0 || i == 6) {
            div.style.opacity = 0;
        }
        if (i != 3) {
            div.classList = "singleclass class" + (i + 1) + " classunselected";
        }
        else {
            div.classList = "singleclass class" + (i + 1) + " mainclass";
        }
        div1.classList = "shldcontainer singleclasscontainer class" + (i + 1) + "container";
        var classname = document.createElement("span");
        classname.innerHTML = "CLASSNAME";
        div.append(classname);
        div1.append(div);
        e.append(div1);
    }
    for (let i = 0; i < classamount; i++) {
        var div = document.createElement("div");
        var div1 = document.createElement("div");
        if (i == 0 || i == 6) {
            div.style.opacity = 0;
        }
        if (i != 3) {
            div.classList = "singleclass class" + (i + 1) + " classunselected";
        }
        else {
            div.classList = "singleclass class" + (i + 1) + " mainclass";
        }
        div1.classList = "spearcontainer singleclasscontainer class" + (i + 1) + "container";
        var classname = document.createElement("span");
        classname.innerHTML = "CLASSNAME";
        div.append(classname);
        div1.append(div);
        e.append(div1);
    }
    for (let i = 0; i < classamount * 3; i++) {
        var div = document.createElement("div");
        var div1 = document.createElement("div");
        if (i <= 5 || i >= 15) {
            div.style.opacity = 0;
        }
        if (i != 10) {
            div.classList = "singleclass class" + (i + 1) + " classunselected";
        }
        else {
            div.classList = "singleclass class" + (i + 1) + " mainclass";
        }
        div1.classList = "ptpncontainer singleclasscontainer class" + (i + 1) + "container";
        var classname = document.createElement("span");
        classname.innerHTML = "CLASSNAME";
        div.append(classname);
        div1.append(div);
        e.append(div1);
    }
    for (let i = 0; i < classamount; i++) {
        var div = document.createElement("div");
        var div1 = document.createElement("div");
        if (i == 0 || i == 6) {
            div.style.opacity = 0;
        }
        if (i != 3) {
            div.classList = "singleclass class" + (i + 1) + " classunselected";
        }
        else {
            div.classList = "singleclass class" + (i + 1) + " mainclass";
        }
        div1.classList = "darkcontainer singleclasscontainer class" + (i + 1) + "container";
        var classname = document.createElement("span");
        classname.innerHTML = "CLASSNAME";
        div.append(classname);
        div1.append(div);
        e.append(div1);
    }

    $('.singleclasscontainer').css("display", "none");
    $('.archcontainer').css("display", "block");

    var controls = document.createElement("div");
    var controlsdiv = document.createElement("span");
    var controls1 = document.createElement('div');
    var controls1div = document.createElement("span");
    controls1.classList = "classlistcontrols firstclasslist";
    for (let i = 0; i < 5; i++) {
        var pickableclass = document.createElement('div');
        pickableclass.classList = "pickableclass pickableclass" + (i + 1);
        pickableclass.onclick = function () { pickableClass(i) }
        controls1div.append(pickableclass);
    }
    controls.classList = "classlistcontrols lastclasslist";
    var leftarrow = document.createElement("div");
    leftarrow.classList = "classlistcontrol classlistcontrolleft";
    leftarrow.onclick = function () { classmove("left") };
    leftarrow.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
    var rightarrow = document.createElement("div");
    rightarrow.classList = "classlistcontrol classlistcontrolright";
    rightarrow.onclick = function () { classmove("right") };
    rightarrow.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`;
    var resetbutton = document.createElement("div");
    resetbutton.classList = "classlistcontrol classlistcontrolreset";
    resetbutton.onclick = function () { classmove("reset"); };
    resetbutton.innerHTML = `<i class="fa-solid fa-rotate"></i>`;
    controlsdiv.append(leftarrow);
    controlsdiv.append(resetbutton);
    controlsdiv.append(rightarrow);
    controls.append(controlsdiv);
    controls1.append(controls1div);
    $(controls1).insertBefore('.classselect');
    $(controls).insertAfter('.classselect');
});

var primarydistance = 0;
var controlposition = 3;

var archnameArrays = [];
var archdescArrays = [];
var archskillArrays = [];
var archskilldescArrays = [];
var spearnameArrays = [];
var speardescArrays = [];
var spearskillArrays = [];
var spearskilldescArrays = [];
var shldnameArrays = [];
var shlddescArrays = [];
var shldskillArrays = [];
var shldskilldescArrays = [];
var darknameArrays = [];
var darkdescArrays = [];
var darkskillArrays = [];
var darkskilldescArrays = [];
var ptpnnameArrays = [];
var ptpndescArrays = [];
var ptpnskillArrays = [];
var ptpnskilldescArrays = [];

readFileElement("./JSON/archclasses.json");
readFileElement("./JSON/spearclasses.json");
readFileElement("./JSON/shldclasses.json");
readFileElement("./JSON/darkclasses.json");
readFileElement("./JSON/ptpnclasses.json");

function parseJSON(content, char) {
    var parsedJSON = JSON.parse(content);
    if (char == "arch") {
        $(".archcontainer").ready(function () {
            for (mainclasscontainer = 1; mainclasscontainer < 8; mainclasscontainer++) {
                archnameArrays.push((parsedJSON[mainclasscontainer])[0].name);
                archdescArrays.push((parsedJSON[mainclasscontainer])[0].description);
                archskillArrays.push((parsedJSON[mainclasscontainer])[0].skillname);
                archskilldescArrays.push((parsedJSON[mainclasscontainer])[0].skilldescription);

                var jsoncontent = ((parsedJSON[mainclasscontainer])[0].name);
                var maskdiv = document.createElement("div");
                var maskanotherdiv = document.createElement('div');
                var maskimage = document.createElement("img");
                maskimage.width = "100";

                maskdiv.style.scale = window.innerWidth * 0.0005;
                maskdiv.classList = "heromaskdiv";
                if (parsedJSON[mainclasscontainer][0].mask != "") {
                    maskimage.src = "./Assets/masks/" + parsedJSON[mainclasscontainer][0].name + "/" + parsedJSON[mainclasscontainer][0].mask + ".png";
                }
                else {
                    maskimage.src = "./Assets/masks/Yumiyacha/0000000098e8ef493218954c.png";
                }
                maskimage.classList = "heromask";
                $('.archcontainer .singleclass span')[mainclasscontainer - 1].textContent = jsoncontent;
                maskanotherdiv.append(maskimage);
                maskdiv.append(maskanotherdiv);
                $('.archcontainer .singleclass')[mainclasscontainer - 1].append(maskdiv);
            }
        });
    }
    if (char == "shld") {
        $(".shldcontainer").ready(function () {
            for (mainclasscontainer = 1; mainclasscontainer < 8; mainclasscontainer++) {
                shldnameArrays.push((parsedJSON[mainclasscontainer])[0].name);
                shlddescArrays.push((parsedJSON[mainclasscontainer])[0].description);
                shldskillArrays.push((parsedJSON[mainclasscontainer])[0].skillname);
                shldskilldescArrays.push((parsedJSON[mainclasscontainer])[0].skilldescription);

                var jsoncontent = ((parsedJSON[mainclasscontainer])[0].name);
                var maskdiv = document.createElement("div");
                var maskanotherdiv = document.createElement('div');
                var maskimage = document.createElement("img");
                maskimage.width = "100";

                maskdiv.style.scale = window.innerWidth * 0.0005;
                maskdiv.classList = "heromaskdiv";
                if (parsedJSON[mainclasscontainer][0].mask != "") {
                    maskimage.src = "./Assets/masks/" + parsedJSON[mainclasscontainer][0].name + "/" + parsedJSON[mainclasscontainer][0].mask + ".png";
                }
                else {
                    maskimage.src = "./Assets/masks/Yumiyacha/0000000098e8ef493218954c.png";
                }
                maskimage.classList = "heromask";
                $('.shldcontainer .singleclass span')[mainclasscontainer - 1].textContent = jsoncontent;
                maskanotherdiv.append(maskimage);
                maskdiv.append(maskanotherdiv);
                $('.shldcontainer .singleclass')[mainclasscontainer - 1].append(maskdiv);
            }
        });
    }
    if (char == "spear") {
        $(".spearcontainer").ready(function () {
            for (mainclasscontainer = 1; mainclasscontainer < 8; mainclasscontainer++) {
                spearnameArrays.push((parsedJSON[mainclasscontainer])[0].name);
                speardescArrays.push((parsedJSON[mainclasscontainer])[0].description);
                spearskillArrays.push((parsedJSON[mainclasscontainer])[0].skillname);
                spearskilldescArrays.push((parsedJSON[mainclasscontainer])[0].skilldescription);

                var jsoncontent = ((parsedJSON[mainclasscontainer])[0].name);
                var maskdiv = document.createElement("div");
                var maskanotherdiv = document.createElement('div');
                var maskimage = document.createElement("img");
                maskimage.width = "100";

                maskdiv.style.scale = window.innerWidth * 0.0005;
                maskdiv.classList = "heromaskdiv";
                if (parsedJSON[mainclasscontainer][0].mask != "") {
                    maskimage.src = "./Assets/masks/" + parsedJSON[mainclasscontainer][0].name + "/" + parsedJSON[mainclasscontainer][0].mask + ".png";
                }
                else {
                    maskimage.src = "./Assets/masks/Yumiyacha/0000000098e8ef493218954c.png";
                }
                maskimage.classList = "heromask";
                $('.spearcontainer .singleclass span')[mainclasscontainer - 1].textContent = jsoncontent;
                maskanotherdiv.append(maskimage);
                maskdiv.append(maskanotherdiv);
                $('.spearcontainer .singleclass')[mainclasscontainer - 1].append(maskdiv);
            }
        });
    }
    if (char == "ptpn") {
        $(".ptpncontainer").ready(function () {
            for (mainclasscontainer = 1; mainclasscontainer < 22; mainclasscontainer++) {
                ptpnnameArrays.push((parsedJSON[mainclasscontainer])[0].name);
                ptpndescArrays.push((parsedJSON[mainclasscontainer])[0].description);
                ptpnskillArrays.push((parsedJSON[mainclasscontainer])[0].skillname);
                ptpnskilldescArrays.push((parsedJSON[mainclasscontainer])[0].skilldescription);

                var jsoncontent = ((parsedJSON[mainclasscontainer])[0].name);
                var maskdiv = document.createElement("div");
                var maskanotherdiv = document.createElement('div');
                var maskimage = document.createElement("img");
                maskimage.width = "100";

                maskdiv.style.scale = window.innerWidth * 0.0005;
                maskdiv.classList = "heromaskdiv";
                if (parsedJSON[mainclasscontainer][0].mask != "") {
                    maskimage.src = "./Assets/masks/" + parsedJSON[mainclasscontainer][0].name + "/" + parsedJSON[mainclasscontainer][0].mask + ".png";
                }
                else {
                    maskimage.src = "./Assets/masks/Yumiyacha/0000000098e8ef493218954c.png";
                }
                maskimage.classList = "heromask";
                $('.ptpncontainer .singleclass span')[mainclasscontainer - 1].textContent = jsoncontent;
                maskanotherdiv.append(maskimage);
                maskdiv.append(maskanotherdiv);
                $('.ptpncontainer .singleclass')[mainclasscontainer - 1].append(maskdiv);
            }
        });
    }
    if (char == "dark") {
        $(".darkcontainer").ready(function () {
            for (mainclasscontainer = 1; mainclasscontainer < 8; mainclasscontainer++) {
                darknameArrays.push((parsedJSON[mainclasscontainer])[0].name);
                darkdescArrays.push((parsedJSON[mainclasscontainer])[0].description);
                darkskillArrays.push((parsedJSON[mainclasscontainer])[0].skillname);
                darkskilldescArrays.push((parsedJSON[mainclasscontainer])[0].skilldescription);

                var jsoncontent = ((parsedJSON[mainclasscontainer])[0].name);
                var maskdiv = document.createElement("div");
                var maskanotherdiv = document.createElement('div');
                var maskimage = document.createElement("img");
                maskimage.width = "100";

                maskdiv.style.scale = window.innerWidth * 0.0005;
                maskdiv.classList = "heromaskdiv";
                if (parsedJSON[mainclasscontainer][0].mask != "") {
                    maskimage.src = "./Assets/masks/" + parsedJSON[mainclasscontainer][0].name.toLowerCase(); + "/" + parsedJSON[mainclasscontainer][0].mask + ".png";
                }
                else {
                    maskimage.src = "./Assets/masks/Yumiyacha/0000000098e8ef493218954c.png";
                }
                maskimage.classList = "heromask";
                $('.darkcontainer .singleclass span')[mainclasscontainer - 1].textContent = jsoncontent;
                maskanotherdiv.append(maskimage);
                maskdiv.append(maskanotherdiv);
                $('.darkcontainer .singleclass')[mainclasscontainer - 1].append(maskdiv);
            }
        });
    }
}

$('.classselect').css("transform", "matrix(1, 0, 0, 1, " + primarydistance * 3 + ", 0)");
function classmove(direction) {
    var distance = Math.round($(".singleclasscontainer:visible").width() + (0.04 * window.innerWidth));
    var position = ($('.classselect').css("transform").replace(/[^0-9\-.,]/g, '').split(','));
    $('.firstclasslist').css("margin-bottom", distance / 12);
    $('.lastclasslist').css("margin-top", distance / 12);
    if (direction == "left" && controlposition != 0) {
        controlposition -= 1;
        var distanceleft = (parseInt(position[4]) + distance);
        $('.classselect').css("transform", "matrix(1, 0, 0, 1, " + distanceleft + ", 0)");
    }
    if (direction == "right" && controlposition != 6) {
        controlposition += 1;
        var distanceright = (parseInt(position[4]) - distance);
        $('.classselect').css("transform", "matrix(1, 0, 0, 1, " + distanceright + ", 0)");
    }
    if (direction == "reset") {
        controlposition = 3;
        if ($($('.classselect .singleclasscontainer:visible')[controlposition]).hasClass("ptpncontainer")) {
            controlposition = 10;
        }
        $('.classselect').css("transform", "matrix(1, 0, 0, 1, " + primarydistance * 3 + ", 0)");
    }
    var chosenclass = ($($('.classselect .singleclasscontainer:visible')[controlposition]));
    var othercontainers = $($($('.classselect .singleclasscontainer:visible'))).not(chosenclass);
    chosenclass.children().removeClass("classunselected").css("transform", "scale(1.35)").css("z-index", "1").children().css("clip-path", "inset(0px)");
    othercontainers.children().addClass('classunselected').css("transform", "scale(1)").css("z-index", "0").children().css("clip-path", "inset(4px)");
    $('.classselect .singleclasscontainer:visible').children().css("opacity", "0");
    for (i = -2; i < 3; i++) {
        var visibleelements = ($($('.classselect .singleclasscontainer:visible')[controlposition + i]));
        visibleelements.children().css("opacity", "1");
    }
    if ($(chosenclass).hasClass("archcontainer")) {
        $('.classtitle').text((archnameArrays)[controlposition]);
        $('.classdescription').text((archdescArrays)[controlposition]);
        $('.skilltitle').text((archskillArrays)[controlposition]);
        $('.skilldescription').html((archskilldescArrays)[controlposition]);
    }
    if ($(chosenclass).hasClass("spearcontainer")) {
        $('.classtitle').text((spearnameArrays)[controlposition]);
        $('.classdescription').text((speardescArrays)[controlposition]);
        $('.skilltitle').text((spearskillArrays)[controlposition]);
        $('.skilldescription').html((spearskilldescArrays)[controlposition]);
    }
    if ($(chosenclass).hasClass("shldcontainer")) {
        $('.classtitle').text((shldnameArrays)[controlposition]);
        $('.classdescription').text((shlddescArrays)[controlposition]);
        $('.skilltitle').text((shldskillArrays)[controlposition]);
        $('.skilldescription').html((shldskilldescArrays)[controlposition]);
    }
    if ($(chosenclass).hasClass("darkcontainer")) {
        $('.classtitle').text((darknameArrays)[controlposition]);
        $('.classdescription').text((darkdescArrays)[controlposition]);
        $('.skilltitle').text((darkskillArrays)[controlposition]);
        $('.skilldescription').html((darkskilldescArrays)[controlposition]);
    }
    if ($(chosenclass).hasClass("ptpncontainer")) {
        $('.classtitle').text((ptpnnameArrays)[controlposition]);
        $('.classdescription').text((ptpndescArrays)[controlposition]);
        $('.skilltitle').text((ptpnskillArrays)[controlposition]);
        $('.skilldescription').html((ptpnskilldescArrays)[controlposition]);
    }
}

window.onkeydown = function (e) {
    if (e.which == 65 || e.code == "KeyA" || e.which == 37 || e.code == "ArrowLeft") {
        classmove("left");
    }
    if (e.which == 68 || e.code == "KeyD" || e.which == 39 || e.code == "ArrowRight") {
        classmove('right');
    }
}

var flexinformationcontainer = document.createElement("div");
flexinformationcontainer.style.display = "flex";
flexinformationcontainer.classList = "classinformation";

var classcontainer = document.createElement('div');
var classtitle = document.createElement("div");
var classdescription = document.createElement('div');

classcontainer.classList = "classcontainer";
classtitle.classList = "classtitle";
classdescription.classList = "classdescription";

classcontainer.append(classtitle);
classcontainer.append(classdescription);

var skillcontainer = document.createElement('div');
var skilltitle = document.createElement('div');
var skilldescription = document.createElement('div');

skillcontainer.classList = "skillcontainer";
skilltitle.classList = "skilltitle";
skilldescription.classList = "skilldescription";

skillcontainer.append(skilltitle);
skillcontainer.append(skilldescription);

flexinformationcontainer.append(classcontainer);
flexinformationcontainer.append(skillcontainer);
$(flexinformationcontainer).insertAfter('.lastclasslist');

$(document).ready(function () {
    var images = Array.prototype.map.call(document.images, img => img.src);
    images.forEach(function (image) {
        var duplicateimage = false;
        var duplicatename = false;
        var imagepath = image.slice(image.indexOf("/Assets"), image.indexOf(".png") + 4);
        var imagename = imagepath.split(/(\\|\/)/g).pop();

        var div = document.createElement("div");
        div.classList = "imagegalleryelement";
        var img = document.createElement("img");
        img.src = "." + imagepath;
        var name = document.createElement("p");
        name.textContent = imagename;
        var duplicateimagecheck = document.querySelectorAll(".imagegalleryelement img");
        var duplicatenamecheck = document.querySelectorAll(".imagegalleryelement p");
        duplicateimagecheck.forEach(function (dupimage) {
            if (dupimage.src == image) {
                duplicateimage = true;
            }
            else {
                duplicateimage = false;
            }
        });
        duplicatenamecheck.forEach(function (dupname) {
            if (dupname.textContent == imagename) {
                duplicatename = true;
            }
            else {
                duplicatename = false;
            }
        });
        if (!duplicateimage && !duplicatename) {
            div.append(img);
            div.append(name);
            $('.imagegallerycontainer').append(div);
        }
    });
});