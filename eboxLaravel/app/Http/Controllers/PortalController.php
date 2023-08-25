<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Portal;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\Mac;
class PortalController extends Controller
{
   public function portal_index()
   {
      $portal = Portal::all();
      return response()->json($portal);
   }
   
   public function portal()
   {
     $portal = Portal::all();
     return response()->json($portal);
   }

    public function portal_get()
    {
        $portal = Portal::orderBy('id', 'DESC')->get();
           if(Auth::check()) {
                  return view('portal', compact('portal'));    
           }
        return redirect::to("/")->withSuccess('Oopps! You do not have access');
    }

     public function portal_store(Request $request)
     {
        $portal = new Portal();
        $portal->portal_name = $request->portal_name;
        $portal->portal_address = $request->portal_address;
        $portal->save();
        return response()->json();
      //   return redirect('/portal')->with('success','Add The Portal Successfully');  
     }
     
    public function portal_storing(Request $request)
     {
        $portal = new Portal();
        $portal->portal_name = $request->portal_name;
        $portal->portal_address = $request->portal_address;
        $portal->save();
        return response()->json($portal);
     }

     public function portal_edit($id)
     {
      $portal = Portal::find($id);
      return response()->json([
        'portal' => 200,
        'portal' => $portal,
      ]);
     }

     public function portal_update(Request $request, $id)
     {
      // $portal_id = $request->input('portal_id');  
      $portal = Portal::find($id);
      $portal->portal_name = $request->portal_name;
      $portal->portal_address = $request->portal_address;
      $portal->save();
      
      $mac = Mac::where('portal_name', $portal->portal_name)->get();
      
//       $mac->chunk(1000, function ($items) {
//     foreach ($items as $item) {
//         $item->update(['portal_address' => $request->portal_address]);
//     }
// });

        
    foreach($mac as $m)
    {
        $m->portal_address = $request->portal_address;
        $m->save();
    }
      return response()->json($portal);
      // return redirect('/portal')->with('success','Update The Portal Successfully');
     }


     public function portal_delete($id)
     {
      $portal = Portal::find($id);
      $portal->delete();
      return response()->json($portal);
      // return redirect('portal')->with('danger','Delete The Portal Successfully');
     }
}
