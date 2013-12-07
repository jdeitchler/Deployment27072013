MyAgDataMobile.configuration = (function () {

    //var serviceUrl = "http://dva-1l8gfs1-l/MyAgDataMobile.webapi/api/";
    var serviceUrl = "http://api.kendomobilebook.com/api/";
    var myAgDataServiceUrl = "http://myagdatawebapi.cloudapp.net/api/";
 //   var myAgDataServiceUrl = "http://29f10f68ed9c400cb27147795380ec70.cloudapp.net/api/";

    return {            
        serviceUrl: serviceUrl,
        accountUrl: myAgDataServiceUrl + "Account/",
        accountLoginUrl: myAgDataServiceUrl + "Account/LogUserIn",
        getMovieListUrl: serviceUrl + "Movies/GetMovieList/",
        getGrowerListUrl: myAgDataServiceUrl + "growers/getgrowers/",
        getFieldListUrl: myAgDataServiceUrl + "partfield/GetGrowerPartFieldShapeViewModels/",
        getFieldDetailUrl: myAgDataServiceUrl + "partfield/GetGrowerPartFieldShapeViewModelDetails/",
        updateFieldDetailUrl: myAgDataServiceUrl + "partfield/UpdatePartField/",
        getCropListUrl: myAgDataServiceUrl + "reference/GetIceCommodities/",
        getPracticeListUrl: myAgDataServiceUrl + "partfield/GetCommodityPractices/",
        getTypeListUrl: myAgDataServiceUrl + "reference/GetCommodityTypes/",
        getTrailersUrl: serviceUrl + "Movies/GetTrailers/",
        purchaseTicketsUrl: serviceUrl + "Tickets"
    }
})();