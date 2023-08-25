	$(document).ready(function() {
		$('.switch-input').change(function(){
			var status = $(this).prop('checked') == false ? false : true;
      var item_id = $(this).attr("id");
      console.log(item_id);
			$.ajax({
				type:"GET",
				dataType:"json",
				url:'/changeStatus',
				data: {'status':status, 'item_id': item_id},
				success: function(data){
				    console.log("H USET",data);
					console.log(data.status)
				}	
			}) 
		});
  });