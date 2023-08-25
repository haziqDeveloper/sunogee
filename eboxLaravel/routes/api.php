<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MediaIboController;
use App\Http\Controllers\CustomAuthController;
use App\Http\Controllers\PortalController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('sunogee/device_infos',[MediaIboController::class, 'pagination']);

Route::get('portalAPI',[PortalController::class, 'portal_index']);

Route::post('portals',[PortalController::class, 'portal_storing']);

Route::get('portalDelete/{id}',[PortalController::class, 'portal_delete']);

Route::get('portalEdit/{id}',[PortalController::class, 'portal_edit']);

Route::put('updatePortal/{id}',[PortalController::class, 'portal_update']);

Route::get('deviceDelete/{id}',[MediaIboController::class, 'mac_delete']);

Route::get('search/{macid}',[MediaIboController::class, 'searchData']);

Route::post('changeItemStatus/{id}',[MediaIboController::class, 'changeItemStatus']);

Route::post('sunogee/device_info',[MediaIboController::class, 'store']);

Route::post('login', [CustomAuthController::class, 'customLogin']);

Route::put('sunogee/domainUrl/{id}',[MediaIboController::class, 'updateDomain']);

Route::put('sunogee/updateVersion/{id}',[MediaIboController::class, 'updateVersion']);


Route::put('sunogee/contactDetail/{id}',[MediaIboController::class, 'updateContact']);

Route::post('sunogee/contactDetailFile/{id}',[MediaIboController::class, 'deleteContactFile']);

Route::post('sunogee/changePortal',[MediaIboController::class, 'changeItemPortal']);

Route::get('sunogee/getNoteExpiry/{id}',[MediaIboController::class, 'getItemNoteExpiry']);

Route::put('sunogee/changeExpiry/{id}',[MediaIboController::class, 'changeItemExpiries']);

Route::get('sunogee/domain_Url',[MediaIboController::class, 'apimediaIboSubAdmin']);

Route::get('sunogee/contact_detail',[MediaIboController::class, 'apimediaIboSubContact']);

Route::get('sunogee/apk/version/data',[MediaIboController::class, 'apimediaIboApkVersionData']);

Route::get('sunogee/apk/version/{version}',[MediaIboController::class, 'apimediaIboApkVersion']);