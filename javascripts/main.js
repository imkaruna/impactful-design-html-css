$(document).ready(function(){
 // Fixed navbar background color change during scroll event
   var scroll_start = 0;
   var startchange = $('#startchange');
   var offset = startchange.offset();
    if (startchange.length){
       $(document).scroll(function() {
          scroll_start = $(this).scrollTop();
          if(scroll_start > offset.top) {
              $("#navbar").css('background-color', '#57595e');
           } else {
              $('#navbar').css('background-color', 'transparent');
           }
       });
    }

  // AJAX request to fetch data
  // This code handles display images in a three column format (assuming number of images is a multiple of 3 )
  //.col-md-* used for stacking images for mobile display

  $.getJSON( "http://lukepeters.me/api/adventure-options/", function( data ) {
    var items = [];
    $imageDiv = $('#display-images');
    var imgIndex=0;
    $.each( data, function( key, val ) {
          imgIndex++;
          if (imgIndex==3) //Prevents margin for the third column .image-gutter provides right margin
          {
            $dataStr = '<div class="col-md-4"><a href="'+val.url+'"><img class="adventure-image" src="'+val.img+'" width="100%"><div class="image-text text-center">'+val.title+'</div></a></div>';
          }
          else
          {
            $dataStr = '<div class="col-md-4 image-gutter"><a href="'+val.url+'"><img class="adventure-image" src="'+val.img+'" width="100%"><div class="image-text text-center">'+val.title+'</div></a></div>';
          }

          items.push( $dataStr ); //html for 3 images in a row pushed into array

          if (imgIndex==3) {
            //creates a div with given class and adds the columns
              $( "<div>", {
                "class": "row no-gutters activity-row-wrapper",
                html: items.join( "" )
              }).appendTo($imageDiv);
              items = [];
              imgIndex=0; // clears the array and index for the next row
          }
    });
    // console.log(items.join( "" ));
});
});
