MyAgDataMobile.fieldDetail = (function () {

    var viewModel = kendo.observable({
        cropList:  {},
        practiceList: {},
        typeList: {},
        selectedField: {
            userId: "",
            partFieldId: "",
            typeCode: "",
            practiceCode: ""
        },
        growerId: 0,
        growerPartFieldId: 0,
        partFieldId: 0,
        cropCode: 91,
        cropName: "crop name",
        practiceCode: "002",
        practiceName: "Irrigated",
        typeCode: "012",
        typeName: "Spring Wheat",
        countyName: "County name",
        stateName: "State name",
        acres: 0,
        share: 0,
        fieldName: "Field Name",
        plantDate: "2013-04-01",
        updateClick: function (e) {
            //alert('update Field Succeeded -fieldid = ' + this.selectedField.partFieldId);
            //    viewModel.set("selectedField", {
            //            userId: 16,
            //            partFieldId: viewModel.get("partFieldId"),
            //            typeCode: viewModel.get("typeCode"),
            //            practiceCode: viewModel.get("practiceCode")
            //            });
                var updateOptions = {
                    url: MyAgDataMobile.configuration.updateFieldDetailUrl,
                    requestType: "GET",
                    dataType: "JSON",
                    data: { userId: 16, 
                        partFieldId: viewModel.get("partFieldId"),
                        cropId: viewModel.get("cropCode"), 
                        typeCode: viewModel.get("typeCode"), 
                        practiceCode: viewModel.get("practiceCode"),
                          },
                    callBack: function (result) {
                        //if you are using PhoneGap to deploy as an app, 
                        //you should use the notification api
                        //navigate to User Account screen.
                        //  view.loader.hide();
                      
                        // window.kendoMobileApplication.navigate("#:back");
                      
                        //   window.kendoMobileApplication.navigate("#:back");


                        if (result.success)
                            {
                  //          MyAgDataMobile.common.navigateToView('#Fieldlist-view'); //?GrowerId=' + viewModel.get("growerId"));
                            // window.kendoMobileApplication.navigate("#fieldlist-view");
                            alert('Success');
                            }
                        else {
                            alert('Error on PartField Update...');
                       //     alert('results.success = ' + result.success);
                       //     alert('results = ' + result.success);
                       //     MyAgDataMobile.common.navigateToView("\\#fieldlist-view?GrowerId=" + viewModel.growerId);
                        }
                    }
                };
                MyAgDataMobile.dataAccess.callService(updateOptions);    
        },
        cropChangeEvent: function (e) {
            alert("Change the Crop - Update the dropdownlists");
        }
        });


    function loadFieldData() {
        var fieldDetailOptions = {
            url: MyAgDataMobile.configuration.getFieldDetailUrl,
            data: { userid: 16, growerid: viewModel.growerId, growerpartfieldid: viewModel.growerPartFieldId }, // 259408}, // 258097 },   //id=16&cropyear=2013
            requestType: "GET",
            dataType: "JSON",
            callBack: callBackFieldDetail
        };
        MyAgDataMobile.dataAccess.callService(fieldDetailOptions);
    }

    function loadCropData() {
   //     alert('get crop list for field = ' + viewModel.partFieldId);
        var cropListOptions = {
            url: MyAgDataMobile.configuration.getCropListUrl,
            data: { userid: 16, partFieldId: viewModel.partFieldId, cropyear: 2013 },   //  254719  // id=16&cropyear=2013
            requestType: "GET",
            dataType: "JSON",
            callBack: cropListCallBack
        };
        MyAgDataMobile.dataAccess.callService(cropListOptions);
    };

    function loadTypeData() {
        var typeListOptions = {
            url: MyAgDataMobile.configuration.getTypeListUrl,
            data: { id: 16, cropyear: 2013, commodityid: viewModel.cropCode },   //id=16&cropyear=2013
            requestType: "GET",
            dataType: "JSON",
            callBack: typeListCallBack
        };
        MyAgDataMobile.dataAccess.callService(typeListOptions);
    }

    function loadPracticeData() {
        var practiceListOptions = {
            url: MyAgDataMobile.configuration.getPracticeListUrl,
            data: { id: 16, cropyear: 2013, commodityId: viewModel.cropCode },   //id=16&cropyear=2013
            requestType: "GET",
            dataType: "JSON",
            callBack: practiceListCallBack
        };
        MyAgDataMobile.dataAccess.callService(practiceListOptions);
    }

    //callback method from service call
    function callBackFieldDetail(result) {
        if (result.success === true) {
        //    alert('Success on Field Detail Callback');
            if (result.success === true) {
                viewModel.set("partFieldId", result.data.PartFieldId);
                viewModel.set("cropCode", result.data.CommodityCodeId);
                viewModel.set("cropName", result.data.CommodityName);
                if (result.data.PracticeCode == null)
                {
                    viewModel.set("practiceCode", "");
                    viewModel.set("practiceName", "");
                }
                else
                {
                    viewModel.set("practiceCode", result.data.PracticeCode);
                    viewModel.set("practiceName", result.data.PracticeAbbreviation);
                }
                    viewModel.set("typeCode", result.data.TypeCode);
                    viewModel.set("typeName", result.data.TypeName);
                    viewModel.set("countyName", result.data.GrowerCountyName);
                    viewModel.set("stateName", result.data.GrowerStateName);
                    viewModel.set("acres", result.data.CalculatedAcres);
                    viewModel.set("share", result.data.FieldShare);
                    viewModel.set("fieldName", result.data.BusinessName);
                    viewModel.set("plantDate", result.data.CompletedDate);

                    if (result.data.CompletedDate != null && result.data.CompletedDate != "")
                    {
                        var str = result.data.CompletedDate;
                        var dateParts = str.split("-");
                        var intYear = parseInt(dateParts[0], 10);
                        var intMonth = parseInt(dateParts[1], 10) - 1;
                        var intDay = parseInt(dateParts[2], 10);

                        $("#plantingdate").kendoDatePicker({
                            value: new Date(intYear, intMonth, intDay)
                        });
                    }

                    //   $("#plantingdate").attr('value', new Date('2013-08-11'));
                    //  $("#plantingdate").kendoDatePicker();

                //    $("#CropDropDown").data('kendoDropDownList').value(viewModel.cropCode);
                //    $("#Practice").data('kendoDropDownList').value(viewModel.practiceCode);
                //    $("#Type").data('kendoDropDownList').value(viewModel.typeCode);

                    //navigate to User Account Growers.
                //MyAgDataMobile.common.navigateToView("GrowersList.html");
          //          alert("call load Crop");
                    loadCropData();
                }
            else {
                //any error handling code
                alert('error on Field Detail callback');
            }
        }
    }

    //callback method from service call
    function cropListCallBack(result) {
        if (result.success === true) {
            viewModel.set("cropList", result.data);
            loadTypeData();
            loadPracticeData();
        }
    }

    //callback method from service call
    function practiceListCallBack(result) {
        if (result.success === true) {
            viewModel.set("practiceList", result.data);
        }
    }

    //callback method from service call
    function typeListCallBack(result) {
        if (result.success === true) {
            viewModel.set("typeList", result.data);
        }
    }

    function CropCodeChange() {
     //   alert("Change the Crop Code");
    }

    //handler for show event of the view
   // function showDetail(e) {
    function showDetail(e) {
        //    alert('made it to the showdetails');
        //    alert('GrowerPF value = ' + e.view.params.GrowerPartFieldId);
        //    alert('GrowerId value = ' + e.view.params.GrowerId);
        //hard coding today's date for selected date
       // viewModel.set('selectedDate', new Date().toLocaleDateString());
        //read the selected movie's details from the query string
        viewModel.set("growerPartFieldId", e.view.params.GrowerPartFieldId);
        viewModel.set("partFieldId", e.view.params.PartFieldId); //e.view.params.PartFieldId);
        viewModel.set("growerId", e.view.params.GrowerId); //e.view.params.PartFieldId);



        ////hard coding today's date for selected date
        //viewModel.set('selectedDate', new Date().toLocaleDateString());

        ////read the selected movie's details from the query string
        //viewModel.set("selectedPartField", {
        //    growerId: e.view.params.PartFieldId,
        //    growerName: e.view.params.BusinessName,
        //    cropYear: e.view.params.CropYear
        //});
        //getFieldList(e.view.params.GrowerId);


        loadFieldData();
    }

    function loadPracType() {
    //    alert("Load type and Prac");
        loadTypeData();
        loadPracticeData();
    }

    return {
        showDetail: showDetail,
   //     initialize3: initialize3,
        loadFieldData: loadFieldData,
        loadPracType: loadPracType,
        viewModel: viewModel
    }
})();