<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DomainUrl;
use App\Models\ContactDetail;
use App\Models\Version;
use Illuminate\Support\Facades\Auth;

class VersionController extends Controller
{   
    public function apiSubAdmin(Request $request)
   {
       
    //  $DomainUrl = DomainUrl::all();
          $DomainUrl = DomainUrl::first();
    //  dd($DomainUrl->toJson());
    //  return response()->json($DomainUrl);
     return response($DomainUrl);
   }
   
      public function apiSubContact()
   {
     $ContactDetail = ContactDetail::first();
     return response()->json($ContactDetail);
   }
   
    public function apiApkVersions($version)
   {
     $ver = Version::first();
     
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
   
   	public function update_version_store(Request $request){
  
    $version = Version::where($request->id)->update([
          'version'       => $request->input('version'),
          'description'   => $request->input('description'),
          'file'         => $request->file('file')->store('docs'),
      ]);
      return redirect('/update-version')->with('message','Version Update Successfully');
        
	}

    function getSubAdmin()
    {

        $DomainUrl = DomainUrl::all();
        if(Auth::check()) {
            return view('Dashboard.Admin.AddSubAdmin', compact('DomainUrl'));    
     }

     return redirect::to("/")->withSuccess('Oopps! You do not have access');
        
    }

    function getVersion()
    {

        $version = Version::all();
        if(Auth::check()) {
            return view('Dashboard.Admin.AddUpdateVersion', compact('version'));    
     }

     return redirect::to("/")->withSuccess('Oopps! You do not have access');
        
    }


    function getContact()
    {

        $ContactDetail = ContactDetail::all();
        if(Auth::check()) {
            return view('Dashboard.Admin.AddContactDetail', compact('ContactDetail'));    
     }

     return redirect::to("/")->withSuccess('Oopps! You do not have access');
        
    }

    function storeSubAdmin(Request $request)
    {   
        $DomainUrl = DomainUrl::where($request->id)->update([
            'url'=>$request->input('url'),
        ]);
        return redirect('/add-domain-url');       
    }

    function storeContact(Request $request)
    {   
        $ContactDetail = ContactDetail::where($request->id)->update([
            'email'=>$request->input('email'),
            'phone'=>$request->input('phone'),
            'info'=>$request->input('info'),
        ]);
        return redirect('/contact-detail');       
    }
}
