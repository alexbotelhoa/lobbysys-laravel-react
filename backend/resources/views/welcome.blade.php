<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">

        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">

        <!-- Styles -->
        <style>
            * {
                margin: 0;
                padding: 0;
                outline: 0;
                box-sizing: border-box;
            }

            html, body, #root {
                min-height: 100%;
            }

            body {
                font-family: 'Roboto', Arial, Helvetica, sans-serif;
                height: 100vh;
                background: #000 url('assets/background.jpg') no-repeat;
                background-size: cover;
                -webkit-font-smoothing: antialiased !important;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 84px;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 13px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }
        </style>
    </head>
    <body>
        <div id="app">
            <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div class="container">
                    <a class="navbar-brand" href="{{ url('/') }}">
                        <img src="assets/logo.png" title="">
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <!-- Left Side Of Navbar -->
                        <ul class="navbar-nav mr-auto"></ul>

                        <!-- Right Side Of Navbar -->
                        <ul class="navbar-nav ml-auto">

                            <!-- Authentication Links -->
                            <div class="top-right links">
                                <a href="{{ route('dashboard') }}"><img src="assets/login.png" title="Dashboard"></a>
                            </div>
                            {{--@endif--}}
                        </ul>
                    </div>
                </div>
            </nav>

            <div class="content">
                <div class="title m-b-md">
                    <div id="root"></div>
                </div>
            </div>
        </div>

        <script type="text/javascript" src="js/app.js"></script>
        <script id="__bs_script__">
            //<![CDATA[
            document.write("<script async src='http://192.168.1.101:8000/browser-sync/browser-sync-client.js?v=2.26.7'><\/script>");
            //]]>
        </script>
    </body>
</html>
