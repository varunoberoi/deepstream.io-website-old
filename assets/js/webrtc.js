function start() {
    var ds = deepstream( 'http://52.28.240.163:6020' );
    var iam = ds.getUid();
    ds.login( {
        username: 'ds-webrtc-example-' + iam
    } );

    var example = document.querySelector( '.webrtc-example' );

    var sourcevid = document.querySelector( '.localvideo' );

    var mediaStream = null;
    var calls = [];
    var addressBook = [];

    if( !navigator.getUserMedia ) {    
        showError( 'Your browser doesn\'t support WebRTC :(' );    
        return;
    }
    
    navigator.getUserMedia( {
            audio: true,
            video: {
                width: 160,
                height: 120
            }
        },
        function( stream ) {
            mediaStream = stream;
            sourcevid.src = window.URL.createObjectURL( stream );
            startApp();
        },
        function( err ) {
            showError( err.name );
        }
    );

    function showError( msg ) {
        $( '.error-screen .msg b' ).html( msg );
        $('.error-screen' ).fadeIn( 500 );
        setTimeout(function(){
            $('.error-screen' ).fadeOut( 500 );
        }, 2000 );
    }

    function onCallRecieved( call, metaData ) {
        call.on( 'established', onCallEstablished.bind( null, call, metaData ) );
        call.accept( mediaStream );
        calls.push( call );
    }

    function onCallEstablished( call, metaData, stream ) {
        var remotevid = document.querySelector( '.remotevideo:not(.active)' );
        remotevid.src = window.URL.createObjectURL( stream );
        remotevid.classList.add( 'active' );

        call.on( 'ended', function() {
            remotevid.classList.remove( 'active' );
            window.URL.revokeObjectURL( remotevid.src );
            remotevid.src = '';
            calls.splice( calls.indexOf( remotevid ), 1 );
        } );
    }

    function exitRoom( callback ) {

        endAllCalls();
        ds.rpc.make( 'exit-room', {
                user: iam
            },
            function( error, data ) {
                if ( !error ) {
                    callback && callback();
                }
        } );
    }

    function enterRandomRoom( callback ) {
        ds.rpc.make( 'get-random-room', {
                user: iam
            },
            function( error, data ) {
                var call;
                var metaData = {
                    username: iam
                };
                if ( !error ) {
                    for ( var i = 0; i < data.length; i++ ) {
                        if ( data[ i ] !== iam ) {
                            call = ds.webrtc.makeCall( data[ i ], metaData, mediaStream );
                            call.on( 'established', onCallEstablished.bind( null, call, metaData ) );
                            calls.push( call );
                        }
                    }
                    callback && callback();
                }

        } );
    }

    function changeRoom() {
        var changeRoomButton = document.querySelector( '.change-room' );
        changeRoomButton.classList.add( 'changing-room');
        exitRoom( enterRandomRoom( function() {
            changeRoomButton.classList.remove( 'changing-room');
        }) );
    }

    function endAllCalls() {
        for ( var i = 0; i < calls.length; i++ ) {
            calls[ i ].end();
        }
        calls = [];
    }

    function startApp() {
        ds.webrtc.registerCallee( iam, onCallRecieved );
        window.addEventListener( "unload", endAllCalls, true );
        enterRandomRoom();
        example.classList.add( 'active' );
    }

    function stopApp() {
        exitRoom();
        window.URL.revokeObjectURL( sourcevid.src );
        mediaStream.stop && mediaStream.stop();
        sourcevid.src = '';
        example.classList.remove( 'active' );
        ds.close();
    }

    window.changeRoom = changeRoom;
    window.stopApp = stopApp;
}
