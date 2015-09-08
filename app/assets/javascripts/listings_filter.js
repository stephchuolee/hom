$(function(){


  $('#pets_btn').on('click', function(){
    console.log('checked');
    if ($('#pets_btn').is(':checked')){
      $('.pets:contains(false)').parent('tr').hide();
    } else  {
      $('.pets:contains(false)').parent('tr').show();

    }
  });

  $('#filter_submit').on('')

});