<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Laravel</title>
        <link rel="stylesheet" href="{{asset("css/app.css")}}">
        <style>
            .list-group{
                overflow-y: scroll;
                height: 250px;
            }
            .white{
                background-color: #ffffff;
            }

            .time{
                font-size: 9px;

                margin-bottom: -10px;
            }

        </style>


    </head>
    <body>
    <div class="container">
        <div id="app" class="row">

            <div class="offset-2 col-4 white offset-sm-1 col-sm-10">
                <li class="list-group-item active">Chat room &ensp;<span class="badge badge-danger">@{{ numberOfUsers }}</span></li>
                <span class="badge badge-pill badge-primary">@{{ typing }}</span>
                <ul id="container" class="list-group " v-chat-scroll>

               <message   v-for="value,index in chat.message"
                          :key=value.index
               :color= chat.color[index]
               :user= chat.user[index]
                          :time= chat.time[index]
               >

                   @{{ value }}
               </message>

            </ul>
                <input type="text" class="form-control" v-model="message" @keyup.enter='send' placeholder="Your message..."></div>

        </div>
    </div>

    <script type="text/javascript" src="{{asset("js/app.js")}}"></script>
    <script type="text/javascript">



        /*$('.list-group').perfectScrollbar();*/
    </script>

    </body>
</html>
