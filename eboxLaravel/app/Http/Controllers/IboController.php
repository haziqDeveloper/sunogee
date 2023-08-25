<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IboDomainUrl;
use App\Models\IboContactDetail;
use App\Models\IboVersion;
use App\Models\UploadFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class IboController extends Controller
{   
    public function apiIboSubAdmin(Request $request)
   {
       
    //  $subAdmin = SubAdmin::all();
          $subAdmin = IboDomainUrl::first();
    //  dd($subAdmin->toJson());
    //  return response()->json($subAdmin);
     return response($subAdmin);
   }
   
      public function apiIboSubContact()
   {
     $ContactDetail = IboContactDetail::first();
     return response()->json($ContactDetail);
   }
   
    public function apiIboApkVersion($version)
   {
     $ver = IboVersion::first();
     
     if($ver->version > $version)
     {
       return response()->json($ver);
     }
      else
     {
        $ver = [];
        return response()->json($ver);
     }
   }
   
   	public function update_Ibo_version_store(Request $request){
  
    if ($request->file('file') == null) {
    $file = "";
    }
    else
    {
       $version = IboVersion::where($request->id)->update([
          'file'         => $request->file('file')->store('docs'),
      ]);
    }
      $version = IboVersion::where($request->id)->update([
          'version'       => $request->input('version') ? $request->input('version') : "",
          'description'   => $request->input('description') ? $request->input('description') : "",
      ]);
  
      return redirect('/ibo-update-version')->with('message','Update Version Successfully');
        
	}

    function getIboSubAdmin()
    {

        $subAdmin = IboDomainUrl::all();
        if(Auth::check()) {
            return view('Dashboard.Admin.IboDomainUrl', compact('subAdmin'));    
     }

     return redirect::to("/")->withSuccess('Oopps! You do not have access');
        
    }

    function getIboVersion()
    {

        $versions = IboVersion::all();
        if(Auth::check()) {
            return view('Dashboard.Admin.IboUpdateVersion', compact('versions'));    
     }

     return redirect::to("/")->withSuccess('Oopps! You do not have access');
        
    }
    
     function getUploadFile(Request $request)
      {

        $upload = UploadFile::all();
        if(Auth::check()) {
            return view('Dashboard.Admin.UploadFile', compact('upload'));    
     }

     return redirect::to("/")->withSuccess('Oopps! You do not have access');
        
    }
    
    function storeUploadFile(Request $request)
    {
        $request->validate([
         'file' => 'required|mimes:png,jpg,apk,pdf,svg,jpeg|max:2048'
       ]);
        if ($request->file('file') == null) {
    $file = "";
    }
    else
    {
        $file = $request->file('file');
        $file = time().'.'.$file->getClientOriginalExtension();
       $file = UploadFile::where($request->id)->update([
          'file'         => $request->file('file')->store('docs'),
      ]);
    }
    return redirect('upload-file')->with('message','Update File Successfully');
    }


    function getIboContact()
    {

        $ContactDetail = IboContactDetail::all();
        if(Auth::check()) {
            return view('Dashboard.Admin.IboContactDetail', compact('ContactDetail'));    
     }

     return redirect::to("/")->withSuccess('Oopps! You do not have access');
        
    }

    function storeIboSubAdmin(Request $request)
    {   
        $subAdmin = IboDomainUrl::where($request->id)->update([
            'url'=>$request->input('url') ? $request->input('url') : "",
        ]);
        return redirect('/ibo-domain-url')->with('message','Update Domain Url Successfully');      
    }

    function storeIboContact(Request $request)
    {   
        $ContactDetail = IboContactDetail::where($request->id)->update([
            'email'=>$request->input('email') ? $request->input('email') : "",
            'phone'=>$request->input('phone') ? $request->input('phone') : "",
            'info'=>$request->input('info') ? $request->input('info') : "",
        ]);
        return redirect('/ibo-contact-detail')->with('message','Update Contact Successfully');     
    }
}
