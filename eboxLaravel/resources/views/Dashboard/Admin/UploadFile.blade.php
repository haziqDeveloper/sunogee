@extends('layouts.master')

@section('content')

            <!-- row -->
            <div class="container-fluid">
                <div class="row">
<div class="col-lg-12">
                        <div class="card card-android">
                            <div class="card-body">
                                <h4 class="card-title">APK Upload File</h4>
                                <br/>
                                <div class="basic-form">
           <form method="post" action="{{ url('/upload-files') }}"  enctype="multipart/form-data">
                                  {{ csrf_field() }}
                                    @foreach ($upload as $vers)
                                    
                                     <br/>
                                        <fieldset class="form-group">
                                            <div class="row">
                                                <div class="col-sm-10">
                                                    <div class="form-group">
                                                                                <label class="col-form-label col-sm-2 pt-0">APK File</label><br/>
                                <input type="file" name="file" value="{{ asset('storage/app/'.$vers->file) }}" class="form-control-file">
                                                    <img src={{ asset('storage/app/'.$vers->file) }} width="200" height="200" alt=""/>
                                                    <a href="{{ asset('storage/app/'.$vers->file) }}" download>Download File</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <br/>
                                        <div class="form-group row">
                                            <div class="col-sm-10">
                                            <div class="general-button">
                                    <button type="submit" class="btn mb-1 btn-flat btn-success">Update File</button>
                                </div>
                                            </div>
                                        </div>
                                        @endforeach
                                    </form>
                                </div>
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
    .card.card-android {
    margin-top: 20px;
}
</style>

@endsection