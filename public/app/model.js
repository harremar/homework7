var MODEL = (function () {
  var _getMyContent = function (pageID, callback) {
    $.get(`pages/${pageID}/${pageID}.html`, function (data) {
      //   console.log(data);
      $("#app").html(data);
      if (callback) {
        callback();
      }
    });
  };
  return {
    getMyContent: _getMyContent,
  };
})();
