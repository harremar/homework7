var MODEL = (function () {
  var _getMyContent = function (pageID) {
    $.get(`pages/${pageID}/${pageID}.html`, function (data) {
      //   console.log(data);
      $("#app").html(data);
    });
  };
  return {
    getMyContent: _getMyContent,
  };
})();
