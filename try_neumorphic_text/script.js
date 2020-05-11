$('#slider1').change(function(){
    $('body').get(0).style.setProperty("--color", $('#slider1').val() + ' ,' + $('#slider1').val() + '%');
    })
    
    $('#slider2').change(function(){
    $('body').get(0).style.setProperty("--l",  $('#slider2').val() + '%');
    })
    
    $('#text').on('keyup', function(){
      var fieldText = $('#text').val(); 
      $("h1 span.text").text(fieldText).attr('data-text', fieldText);
    })
    $('#text').on('focus', function(){
        $('h1 span.text').attr('data-text', $('#text').val())
      $("h1 span.text").text($('#text').val())
    })