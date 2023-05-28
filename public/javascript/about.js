$(document).ready(function(){
    $("#image-frame1").hover(function(){
        $("#image-caption1").toggle("slow");
    }, function(){
        $("#image-caption1").toggle("slow")
    });
    $("#image-frame2").hover(function(){
        $("#image-caption2").toggle("slow");
    }, function (){
        $("#image-caption2").toggle("slow");
    });
    $("#image-frame3").hover(function(){
        $("#image-caption3").toggle("slow");
    }, function (){
        $("#image-caption3").toggle("slow");
    });
});