@extends('layouts.master')

@section('content')
            <!-- row -->
            <br/>
            <br/>
            <div class="container-fluid">
                <div class="row">
<div class="col-lg-12">
                        <div class="card card-android">
                            <div class="card-body">
                                <h4 class="card-title">Device Info</h4>
                                <br/>
                                <div class="basic-form">
<table id="responsive-data-table" class="table dt-responsive nowrap" style="width:100%">
  <thead>
    <tr>
      <th>Id</th>
      <th>Mac Id</th>
      <th>Data</th>
      <th>Time</th>
      <th>Device Info</th>
      <th>Note</th>
      <th>Action</th>
    </tr>
  </thead>

                          <tbody>
                          @foreach($mac as $item)
                            <tr>
                              <td>
                                {{$item->id}}
                              </td>
                              <td>{{$item->macid}}</td>
                              <td>{{$item->date}}</td>
                              <td>{{$item->time}}</td>
                              <td>{{$item->deviceinfo}}</td>
                              <td><div class="notes">{{$item->note}}</div></td>
                                      <td>
                          <div class="dropdown">
                            <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                              <i class="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div class="dropdown-menu">
                              <a class="dropdown-item" id="expiry_date" data-id="{{$item->id}}" data-bs-toggle="modal"
                          data-bs-target="#basicModal" href="javascript:void(0);"
                                ><i class="bx bx-edit-alt me-1"></i> Edit</a
                              >
                              <a class="dropdown-item" href="javascript:void(0)" class="deleteRecord" data-id="{{ $item->id }}"
                                ><i class="bx bx-trash me-1"></i> Delete</a
                              >
                            </div>
                          </div>
                        </td>
                              
                            </tr>
                            


                        <div class="modal fade" id="basicModal" tabindex="-1" aria-hidden="true">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel1">Note</h5>
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div class="modal-body">
                            <form method="POST" action="{{ url('/changeExpiry') }}">
            @csrf
            @method('PUT')
                               <input type="hidden" id="mac_ids" name="mac_id"/>      
                                <div class="row">
                                  <div class="col mb-3">
                                    <label for="nameBasic" class="form-label">Devices Info Note</label>
                                    <input type="text" name="note" id="notes" class="form-control" placeholder="Enter Note" />
                                  </div>
                                </div>

                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                  Close
                                </button>
                                <button type="submit" name="button" class="btn btn-primary">Save changes</button>
                              </div>
                                </form>
                            </div>
                          </div>
                        </div>

@endforeach



                          </tbody>
</table>
   </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
                    <style>
                        .dataTables_wrapper .dataTables_paginate .paginate_button.current, .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover
                        {
                           background:#337ab7 !important;
                           border:1px solid #337ab7 !important;
                           color:#ffffff !important;
                        
                        }
                        table#responsive-data-table {
    margin-top: 20px;
    margin-bottom: 20px;
}
                        .pagination>li>a, .pagination>li>span
                        {
                            color:#337ab7 !important;
                            background:#ffffff !important;
                        }
                    </style>
@endsection