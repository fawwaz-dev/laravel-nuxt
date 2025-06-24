<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::middleware('guest')->post('/register', [AuthController::class, 'register']);
Route::middleware('guest')->post('/login', [AuthController::class, 'login']);
Route::middleware('auth')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth')->get('/user', [AuthController::class, 'user']);
