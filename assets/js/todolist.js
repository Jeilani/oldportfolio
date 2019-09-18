// check off specific duties by clicking
$("ul").on("click", "li", function(element){

    $(this).toggleClass("completed");

});

//click on X to delete duty

$("ul").on("click", "span", function () {
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    event.stopPropagation();
})

$("#togglebutton").on("click", function () {
    $("input[type='text']").fadeToggle();

})

$("input[type='text']").on("keypress", function (event){
    if (event.which === 13) {
    var todoText = $(this).val();

    $(this).val("");

    $("ul").append("<li><span><i class='fa fa-trash ' aria-hidden='true'></i></span> " + todoText + "</li>");
    }




});