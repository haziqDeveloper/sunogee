$(document).on('click','#devices_note' ,function(){
  var device_note = $(this).attr('data-id');
   $.ajax({
				type:"GET",
				dataType:"json",
				url: "/mac-edit/"+device_note,
				success: function (response)
        {
          $('#note').val(response.mac.note);
          $('#mac_id').val(response.mac.id);
        }
			}) 
  });