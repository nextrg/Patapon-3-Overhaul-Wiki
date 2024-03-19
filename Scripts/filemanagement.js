var articleamount = 0;
const list = [];

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
    rawFile.send(null);
}

pagelist.forEach((element) => {
    readFileElement("/Pages/" + element + ".md");
});

var images = Array.prototype.map.call(document.images, img => img.src);
images.forEach(function (image) {
    var duplicateimage = false;
    var duplicatename = false;
    var incorrectimage = false;
    var imagepath = image.slice(image.indexOf("/Assets"), image.indexOf(".png") + 4);
    var imagename = imagepath.replace(".png", "").replace("/Assets/", "");

    var div = document.createElement("div");
    div.classList = "imagegalleryelement";
    var img = document.createElement("img");
    img.src = imagepath;
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