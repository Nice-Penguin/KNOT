$(document).ready(function(){
  $("#image-frame1").on({
    mouseenter: function(){
        $("#image-caption1").toggle("slow");}
  });
  $("#image-frame2").on({
    mouseenter: function(){
        $("#image-caption2").toggle("slow");}
  });
  $("#image-frame3").on({
    mouseenter: function(){
        $("#image-caption3").toggle("slow");}
  });
});