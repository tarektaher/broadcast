<?php

namespace App\Listeners;

use App\Events\ChatsEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ChatsListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  ChatsEvent  $event
     * @return void
     */
    public function handle(ChatsEvent $event)
    {
        //
    }
}
