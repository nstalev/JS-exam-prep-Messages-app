$(()=>{
     //Attach Event Handlers
     (()=>{
        $('header').find('a[data-target]').click(navigateTo);

         $('#formRegister').submit(registerUser);
         $('#formLogin').submit(loginUser);
         $('#linkMenuLogout').click(logOutUser);

        $('#linkUserHomeMyMessages').click(()=>{
            showView('MyMessages')

        });
         $('#linkUserHomeSendMessage').click(()=>{
             showView('SendMessage')

         });
         $('#linkUserHomeArchiveSent').click(()=>{
             showView('Archive')

         });


    })();

     function registerUser(ev) {
         ev.preventDefault();

         let registerUsername = $('#registerUsername');
         let registerPasswd = $('#registerPasswd');
         let registerName = $('#registerName');

         let username = registerUsername.val();
         let password = registerPasswd.val();
         let name = registerName.val();

         auth.register(username, password, name)
             .then((userInfo)=>{
                 registerUsername.val('');
                 registerPasswd.val();
                 registerName.val();
                 saveSession(userInfo);
                 showInfo('User registration successful');
                 showView('UserHome');

             })

     }


    function loginUser(ev) {
        ev.preventDefault();
        let loginUsername = $('#loginUsername');
        let loginPasswd = $('#loginPasswd');

        let username = loginUsername.val();
        let password =  loginPasswd.val();

        auth.login(username, password)
            .then((userInfo) =>{
            loginUsername.val('');
            loginPasswd.val('');
            saveSession(userInfo);
            showInfo('User login successful');
            showView('UserHome');
            })

    }


    function logOutUser() {
        auth.logout()
            .then(() =>{
                sessionStorage.clear();
                showInfo('LogOut successful');
                userLoggedOut();
            })
            .catch(handleError)
    }



    function navigateTo() {
        let dataTarget = $(this).attr('data-target');
        console.log(dataTarget);
        showView(dataTarget);
    }

    if(sessionStorage.getItem('authtoken') === null){
        userLoggedOut();
    }else{
        userLoggedIn();
    }


    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#view' + viewName).show();
    }
    
    
    function userLoggedIn() {
        $('.anonymous').hide();
        $('.useronly').show();
        let username = sessionStorage.getItem('username');
        $('#spanMenuLoggedInUser').text(`Welcome, ${username}`);
        $('#viewUserHomeHeading').text(`Welcome, ${username}`);
        showView('UserHome');
    }

    function userLoggedOut() {
        $('.anonymous').show();
        $('.useronly').hide();
        $('#spanMenuLoggedInUser').text('');
        showView('AppHome');
    }



    function saveSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authtoken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('name', userInfo['name']);
        userLoggedIn();
    }

    function handleError(reason) {
        showError(reason.responseJSON.description);
    }

    function showInfo(message) {
        let infoBox = $('#infoBox');
        infoBox.text(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    }

    function showError(message) {
        let errorBox = $('#errorBox');
        errorBox.text(message);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 3000);
    }


    // Handle notifications
    $(document).on({
        ajaxStart: () => $("#loadingBox").show(),
        ajaxStop: () => $('#loadingBox').fadeOut()
    });

});