    $(document).on('click','#expiry_date' ,function(){
       var expiry_date = $(this).attr("data-id");
       console.log(expiry_date);
   $.ajax({
				type:"GET",
				dataType:"json",
				url: "/mac-edit/"+expiry_date,
				success: function (response)
        {
          console.log("Response",response.mac.note); 
          $('#notes').val(response.mac.note);
          $('#expiry_date').val(response.mac.expiry);
          $('#mac_ids').val(response.mac.id);
        }
			}) 
  });