function MenuChoice(selection) {
  document.getElementById("storeList").style.visibility = "hidden";
  document.getElementById("orderHistory").style.visibility = "hidden";
  switch (selection) {
    case "storeList":
      document.getElementById("storeList").style.visibility = "visible";
      listStores();
      break;
    case "orderHistory":
      document.getElementById("orderHistory").style.visibility = "visible";
      orderHistory();
      break;
    case "None": //No menu item selected, so no section should be displayed
      break;
    default:
      alert("Please select a different menu option");
  }
}

function listStores() {
  var xmlhttp = new XMLHttpRequest();
  var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/";

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var output = JSON.prase(xmlhttp.responseText);
      GenerateOutput(output);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  function GenerateOutput(result) {
    var display =
      "<table><tr><th>Store ID</th><th>Store Name</th><th>Store City</th></tr>";
    var count = 0;
    var storeName = "";
    var storeID = "";
    var storeCity = "";
    for (count = 0; count < result.GetAllStoresResult.length; count++) {
      storeID = result.GetAllStoresResult[count].StoreID;
      storeName = '<a href="javascript:Orders(' + "'" + "')" + '">';
      storeName += result.GetAllStoresResult[count].StoreName;
      storeName += "</a>";
      storeCity = result.GetAllStoresResult[count].StoreCity;
      display +=
        "<tr><td>" +
        storeID +
        "</td><td>" +
        storeName +
        "</td><td>" +
        storeCity +
        "</td></tr>";
    }
    display += "</table>";
    document.getElementById("listOfStores").innerHTML = display;
  }
}

function Orders(storeID)
{
    var xmlhttp = new XMLHttpRequest();
    var url = "http://student.business.uab.edu/WebAppService/service1.svc/getOrderHistory/";
    url += storeID;

    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function GenerateOutput(result)
    {
        var display = "<table><tr><th>Book Name</th><th>Total Ordered</th></tr>";
        var count = 0;
        for(count = 0; count < result.length; count ++) {
            display += "<tr><td>" + result[count].BookName + "</td><td>" + result[count].SaleNumber + "</td></tr>";
        }
        display += "</table">;
        document.getElementById("books").innerHTML = display;
        MenuChoice("orderHistory");
    }
}
