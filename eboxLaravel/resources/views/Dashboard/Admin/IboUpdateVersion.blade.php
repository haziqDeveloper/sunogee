@extends('layouts.master')

@section('content')

            <!-- row -->
            <div class="container-fluid">
                <div class="row">
<div class="col-lg-12">
                        <div class="card card-android">
                            <div class="card-body">
                                <h4 class="card-title">Ibo Update Version</h4>
                                <br/>
                                <div class="basic-form">
           <form method="post" action="{{ url('/ibo-update_versions') }}"  enctype="multipart/form-data">
                                  {{ csrf_field() }}
                                    @foreach ($versions as $vers)
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label">Version</label>
                                            <div class="col-sm-10">
                                                <input type="text"  name="version" placeholder="Pease Enter Your Version" value="{{ $vers->version }}" class="form-control"/>
                                            </div>
                                        </div>
                                        <br/>
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label">Description</label>
                                            <div class="col-sm-10">
                                                <input type="text" name="description" placeholder="Pease Enter Your Description" value="{{ $vers->description }}" class="form-control"/>
                                            </div>
                                        </div>
                                        <br/>
                                        <fieldset class="form-group">
                                            <div class="row">
                                                <label class="col-form-label col-sm-2 pt-0">APK File</label>
                                                <div class="col-sm-10">
                                                    <div class="form-group">
                                                    <input type="file" name="file" class="form-control-file">
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <br/>
                                        <div class="form-group row">
                                            <div class="col-sm-10">
                                            <div class="general-button">
                                    <button type="submit" class="btn mb-1 btn-flat btn-success">Update Version</button>
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