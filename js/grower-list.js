
MyAgDataMobile.growerList = (function () {

    var viewModel = kendo.observable({
        growerList: {},
        selectedUserId: 0
    });

    //fetches the list of movies from the service
    //depending on the listType filter
    function getGrowerList(listType) {
        var growerListoptions = {
            url: MyAgDataMobile.configuration.getGrowerListUrl,
            data: { userid: viewModel.selectedUserId, cropyear: myCropYear}, // 2013 },   //id=16&cropyear=2013  userid=16&cropyear=2013
            requestType: "GET",
            dataType: "JSON",
            callBack: callBack
        };
        //service call
        MyAgDataMobile.dataAccess.callService(growerListoptions);
    }
    //callback method from service call
    function callBack(result) {
        if (result.success === true) {
            viewModel.set("growerList", result.data);
        }
    }

    //this event is fired when movie list
    //type is changed from the UI
    function listTypeSelected(e) {

        getGrowerList(e.sender.selectedIndex);
    }
    //Loading the movie list with listType= 0
    //which is Now Running list
    function initList() {
        getGrowerList(0);
    }

    function initializeApp1() {
        application = new kendo.mobile.Application(document.body,
            {
                //   transition: 'slide',
                loading: "<h3>Loading...</h3>",
                skin: 'ios'
              //  skin: "flat"
            });

        ////initialize app
        //application = new kendo.mobile.Application(document.body,
        // {
        //     //   transition: 'slide',
        //     loading: "<h3>Loading...</h3>"

        // });

        //Display loading image on every ajax call
        $(document).ajaxStart(function () {

            //application.showLoading calls the showLoading() method of the 
            //pane object inside the application. During the application's 
            //initial view's init method this pane object may not be initialized
            //and so application.showLoading() may throw error.To prevent this
            //we need to do a check for existence application.pane before calling
            //application.showLoading();
            if (application.pane) {
                application.showLoading();
            }
        });

        //Hide ajax loading image on after ajax call
        $(document).ajaxStop(function () {

            if (application.pane) {
                application.hideLoading();
            }
        });
    }

    //handler for show event of the view
    function showGrowerList(e) {;
      //  alert("Grower Crop Year Value = " + myCropYear);
        //read the selected movie's details from the query string
        viewModel.set("selectedUserId", e.view.params.userId);
        initList();
    }


    return {
        showGrowerList: showGrowerList,
        initializeApp1: initializeApp1,
        getGrowerList: getGrowerList,
        viewModel: viewModel,
        listTypeSelected: listTypeSelected
    }

})();