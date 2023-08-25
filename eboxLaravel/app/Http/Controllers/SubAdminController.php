<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubAdmin;
use App\Models\Contact;
use App\Models\Version;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class SubAdminController extends Controller
{   
    public function apiSubAdmin(Request $request)
   {
       
    //  $subAdmin = SubAdmin::all();
          $subAdmin = SubAdmin::first();
    //  dd($subAdmin->toJson());
    //  return response()->json($subAdmin);
     return response($subAdmin);
   }
   
      public function apiSubContact()
   {
     $contact = Contact::first();
     return response()->json($contact);
   }
   
    public function apiApkVersion($version)
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
  
  
     if ($request->file('file') == null) {
    $file = "";
    }
    else
    {
      $version = Version::where($request->id)->update([
          'file'         => $request->file('file')->store('docs'),
      ]);
    }

    $version = Version::where($request->id)->update([
          'version'       => $request->input('version'),
          'description'   => $request->input('description'),
      ]);
      return redirect('/update-version')->with('message','Update Version Successfully');
        
	}

    function getSubAdmin()
    {

        $subAdmin = SubAdmin::all();
        if(Auth::check()) {
            return view('Dashboard.Admin.AddSubAdmin', compact('subAdmin'));    
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

        $contact = Contact::all();
        if(Auth::check()) {
            return view('Dashboard.Admin.AddContactDetail', compact('contact'));    
     }

     return redirect::to("/")->withSuccess('Oopps! You do not have access');
        
    }

    function storeSubAdmin(Request $request)
    {   
        $subAdmin = SubAdmin::where($request->id)->update([
            'url' => $request->input('url') ? $request->input('url'): "",
        ]);
        return redirect('/add-domain-url')->with('message','Update Domain Url Successfully');
    }

    function storeContact(Request $request)
    {   
        $contact = Contact::where($request->id)->update([
            'email'=>$request->input('email') ? $request->input('email') : "",
            'phone'=>$request->input('phone') ? $request->input('phone') : "",
            'info'=>$request->input('info') ? $request->input('info') : "",
        ]);
        return redirect('/contact-detail')->with('message','Update Contact Successfully');      
    }
}
