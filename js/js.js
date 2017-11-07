function MenuChoice(selection) {
  document.getElementById("customerList").style.visibility = "hidden";
  document.getElementById("orderHistory").style.visibility = "hidden";
  document.getElementById("aboutUs").style.visibility = "hidden";
  switch (selection) {
    case "customerList":
      document.getElementById("customerList").style.visibility = "visible";
      listStores();
      break;
    case "orderHistory":
      document.getElementById("orderHistory").style.visibility = "visible";
      break;
    case "aboutUs":
      document.getElementById("aboutUs").style.visibility = "visible";
      break;
    case "None": //No menu item selected, so no section should be displayed
      break;
    default:
      alert("Please select a different menu option");
  }
}

function listStores() {
  var xmlhttp = new XMLHttpRequest();
  var url =
    "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers";

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var output = JSON.parse(xmlhttp.responseText);
      GenerateOutput(output);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  function GenerateOutput(result) {
    var display =
      "<table><tr><th>Customer ID</th><th>Customer Name</th><th>Customer City</th></tr>";
    var count = 0;
    var CompanyName = "";
    var CustomerID = "";
    var City = "";
    for (count = 0; count < result.GetAllCustomersResult.length; count++) {
      CustomerID = result.GetAllCustomersResult[count].CustomerID;
      CompanyName =
        '<a href="javascript:OrdersWithParameters(' +
        "'" +
        CustomerID +
        "');" +
        '">';
      CompanyName += result.GetAllCustomersResult[count].CompanyName;
      CompanyName += "</a>";
      City = result.GetAllCustomersResult[count].City;
      display +=
        "<tr><td>" +
        CustomerID +
        "</td><td>" +
        CompanyName +
        "</td><td>" +
        City +
        "</td></tr>";
    }
    display += "</table>";
    document.getElementById("listOfCustomers").innerHTML = display;
  }
}

function Orders() {
  var xmlhttp = new XMLHttpRequest();
  var url =
    "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
  url += document.getElementById("CustomerIDInput").value;

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var output = JSON.parse(xmlhttp.responseText);
      GenerateOutput(output);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  function GenerateOutput(result) {
    var display = "<table><tr><th>Total</th><th>Product Name</th></tr>";
    var count = 0;
    for (count = 0; count < result.length; count++) {
      display +=
        "<tr><td>" +
        result[count].Total +
        "</td><td>" +
        result[count].ProductName +
        "</td></tr>";
    }
    display += "</table>";
    document.getElementById("orderReport").innerHTML = display;
    // MenuChoice("orderHistory");
  }
}

function OrdersWithParameters(CustomerID) {
  var xmlhttp = new XMLHttpRequest();
  var url =
    "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
  url += CustomerID;

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var output = JSON.parse(xmlhttp.responseText);
      GenerateOutput(output);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  function GenerateOutput(result) {
    var display = "<table><tr><th>Total</th><th>Product Name</th></tr>";
    var count = 0;
    for (count = 0; count < result.length; count++) {
      display +=
        "<tr><td>" +
        result[count].Total +
        "</td><td>" +
        result[count].ProductName +
        "</td></tr>";
    }
    display += "</table>";
    document.getElementById("orderReport").innerHTML = display;
    MenuChoice("orderHistory");
  }
}

function BackToList() {
  MenuChoice("customerList");
}
