function MenuChoice(selection) {
  document.getElementById("customerList").style.visibility = "hidden";
  document.getElementById("orderHistory").style.visibility = "hidden";
  document.getElementById("addCustomer").style.visibility= "hidden";
  document.getElementById("aboutUs").style.visibility = "hidden";
  document.getElementById("updateCustomerOrder").style.visibility = "hidden";
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
          case "addCustomer":
      document.getElementById("addCustomer").style.visibility = "visible";
      break;
    case "customerOrders":
      document.getElementById("customerOrders").style.visibility = "visible";
      break;
    case "updateCustomerOrder":
      document.getElementById("updateCustomerOrder").style.visibility =
        "visible";
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
      "<table><tr><th>Customer ID</th><th>Customer Name</th><th>Customer City</th><th>Delete Customer</th></tr>";
    var count = 0;
    var deleteButton = "";
    var CompanyName = "";
    var CustomerID = "";
    var City = "";
    for (count = 0; count < result.GetAllCustomersResult.length; count++) {
      CustomerID = result.GetAllCustomersResult[count].CustomerID;
      deleteButton =         '<a href="javascript:deleteCustomer(' +
        "'" +
        CustomerID +
        "');" +
        '">';
        deleteButton += CustomerID;
        deleteButton += "</a>";
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
        "</td><td>" +
deleteButton +
         "</td></tr>";
    }
    display += "</table>";
    document.getElementById("listOfCustomers").innerHTML = display;
  }
}

// function Orders() {
//   var xmlhttp = new XMLHttpRequest();
//   var url =
//     "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
//   url += document.getElementById("CustomerIDInput").value;

//   xmlhttp.onreadystatechange = function() {
//     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//       var output = JSON.parse(xmlhttp.responseText);
//       GenerateOutput(output);
//     }
//   };
//   xmlhttp.open("GET", url, true);
//   xmlhttp.send();

//   function GenerateOutput(result) {
//     var display = "<table><tr><th>Total</th><th>Product Name</th></tr>";
//     var count = 0;
//     for (count = 0; count < result.length; count++) {
//       display +=
//         "<tr><td>" +
//         result[count].Total +
//         "</td><td>" +
//         result[count].ProductName +
//         "</td></tr>";
//     }
//     display += "</table>";
//     document.getElementById("orderReport").innerHTML = display;
//     // MenuChoice("orderHistory");
//   }
// }

function Orders() {
  var xmlhttp = new XMLHttpRequest();
  var url =
    "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
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
    var display =
      "<table><tr><th>OrderID</th><th>Ship City</th><th>Ship Name</th><th>Ship Post Code</th><th>Ship Address</th></tr>";
    var count = 0;
    for (count = 0; count < result.GetOrdersForCustomerResult.length; count++) {
      display +=
        "<tr><td>" +
        result.GetOrdersForCustomerResult[count].OrderID +
        "</td><td>" +
        result.GetOrdersForCustomerResult[count].ShipCity +
        "</td><td>" +
        result.GetOrdersForCustomerResult[count].ShipName +
        "</td><td>" +
        result.GetOrdersForCustomerResult[count].ShipPostCode +
        "</td><td>" +
        result.GetOrdersForCustomerResult[count].ShipAddress +
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
    "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
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
    var display =
      "<table><tr><th>Update Order Button</tr></th><tr><th>OrderID</th><th>Ship City</th><th>Ship Name</th><th>Ship Post Code</th><th>Ship Address</th></tr>";
    var count = 0;
    var orderIDParameter = "";
    for (count = 0; count < result.GetOrdersForCustomerResult.length; count++) {
      orderIDParameter = result.GetOrdersForCustomerResult[count].OrderID;
      display +=
        "<tr><td>" +
        `<button onclick="getOrderInfo(${orderIDParameter})">Update Order Information</button>` +
        "</td><td>" +
        result.GetOrdersForCustomerResult[count].OrderID +
        "</td><td>" +
        result.GetOrdersForCustomerResult[count].ShipCity +
        "</td><td>" +
        result.GetOrdersForCustomerResult[count].ShipName +
        "</td><td>" +
        result.GetOrdersForCustomerResult[count].ShipPostCode +
        "</td><td>" +
        result.GetOrdersForCustomerResult[count].ShipAddress +
        "</td></tr>";
    }
    display += "</table>";
    document.getElementById("orderReport").innerHTML = display;
    MenuChoice("orderHistory");
  }
}

function getOrderInfo(
  orderID
) 
//Retrieves a list of books ordered by a particular store using the store ID for the search
{
  var xmlhttp = new XMLHttpRequest();
  var url =
    "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderInfo/";
  //Service URL
  url += orderID;
  //Store ID to complete Service URL
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var output = JSON.parse(xmlhttp.responseText);
      GenerateOutput(output);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  function GenerateOutput(result) //Function that displays results
  {
    result = result[0];
    var resultOrderID = result.OrderID;
    var resultShipAddress = result.ShipAddress;
    var resultShipName = result.ShipName;
    var resultShipCity = result.ShipCity;
    var resultShipPostCode = result.ShipPostCode;
    document.getElementById("orderID").value = resultOrderID;
    document.getElementById("shipAddress").value = resultShipAddress;
    document.getElementById("shipName").value = resultShipName;
    document.getElementById("shipCity").value = resultShipCity;
    document.getElementById("shipPostCode").value = resultShipPostCode;
  }
  MenuChoice("updateCustomerOrder");
}

function customerUpdate() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var result = JSON.parse(xmlhttp.responseText);
      OperationResult(Number(result));
      //Calls the funciton that displays the result in an alert message
      MenuChoice("customerList"); //Calls the menu choice function to display the store list
    }
  };
  var url =
    "https://student.business.uab.edu/jsonwebservice/service1.svc/UpdateOrderAddress";
  var orderID = Number(document.getElementById("orderID").value);
  var shipName = document.getElementById("shipName").value;
  var shipAddress = document.getElementById("shipAddress").value;
  var shipCity = document.getElementById("shipCity").value;
  var shipPostCode = document.getElementById("shipPostCode").value;
  var parameters =
  JSON.stringify({
    orderID,
    shipName,
    shipCity,
    shipAddress,
    shipPostCode
  });
  //Creates the JSON string to be sent for the update operation
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(parameters);
}
//Function that displays the result of an operation that adds, deletes, or updates data
//The function is invoked from other functions
function OperationResult(success, exception) {
  switch (success) {
    case 1:
      alert("The operation was successful");
      break;
    case 0:
      alert("The operation was not successful: " + exception);
      break;
    case -2:
      alert(
        "The operation was not successful because the data string supplied could not be deserialized into the service object."
      );
      break;
    case -3:
      alert(
        "The operation was not successful because a record with the supplied Order ID could not be found"
      );
      break;
    default:
      alert("The operation code returned is not identifiable.");
  }
}

function BackToList() {
  MenuChoice("customerList");
}

function goToAddCustomer() {
  MenuChoice("addCustomer");
}

function addCustomer() {
  var ObjRequest = new XMLHttpRequest();
  var URL =
    "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";

  var customerID = document.getElementById("addCustomerID").value;
  var customerName = document.getElementById("addCustomerName").value;
  var customerLocation = document.getElementById("addCustomerCity").value;

  var addCustomer =
    '{"CustomerID":"' +
    customerID +
    '","CompanyName":"' +
    customerName +
    '","City":"' +
    customerLocation +
    '"}';

  ObjRequest.onreadystatechange = function() {
    if (ObjRequest.readyState == 4 && ObjRequest.status == 200) {
      var addCustomerResult = JSON.parse(ObjRequest.responseText);
      addResult(addCustomerResult);
    }
  };

  ObjRequest.open("POST", URL, true);
  ObjRequest.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded"
  );
  ObjRequest.send(addCustomer);
}


function addResult(output) {
  if (output.WasSuccessful == 1) {
    alert("Success! Customer Added!");
    BackToList();

  } else {
    document.getElementById("addCustomerResult").innerHTML =
      "Sorry, but we encountered an error while executing that command:" +
      output.Exception;
  }
}


function deleteCustomer(customerID) {
      var deleteConfirm = confirm("Delete this customer?");
       if (deleteConfirm == true) {
  var ObjRequest = new XMLHttpRequest();
  var URL =
     "https://student.business.uab.edu/jsonwebservice/service1.svc/DeleteCustomer/";
   URL += customerID;

  ObjRequest.onreadystatechange = function() {
    if (ObjRequest.readyState == 4 && ObjRequest.status == 200) {
      var result = JSON.parse(ObjRequest.responseText);
      deleteOperationResult(result);
    }
  };

  ObjRequest.open("GET", URL, true);
  ObjRequest.send();
}}

function deleteOperationResult(output) {
  if (output.DeleteCustomerResult.WasSuccessful == 1) {
    alert("Deletion was successful!")
  } else {
    alert("We were not able to delete that store. See the error message below, try again, and contact our technical team if you continue to have issues." +
      "<br><br>" +
      output.Exception);
  }
}


function Delete() {
    var deleteConfirm = confirm("Delete this customer?");
  
    if (deleteConfirm == true) {
      DeleteStore();
    }
  }