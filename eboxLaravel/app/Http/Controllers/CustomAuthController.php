<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Hash;
use Session;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
class CustomAuthController extends Controller
{
    public function index()
    {
        return view('auth.login');
    }  
    public function RedirectToLogin()
    {
        return redirect('login');
    }
      
    public function customLogin(Request $request)
    {
        $fields = $request->validate([

            'email'=>'required|string|email',
            'password'=>'required|string'   
           ]);
   
           //Check email
   
           $user= User::where('email', $fields['email'])->first();
   
           //Check Password
           if(!$user || !Hash::check($fields['password'], $user->password) ){
               return response([
                   'message'=>'Invalid Credentials'
               ], 401);
           }
   
           $token = $user->createToken('myapptoken')->plainTextToken;
   
           $response= [
               'user' => $user,
               'token'=> $token
           ];
   
           return response($response, 201);
    }

    public function registration()
    {
        return view('auth.registration');
    }
      
    public function customRegistration(Request $request)
    {  
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);
           
        $data = $request->all();
        $check = $this->create($data);
         
        return redirect("/")->withSuccess('You have signed-in');
    }

    public function create(array $data)
    {
      return User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => Hash::make($data['password'])
      ]);
    }    
    
    public function dashboard()
    {
        if(Auth::check()){
            return view('auth.dashboard');
        }
  
        return redirect("/")->withSuccess('You are not allowed to access');
    }
    
    public function signOut() {
        Session::flush();
        Auth::logout();
  
        return Redirect('/');
    }
}
