MyAgDataMobile.common = (function () {

    function navigateToView(view) {
        //Navigate to local/remote or external view
        MyAgDataMobile.main.getKendoApplication().navigate(view);
    }
    function showLogOffButton(){
        //show log off button.
        $(".mt-main-layout-btn-logoff").show();
    }

    function hideLogOffButton(){
        //hide log off button
        $(".mt-main-layout-btn-logoff").hide();
    }

    function growerList() {
        navigateToView('#Growerlist-view');
    }

    return {       
        navigateToView: navigateToView,
        showLogOffButton: showLogOffButton,
        hideLogOffButton: hideLogOffButton,
        growerList: growerList
    }

})();