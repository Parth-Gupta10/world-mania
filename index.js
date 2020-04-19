var response = [];
var j = 0;
var card_clicked = false;

var darkModeActive = false;

function disp() {
  $(".homeNav").show();
  $(".btn").hide();

  var http = new XMLHttpRequest();
  // var params = JSON.stringify({
  //   url: entered_url
  // });
  var url = 'https://restcountries.eu/rest/v2/all';

  http.open('GET', url, true);

  //Send the proper header information along with the request
  // http.setRequestHeader('Content-type', 'application/json');

  http.onreadystatechange = function() {
    //Call a function when the state changes.
    if (http.readyState == 4 && http.status == 200) {
      response = JSON.parse(http.responseText);
      addHtml();
      // console.log(response);
    }
  }
  http.send();
}

function search() {
  j = 0;
  var searchText = $(".search")[0].value;
  console.log(searchText);
  if (searchText == undefined || searchText == "") {
    disp();
  } else {
    var http = new XMLHttpRequest();
    // var params = JSON.stringify({
    //   name: searchText
    // });
    var url = 'https://restcountries.eu/rest/v2/name/' + searchText;

    http.open('GET', url, true);

    http.onreadystatechange = function() {
      //Call a function when the state changes.
      if (http.readyState == 4 && http.status == 200) {
        response = JSON.parse(http.responseText);
        // console.log(response);
        addHtml();
      }
      if (http.readyState == 4 && http.status == 404) {
        var errorTxt = "<p class= 'error'>Oops! that was not a country. Please search a valid country name.";
        $(".errorDiv").append(errorTxt);
        console.log("error");
      }
    }
    http.send();
  }
  checkDarkMode();
  checkDarkMode();
}

function addHtml() {

  $(".output").empty();
  $(".major").empty();
  $(".errorDiv").empty();

  // console.log(response);

  for (var i = 0; i < response.length; i++) {

    if (response[i].capital == "" || response[i].capital == undefined) {
      response[i].capital = "None";
    }

    var temp = "'" + response[i].name + "'";

    var txt = '<div class="col mb-4"><div class="card" onclick= "dispInfo(' + temp + ')"> <img src="' + response[i].flag + '" class="card-img-top" style="height: 145px; width: 100%; border-style: solid; border-width: thin;" alt="' + response[i].name + ' flag"><div class="card-body"> <b><h3>' + response[i].name + '</h3></b><p class="card-text"><b>Population:</b> ' + response[i].population + '</p> <p class="card-text"><b>Region:</b> ' + response[i].region + '</p>   <p class="card-text"><b>Capital:</b> ' + response[i].capital + '</p>  </div></div> </div>'

    if (i < 8) {
      $(".output").append(txt);
    } else {
      break;
    }
  }
  j = 0;
  $(document.body).on('touchmove', onScroll); // for mobile
  $(window).on('scroll', onScroll);
  function onScroll() {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
      j = j + 8;
      for (var i = j; i < j + 8; i++) {
        if (i >= response.length) {
          return;
        }

        if (response[i] == undefined) {
          return;
        }

        if (response[i].capital == "" || response[i].capital == undefined) {
          response[i].capital = "None";
        }

        var temp2 = "'" + response[i].name + "'";
        var txt = '<div class="col mb-4"><div class="card" onclick= "dispInfo(' + temp2 + ')"> <img src="' + response[i].flag + '" class="card-img-top" style="height: 145px; width: 100%; border-style: solid; border-width: thin;" alt="' + response[i].name + ' flag"><div class="card-body"> <b><h3>' + response[i].name + '</h3></b><p class="card-text"><b>Population:</b> ' + response[i].population + '</p> <p class="card-text"><b>Region:</b> ' + response[i].region + '</p> <p class="card-text"><b>Capital:</b> ' + response[i].capital + '</p>  </div></div> </div>'
        $(".output").append(txt);
      }
    }
  }
  checkDarkMode();
  checkDarkMode();
}

function dispInfo(name) {

  var navTxt = '<div class= "row"><button class= "btn btn-lg homeBtn" onclick= "disp()"><span style= "padding-right: 8px;"><i class="fas fa-arrow-left" id="back-icon"></i></span>Home</button></div>';
  $(".output").empty();
  $(".errorDiv").empty();
  $(".homeNav").hide();
  $("nav").append(navTxt);
  card_clicked = true;

  var country_clicked = String(name);

  var http = new XMLHttpRequest();
  // var params = JSON.stringify({
  //   name: searchText
  // });
  var url = 'https://restcountries.eu/rest/v2/name/' + country_clicked + '?fullText=true';

  http.open('GET', url, true);
  http.onreadystatechange = function() {
    //Call a function when the state changes.
    if (http.readyState == 4 && http.status == 200) {
      response = JSON.parse(http.responseText);
      infoHtml(response);
    }
  }
  http.send();
  checkDarkMode();
  checkDarkMode();
}

function infoHtml(response) {

  $(".output").empty();
  var lang = [];
  var currencies = [];

  var res = [];

  if (response[0].capital == "" || response[0].capital == undefined) {
    response[0].capital = "None";
  }

  if (response[0].subregion == "" || response[0].subregion == undefined) {
    response[0].subregion = "None";
  }

  var url = 'https://restcountries.eu/rest/v2/alpha?codes=';

  for (var i = 0; i < response[0].borders.length; i++) {
    url = url + response[0].borders[i] + ';';
  }

  if (response[0].borders == "" || response[0].borders == undefined) {

    // console.log(response);
    for (var i = 0; i < response[0].languages.length; i++) {
      lang.push(' ' + response[0].languages[i].name);
    }

    for (var i = 0; i < response[0].currencies.length; i++) {
      currencies.push(' ' + response[0].currencies[i].name + '(' + response[0].currencies[i].symbol + ')');
    }

    var infoTxt = '<div class="row"><div class="col-lg-6 bottomSpace"> <img src="' + response[0].flag + '" alt="' + response[0].name + ' flag"> </div> <div class="col-lg-6 content"> <h3>' + response[0].name + '</h3> <br> <div class="row"> <div class="col-lg-6 bottomSpace"> <p><b>Native Name:</b> ' + response[0].nativeName + '</p> <p><b>Population:</b> ' + response[0].population + '</p> <p><b>Region:</b> ' + response[0].region + '</p> <p><b>Sub-Region:</b> ' + response[0].subregion + '</p> <p><b>Capital:</b> ' + response[0].capital + '</p></div><div class="col-lg-6"><p><b>Top Level Domain:</b> ' + response[0].topLevelDomain + '</p> <p><b>Currencies:</b> ' + currencies + '</p> <p><b>Languages:</b> ' + lang + '</p> </div> </div><br><div class="row"> <div class="col-lg-4"> <b>Border Countries:</b></div> <div class="col-lg-8"><div class="row borderBtnRow"></div></div>  </div></div> </div>';

    $(".major").append(infoTxt);

    $(".borderBtnRow").append("None");

  } else {

    var http = new XMLHttpRequest();

    http.open('GET', url, true);
    http.onreadystatechange = function() {
      //Call a function when the state changes.
      if (http.readyState == 4 && http.status == 200) {
        res = JSON.parse(http.responseText);

        // console.log(response);
        for (var i = 0; i < response[0].languages.length; i++) {
          lang.push(' ' + response[0].languages[i].name);
        }

        for (var i = 0; i < response[0].currencies.length; i++) {
          currencies.push(' ' + response[0].currencies[i].name + '(' + response[0].currencies[i].symbol + ')');
        }

        var infoTxt = '<div class="row"><div class="col-lg-6 bottomSpace"> <img src="' + response[0].flag + '" alt="' + response[0].name + ' flag"> </div> <div class="col-lg-6 content"> <h3>' + response[0].name + '</h3> <br> <div class="row"> <div class="col-lg-6 bottomSpace"> <p><b>Native Name:</b> ' + response[0].nativeName + '</p> <p><b>Population:</b> ' + response[0].population + '</p> <p><b>Region:</b> ' + response[0].region + '</p> <p><b>Sub-Region:</b> ' + response[0].subregion + '</p> <p><b>Capital:</b> ' + response[0].capital + '</p></div><div class="col-lg-6"><p><b>Top Level Domain:</b> ' + response[0].topLevelDomain + '</p> <p><b>Currencies:</b> ' + currencies + '</p> <p><b>Languages:</b> ' + lang + '</p> </div> </div><br><div class="row"> <div class="col-lg-4"> <b>Border Countries:</b></div> <div class="col-lg-8"><div class="row borderBtnRow"></div></div>  </div></div> </div>';

        $(".major").append(infoTxt);

        for (var i = 0; i < res.length; i++) {
          var temp3 = "'" + res[i].name + "'";
          var btnTxt = '<button class= "btn borderBtn" onclick= "borderClicked(' + temp3 + ')">' + res[i].name + '</button>';
          $(".borderBtnRow").append(btnTxt);
        }
      }

    }
    http.send();
  }

  j = 0;
  checkDarkMode();
  checkDarkMode();

}

function borderClicked(borderName) {
  $(".major").empty();
  console.log(borderName);

  var http = new XMLHttpRequest();

  var url = 'https://restcountries.eu/rest/v2/name/' + borderName + '?fullText=true';

  http.open('GET', url, true);
  http.onreadystatechange = function() {
    //Call a function when the state changes.
    if (http.readyState == 4 && http.status == 200) {
      response = JSON.parse(http.responseText);
      infoHtml(response);
    }
  }
  http.send();
  checkDarkMode();
  checkDarkMode();
}

function regionFilter() {
  var x = $(".regions")[0];
  var i = x.selectedIndex;
  var region = x.options[i].text;

  console.log(region);

  if (i == 0) {
    disp();

  } else {

    var http = new XMLHttpRequest();

    var url = 'https://restcountries.eu/rest/v2/region/' + region;

    http.open('GET', url, true);
    http.onreadystatechange = function() {
      //Call a function when the state changes.
      if (http.readyState == 4 && http.status == 200) {
        response = JSON.parse(http.responseText);
        addHtml();
      }
    }
    http.send();
  }
  checkDarkMode();
  checkDarkMode();
}

function checkDarkMode() {
  var linkColor = $(".dark").css("color");

  if (linkColor == "rgb(17, 21, 23)") {
    darkModeActive = false;
  } else if (linkColor == "rgb(255, 255, 255)") {
    darkModeActive = true;
  }

  darkMode();

}

function darkMode() {

  if (darkModeActive == false) {

    $(".dark").css("color", "white");
    darkModeActive = true;
    $("body").addClass("bodyDark")
    $("hr").addClass("hrDark");
    $(".input-group-text, .search, .regions, .card, header").addClass("elementsDark");
    $(".btn").addClass("btnDark");

    $(window).on('scroll', onScrollDark);
    function onScrollDark() {
      $(".dark").css("color", "white");
      $("body").addClass("bodyDark")
      $("hr").addClass("hrDark");
      $(".input-group-text, .search, .regions, .card, header").addClass("elementsDark");
      $(".btn").addClass("btnDark");
    }

  } else if (darkModeActive == true) {
    $(".dark").css("color", "rgb(17, 21, 23)");
    $("body").removeClass("bodyDark")
    $("hr").removeClass("hrDark");
    $(".input-group-text, .search, .regions, .card, header").removeClass("elementsDark");
    $(".btn").removeClass("btnDark");

    $(window).on('scroll', onScrollLight);
    function onScrollLight() {
      $(".dark").css("color", "rgb(17, 21, 23)");
      $("body").removeClass("bodyDark")
      $("hr").removeClass("hrDark");
      $(".input-group-text, .search, .regions, .card, header").removeClass("elementsDark");
      $(".btn").removeClass("btnDark");
    }
  }

}
