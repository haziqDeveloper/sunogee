<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomAuthController;
use App\Http\Controllers\DashBoardController;
use App\Http\Controllers\SubAdminController;
use App\Http\Controllers\IboxController;
use App\Http\Controllers\IboController;
use App\Http\Controllers\MediaIboController;
use App\Http\Controllers\IbossController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', [CustomAuthController::class, 'index'])->name('login');

Route::post('custom-login', [CustomAuthController::class, 'customLogin'])->name('login.custom'); 

Route::get('/', [CustomAuthController::class, 'RedirectToLogin']);

Route::get('registration', [CustomAuthController::class, 'registration'])->name('register-user');

Route::post('custom-registration', [CustomAuthController::class, 'customRegistration'])->name('register.custom'); 

Route::get('signout', [CustomAuthController::class, 'signOut'])->name('signout');

Route::get('dashboard',[DashBoardController::class, 'index']);

Route::get('add-subadmin',[DashBoardController::class, 'index']);



Route::get('domain-url',[MediaIboController::class, 'getMediaIboSubAdmin']);

Route::post('domain-urls',[MediaIboController::class, 'storeMediaIboSubAdmin']);

Route::get('contact-detail',[MediaIboController::class, 'getMediaIboContact']);

Route::post('contact-details',[MediaIboController::class, 'storeMediaIboContact']);

Route::get('update-version',[MediaIboController::class, 'getMediaIboVersion']);

Route::post('update_versions',[MediaIboController::class, 'update_Media_Ibo_version_store']);

Route::put('/changeExpiry',[MediaIboController::class, 'changeItemExpiry']);

Route::put('/changeNote',[MacController::class, 'changeItemNote']);

Route::get('mac-edit/{id}',[MediaIboController::class, 'mac_edit']);

Route::get('device_info',[MediaIboController::class, 'index']);

Route::get('deviceinfo',[MediaIboController::class, 'indexes']);

Route::post('list/mac',[MediaIboController::class, 'all']);


Route::delete('delete/{id}',[MediaIboController::class,'mac_delete'])->name('item.delete');

