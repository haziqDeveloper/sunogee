@extends('layouts.master')

@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
<div class="row">
<div class="col-xl">
                  <div class="card mb-4">
                    <div class="card-header d-flex justify-content-between align-items-center">
                      <h5 class="mb-0">King 4k Domain Url</h5>
                    </div>
                    <div class="card-body">
                      <form method="POST" action="{{ url('/add-domain-urls') }}">
                      {{ csrf_field() }}
                      @foreach ($subAdmin as $admin)
                        <div class="mb-3">
                          <label class="form-label" for="basic-default-fullname">Domain Url</label>
                          <input type="url" class="form-control" name="url" value="{{ $admin->url }}" id="basic-default-fullname" placeholder="https://example.com"/>
                        </div>
                        <div class="general-button">
                          <button type="submit" id="submit" class="btn mb-1 btn-flat btn-success">Update Url</button>
                        </div>
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
@endforeach
@endsection