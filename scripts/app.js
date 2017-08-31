$(()=>{

     //Attach Event Handlers
     (()=>{
        $('header').find('a[data-target]').click(navigateTo);

    })();

    function navigateTo() {
        let dataTarget = $(this).attr('data-target');

        showView(dataTarget);
    }


    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#view' + viewName).show();
    }
    
    
    function userLoggedIn() {
        let username = sessionStorage.getItem('username');
        $('#spanMenuLoggedInUser').text(username);
        showView('UserHome');
    }

    function userLoggedOut() {
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