function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i in uiBathrooms) {
    if (uiBathrooms[i].checked) {
      return parseInt(uiBathrooms[i].value);
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i in uiBHK) {
    if (uiBHK[i].checked) {
      return parseInt(uiBHK[i].value);
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "http://127.0.0.1:5000/predict_home_price"; // API URL

  $.post(url, {
    total_sqft: parseFloat(sqft.value),
    bhk: bhk,
    bath: bathrooms,
    location: location.value
  }, function (data, status) {
    console.log(data.estimated_price);
    estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
    console.log(status);
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log("Error: " + textStatus + " - " + errorThrown);
  });
}

function onPageLoad() {
  console.log("document loaded");

  var url = "http://127.0.0.1:5000/get_location_names"; // API URL

  $.get(url, function (data, status) {
    console.log("got response for get_location_names request");
    if (data) {
      var locations = data.locations;
      var uiLocations = document.getElementById("uiLocations");
      $('#uiLocations').empty();
      for (var i in locations) {
        var opt = new Option(locations[i]);
        $('#uiLocations').append(opt);
      }
    }
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log("Error: " + textStatus + " - " + errorThrown);
  });
}

window.onload = onPageLoad;
