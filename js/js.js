function MenuChoice(selection) {
    document.getElementById("section-one").style.visibility = "hidden";
    document.getElementById("section-two").style.visibility = "hidden";
    switch (selection) {
        case "Pepper Section":
            document.getElementById("section-one").style.visibility = "visible";
            break;
        case "Ziggy Section":
            document.getElementById("section-two").style.visibility = "visible";
            break;
        case "None": //No menu item selected, so no section should be displayed
        break;
        default:alert("Please select a different menu option");}}