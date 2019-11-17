// function to ensure everything loads 

$(function() {
    $(".create-form").on("submit", function(event){
        event.preventDefault(); // prevent initial load

        //creates new burger
        var newBurger = {
            burger_name: $("#newburger")
            .val()
            .trim(),
            devoured: 0
         };

         // post request
         $.ajax("/api/burgers", {
             type: "POST",
             data: newBurger
         }).then(function(){
             console.log("Added new burger");
             location.reload();
         });
      });

 // eat burger on click event will set devoured to true

 $(".eatburger").on("click", function(event){
    event.preventDefault();

    var id = $(this).data("id");
    var devouredState = {
        devoured: 1 
    };

    // put request and reload
    $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: devouredState
      }).then(function() {
        console.log("Burger devoured");
        location.reload();
  });
});

// trash burger on click event that will create delete action
$(".trashburger").on("click", function(event) {
    event.preventDefault();

    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax({
      type: "DELETE",
      url: "/api/burgers/" + id
    }).then(location.reload());
  });
});