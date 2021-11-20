<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    /**
     * Mark all notifications as read 
     * 
     * Run when a user opens the notifications inbox
     */
    public function markAsRead()
    {
        foreach (Auth::user()->unreadNotifications as $notif)
        {
            $notif->markAsRead();
        }

        return back()->withInput();
    }
}
