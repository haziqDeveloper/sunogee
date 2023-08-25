<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MediaIboDomainUrl;
use App\Models\MediaIboContactDetail;
use App\Models\MediaIboVersion;
use App\Models\UploadFile;
use App\Models\Mac;
use App\Models\Portal;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use App\Http\Libraries\DataTable;

class MediaIboController extends Controller
{   
   
  function pagination()
  {
    $mac = Mac::orderBy('id', 'DESC')->paginate('15');
    return response()->json($mac);
  }
  
  function searchData($macid)
  {
   return Mac::where("macid","like","%".$macid."%")->get();
  }

  
  function getItemNoteExpiry($id)
{
  //  $mac_id = $request->input('mac_id');  
   $mac = Mac::find($id);
   return response()->json($mac);
}
  
  function changeItemExpiries(Request $request,$id)
    {
       $mac = Mac::find($id);
       $mac->note = $request->note;
       $mac->save();
       return response()->json($mac);
    }
  
  function changeItemStatus(Request $request,$id)
 {
   $mac = Mac::find($id);
   $mac->status = $request->status;
   $mac->update();
   return response()->json($mac);
 }
 
     function updateDomain($id, Request $request)
      {
         $panels = MediaIboDomainUrl::find($id);
         $panels->url = $request->input('url') ? $request->input('url') : "";
         $panels->save();
         return response()->json([
            'status'=>200,
            'message'=>'Admin Panel Update The Value.',
       ]);
      }
      
    function updateVersion($id, Request $request)
      {
         $panels = MediaIboVersion::find($id);
         $panels->version = $request->input('version') ? $request->input('version') : "";
         $panels->description = $request->input('description') ? $request->input('description') : "";
         $panels->file = $request->input('file') ? $request->file('file')->store('docs') : "";
         $panels->save();
         return response()->json([
            'status'=>200,
            'message'=>'Admin Panel Update The Value.',
       ]);
      }
      
      
    function updateContact(Request $request, $id)
      {
         $panels = MediaIboContactDetail::find($id);
         $panels->email = $request->email ? $request->input('email') : "";
         $panels->phone = $request->input('phone') ? $request->input('phone') : "";
         $panels->info = $request->input('info') ? $request->input('info') : "";
         
         
         if($request->hasFile('file'))
         {
             $image = $request->file('file');
         $imageName = time() . '_' . $image->getClientOriginalName();
        
        $panels->file = $imageName;
        $image->move(public_path('docs'), $imageName);
        //  $panels->file =  $request->file('file')->store('docs');
         }
         
         $panels->save();
         return response()->json([
            'status'=>200,
            $panels,
       ]);
      }  
      
      
    function deleteContactFile(Request $request, $id)
    {
        $panels = MediaIboContactDetail::find($id);
        $panels->file = "";
        $panels->save();
         return response()->json([
            'status'=>200,
            $panels,
       ]);
        
    }
  
  function changeItemPortal(Request $request)
  {
   $mac = Mac::find($request->id);
   $portal = Portal::find($request->portalId);
    if(!empty($portal)) {
        $mac->portal_name = $portal->portal_name;
        $mac->portal_address = $portal->portal_address;
  } else {
    $mac->portal_address = "";
    $mac->portal_name = "";
  }

   $mac->save();
   
   return response()->json($mac);
}

  
       function index()
    
    {
         $mac = Mac::orderBy('id', 'DESC')->get();
             if(Auth::check()) {
                 return view('Dashboard.Admin.deviceInfo', compact('mac'));
             }
     
             return redirect::to("/")->withSuccess('Oopps! You do not have access');
    }
    
          public function indexes()
    
    {
         $mac = Mac::orderBy('id', 'DESC')->get();
             if(Auth::check()) {
                 return view('Dashboard.Admin.macData', compact('mac'));
             }
     
             return redirect::to("/")->withSuccess('Oopps! You do not have access');
    }
    
    
        public function all()
        {

        $columns = [

            ['db' => 'id', 'dt' => 'id'],

            ['db' => 'macid', 'dt' => 'macid'],

            ['db'=> 'date','dt' =>'date'],

            ['db' => 'time', 'dt' => 'time'],
            
            ['db' => 'deviceinfo', 'dt' => 'deviceinfo'],
            
            ['db' => 'note', 'dt' => 'note'],

        ];

        DataTable::init(new Mac, $columns);


        DataTable::orderBy('id', 'desc');




        $slug = \request('datatable.query.slug','');

        $trashedPages = \request('datatable.query.trashedPages',NULL);

        $createdAt = \request('datatable.query.createdAt','');

        $updatedAt = \request('datatable.query.updatedAt','');

        $deletedAt = \request('datatable.query.deletedAt','');

        $sortOrder = \request('datatable.sort.sort');

        $sortColumn = \request('datatable.sort.field');

        if(!empty($trashedPages)){

            DataTable::getOnlyTrashed();

        }

        if($slug != '') {

            DataTable::where('slug', 'LIKE', '%'.addslashes($slug).'%');

        }

        if($createdAt != '') {

            $createdAt =  Carbon::createFromFormat('m/d/Y', $createdAt);

            $cBetween = [$createdAt->hour(0)->minute(0)->second(0)->timestamp, $createdAt->hour(23)->minute(59)->second(59)->timestamp];

            DataTable::whereBetween('created_at', $cBetween);

        }

        if($updatedAt != '') {

            $updatedAt =  Carbon::createFromFormat('m/d/Y', $updatedAt);

            $uBetween = [$updatedAt->hour(0)->minute(0)->second(0)->timestamp, $updatedAt->hour(23)->minute(59)->second(59)->timestamp];

            DataTable::whereBetween('updated_at', $uBetween);

        }

        if(!empty($deletedAt)){

            $sWhere = function($query) use ($deletedAt) {

                $deletedAt = Carbon::createFromFormat('m/d/Y', $deletedAt);

                $dBetween = [$deletedAt->hour(0)->minute(0)->second(0)->timestamp, $deletedAt->hour(23)->minute(59)->second(59)->timestamp];

                $query->whereBetween('deleted_at',$dBetween);

            };

            DataTable::getOnlyTrashed($sWhere);

        }

        $where = function($query) {

            $title = \request('datatable.query.title', '');

            if(!empty($title)) {

                $query->where('language_page.title', 'LIKE', '%'.addslashes($title).'%');

            }

        };

        if(!empty($sortOrder) && !empty($sortColumn)){

            DataTable::orderBy($sortColumn ,$sortOrder);

        }

        // DataTable::with('languages', $where);

        // DataTable::whereHas('languages', $where);

        $pages = DataTable::get();
        

        $index=1;

        $pageNumber=(\request('datatable.pagination.page')-1)*\request('datatable.pagination.perpage');
        if (\request('datatable.pagination.total') < $pageNumber)
        {
            $pageNumber = 0;
        }

        if (sizeof($pages['data']) > 0) {

            $dateFormat = config('settings.date-format');

            foreach ($pages['data'] as $key => $page) {

                $pages['data'][$key]['index']=$index+$pageNumber;

                // $pages['data'][$key]['macid'] = '';

                // $pages['data'][$key]['date'] = '';

                // $pages['data'][$key]['time'] = '';

                // $pages['data'][$key]['deviceinfo'] = '';

                // $pages['data'][$key]['note'] = '';

                }

                // if (!empty($page['dimage'])){

                //     $newsImage = explode('.', $page['dimage']);

                //     if ($newsImage[1] == 'mp4'){

                //         $pages['data'][$key]['dimage'] = '<video controls src="'.url($page['dimage']).'" width="250"></video>';

                //     }else{

                //         $pages['data'][$key]['dimage'] = '<img src="'.imageUrl($page['dimage'], 120, 120, 100, 1).'" />';

                //     }

                // }

                // foreach ($page['languages'] as $key1 => $translation) {

                //     if ($translation->pivot['language_id'] == 2) {

                //         $pages['data'][$key]['en_title'] = $translation->pivot->title;

                //         $pages['data'][$key]['en_content'] = $translation->pivot->content;

                //     } else {

                //         $pages['data'][$key]['ar_title'] = $translation->pivot->title;

                //         $pages['data'][$key]['ar_content'] = $translation->pivot->content;

                //     }

                // }



                if(!empty($trashedPages)){

                    $pages['data'][$key]['actions'] = '<a class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill restore-record-button" href="javascript:{};" data-url="' . route('admin.pages.restore', ['pages' => $page['id']]) . '" title="Restore Page"><i class="fa fa-fw fa-undo"></i></a>'.'<span class="m-badge m-badge--danger">'.Carbon::createFromTimestamp($page['deleted_at'])->format($dateFormat).'</span>';



                }else{

                    $pages['data'][$key]['actions'] = '<a href="'.url('/', $page['id']).'" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit"><i class="fa fa-fw fa-edit"></i></a>' .

                        '<a class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill delete-record-button" href="javascript:{};" data-url="'. url('/', $page['id']).'" title="Delete"><i class="fa fa-fw fa-trash-o"></i></a>';

                }

                // $pages['data'][$key]['slug'] = $page['slug'];

                $index=$index+1;

            }

    //   dd($pages);
        return response($pages);

    }

    
    function changeItemExpiry(Request $request)
{
       $mac_id = $request->input('mac_id');  
       $mac = Mac::find($mac_id);
       $mac->note = $request->note;
       $mac->save();
       return redirect('/device_info')->with('message','Update The Note Successfully');
}

    function store(Request $request)
    {  
      $mac = Mac::where('macid', '=', request('macid'))->first();
    
      if($mac === null)
      {  
        $mac = new Mac();
        $mac->macid = $request->macid;
        $mac->date = $request->date; 
        $mac->time = $request->time; 
        $mac->deviceinfo = $request->deviceinfo;
        $mac->status = '1';
        $mac->portal_name = null;
        $mac->portal_address = null;
        $mac->note = 'empty';
        $mac->save();
        return response()->json($mac);
        }
        else 
        {
$mac->date = $request->date;
            $mac->time = $request->time;
            $mac->deviceinfo = $request->deviceinfo;
            
            // New Code
//   $portal = Portal::find($request->portal_name);
// if (!empty($portal)) {
//     $mac->portal_address = $object->portal_address;
// } else {
//     $mac->portal_address = "";
// }

// $mac->update();

  $portal = Portal::all();
if ($portal && !empty($portal->portal_address)) {
    $mac->portal_address = $portal->portal_address;
}
//  else {
//     $mac->portal_address = "";
// }

$mac->update();

return response()->json($mac);
}
            
        }

    public function apiMediaIboSubAdmin(Request $request)
   {
       
    //  $subAdmin = SubAdmin::all();
          $subAdmin = MediaIboDomainUrl::first();
    //  dd($subAdmin->toJson());
    //  return response()->json($subAdmin);
     return response($subAdmin);
   }
   
      public function apiMediaIboSubContact(Request $request)
   {
      $url = "https://sunogee.xyz/ebox/public/docs/";
     $ContactDetail = MediaIboContactDetail::first();
     $ContactDetail->file = $url.$ContactDetail->file;
     return response($ContactDetail);
   }
   
    public function apiMediaIboApkVersion($version)
   {
     $ver = MediaIboVersion::first();
     
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
   
   	public function update_Media_Ibo_version_store(Request $request){
  
    if ($request->file('file') == null) {
    $file = "";
    }
    else
    {
       $version = MediaIboVersion::where($request->id)->update([
          'file'         => $request->file('file')->store('docs'),
      ]);
    }
      $version = MediaIboVersion::where($request->id)->update([
          'version'       => $request->input('version') ? $request->input('version') : "",
          'description'   => $request->input('description') ? $request->input('description') : "",
      ]);
  
      return redirect('/update-version')->with('message','Update Version Successfully');
        
	}

    function getMediaIboSubAdmin()
    {

        $subAdmin = MediaIboDomainUrl::all();
        if(Auth::check()) {
            return view('Dashboard.Admin.MediaIboDomainUrl', compact('subAdmin'));    
     }

     return redirect::to("/")->withSuccess('Oopps! You do not have access');
        
    }

    function getMediaIboVersion()
    {

        $versions = MediaIboVersion::all();
        if(Auth::check()) {
            return view('Dashboard.Admin.MediaIboVersion', compact('versions'));    
     }

     return redirect::to("/")->withSuccess('Oopps! You do not have access');
        
    }
    
    function apimediaIboApkVersionData()
    {
        $apkfile = MediaIboVersion::all();
        return response()->json($apkfile);
    }
    
    public function mac_delete($id)
{
    $mac = Mac::findOrFail($id);
    $mac->delete();
    return response()->json($mac);
    // return redirect('devices_info')->with('danger','Delete The Mac Address');
}
    
     function getMediaUploadFile(Request $request)
      {

        $upload = UploadFile::all();
        if(Auth::check()) {
            return view('Dashboard.Admin.UploadFile', compact('upload'));    
     }

     return redirect::to("/")->withSuccess('Oopps! You do not have access');
        
    }
    
    function storeMediaUploadFile(Request $request)
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


    function getMediaIboContact()
    {

        $ContactDetail = MediaIboContactDetail::all();
        if(Auth::check()) {
            return view('Dashboard.Admin.MediaIboContactDetail', compact('ContactDetail'));    
     }

     return redirect::to("/")->withSuccess('Oopps! You do not have access');
        
    }

    function storeMediaIboSubAdmin(Request $request)
    {   
        $subAdmin = MediaIboDomainUrl::where($request->id)->update([
            'url'=>$request->input('url') ? $request->input('url') : "",
        ]);
        return redirect('/domain-url')->with('message','Update Domain Url Successfully');      
    }
    
    
    function changeItemNote(Request $request)
    {
       $mac_id = $request->input('mac_id');  
       $mac = Mac::find($mac_id);
       $mac->note = $request->note;
       $mac->save();
       return json_encode(array('statusCode'=>200));
    }
    
    public function mac_edit($id)
     {
      $mac = Mac::find($id);
      return response()->json([
        'mac' => 200,
        'mac' => $mac,
      ]);
     }

    function storeMediaIboContact(Request $request)
    {   
        $ContactDetail = MediaIboContactDetail::where($request->id)->update([
            'email'=>$request->input('email') ? $request->input('email') : "",
            'phone'=>$request->input('phone') ? $request->input('phone') : "",
            'info'=>$request->input('info') ? $request->input('info') : "",
        ]);
        return redirect('/contact-detail')->with('message','Update Contact Successfully');     
    }
    

}
