@extends('layouts.master')

@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
<div class="row">
<div class="col-xl">
                  <div class="card mb-4">
                    <div class="card-header d-flex justify-content-between align-items-center">
                      <h5 class="mb-0">Ibox Contact Detail</h5>
                    </div>
                    <div class="card-body">
                     <form method="POST" action="{{ url('/contact-details') }}">
                      {{ csrf_field() }}
                      @foreach ($ContactDetail as $cont)
                        <div class="mb-3">
                          <label class="form-label" for="basic-default-fullname">Email</label>
                          <input type="email" class="form-control" name="email" value="{{ $cont->email }}" id="basic-default-fullname" placeholder="admin@gmail.com"/>
                        </div>
                        <div class="mb-3">
                          <label class="form-label" for="basic-default-fullname">Phone</label>
                          <input type="text" class="form-control" name="phone" value="{{ $cont->phone }}" id="basic-default-fullname" placeholder="111-000-111"/>
                        </div>
                        <div class="mb-3">
                          <label class="form-label" for="basic-default-fullname">Info</label>
                          <textarea type="text" class="form-control" name="info" 
                           id="basic-default-fullname" placeholder="Your Info" required>{{ $cont->info }}</textarea>
                        </div>
                        
                        <div class="general-button">
                          <button type="submit" id="submit" class="btn mb-1 btn-flat btn-primary">Update Contact</button>
                        </div>
                      @endforeach
                      </form>

                    </div>
                  </div>
                </div>
</div>
</div>
<style>
    .general-button
    {
        margin-top:30px;
        margin-bottom:20px;
    }
</style>

@endsection