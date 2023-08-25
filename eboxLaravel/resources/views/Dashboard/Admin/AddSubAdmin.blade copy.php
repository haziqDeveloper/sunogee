@extends('layouts.master')

@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
<div class="row">
<div class="col-xl">
                  <div class="card mb-4">
                    <div class="card-header d-flex justify-content-between align-items-center">
                      <h5 class="mb-0">Add New Sub Admin</h5>
                    </div>
                    <div class="card-body">
                      <form method="POST" action="{{ url('/add-subAdmins') }}">
                      @csrf
                      <div class="mb-3">
                          <label class="form-label" for="basic-default-fullname">Member Group</label>
                          <select class="form-control" name="member">
                            <option>-- Select Option --</option>
                            <option>Sub Admin</option>
                            <option>Reseller</option>
                          </select>
                        </div>
                        <div class="mb-3">
                          <label class="form-label" for="basic-default-fullname">Full Name</label>
                          <input type="text" class="form-control" name="username" id="basic-default-fullname" placeholder="John Doe" />
                        </div>
                        <div class="mb-3">
                          <label class="form-label" for="basic-default-company">Password</label>
                          <input type="password" name="password" class="form-control" id="pwd" placeholder="ACME Inc." autocomplete="current-password"/>
                        
                        </div>
                        <div class="mb-3">
                          <label class="form-label" for="basic-default-email">Confirm Password</label>
                          <div class="input-group input-group-merge">
                            <input
                              type="password"
                              name="cpassword"
                              id="cpwd"
                              class="form-control"
                              placeholder="Confirm Password"
                              aria-label="john.doe"
                              aria-describedby="basic-default-email2"
                              autocomplete="current-password"
                            />
                            <div id="showErrorcPwd"></div>
                          </div>
                        </div>
                        <div class="mb-3">
                          <label class="form-label" for="basic-default-phone">Name</label>
                          <input
                            type="text"
                            id="basic-default-phone"
                            class="form-control phone-mask"
                            placeholder="Provide Name"
                            name="name"
                          />
                        </div>
                        <div class="mb-3">
                          <label class="form-label" for="basic-default-message">Refund Validity Period</label>
                          <input
                            type="text"
                            id="basic-default-phone"
                            class="form-control phone-mask"
                            placeholder="User Valid Period"
                            name="valid_period"
                          />
                        </div>
                        <button type="submit" id="submit" class="btn btn-primary">Send</button>
                      </form>
                    </div>
                  </div>
                </div>
</div>
</div>
<style>
  #cpwd
  {
    position: relative;
  }
  #showErrorcPwd
  {
    position: absolute;
    bottom: -24px;
    left: 12px;
  }
  </style>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script>
$(document).ready(function(){
    $(document).on('keyup','#cpwd', function(){
      var pass = $('#pwd').val();
      var cpass = $('#cpwd').val();
      if(cpass!=pass)
    {
      $('#showErrorcPwd').html('Password are not match');
      $('#showErrorcPwd').css('color','red');
      return false;
    }
    else
    {
      $('#showErrorcPwd').html('');
      return false;
    }
   });

  // $('#submit').click(function(){


  //   if(user === "")
  //   {
  //     $('#showError').html('Username must be filled');
  //     $('#showError').css('color','red');
  //     return false;
  //   }

  //   if((user.lenght < 2) || (user.lenght > 25))
  //   {
  //     $('#showError').html('Username must be filled');
  //     $('#showError').css('color','red');
  //     return false;
  //   }

  //   if(pass === "")
  //   {
  //     $('#showError').html('Password must be filled');
  //     $('#showError').css('color','red');
  //     return false;
  //   }

  //   if((pass.lenght < 5) || (pass.lenght > 30))
  //   {
  //     $('#showError').html('Password lenght must be between 5or 30 letteronly');
  //     $('#showError').css('color','red');
  //     return false;
  //   }

  //   if(cpass!=pass)
  //   {
  //     $('#showError').html('Password are not match');
  //     $('#showError').css('color','red');
  //     return false;
  //   }
  // })
})
</script>

@endsection