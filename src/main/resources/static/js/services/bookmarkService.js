(function () {
    angular.module("app")
            .service('bookmarkService', BookmarkService);

    BookmarkService.$inject = ['$http', '$q'];

    function BookmarkService($http, $q) {

        var bookmarksList = [];

        this.getBookmarks = function () {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks"
            }
            return $http(req).success(function (response) {
                return bookmarksList = response.data;
            }).error(function () {
                return def.reject("Failed to get bookmark");
            });
        }

        this.saveBookmark = function (bookmark) {
            var def = $q.defer();
            var req = {
                method: bookmark.id ? 'PUT': 'POST',
                url: "bookmarks",
                data: bookmark
            }
            return $http(req).success(function (response) {
                //booksList.push(response);
                return response;
            }).error(function () {
                def.reject("Failed");
            });
            return def.promise;
        }

        this.deleteBookmark = function (id) {
            var def = $q.defer();
            var req = {
                method: 'DELETE',
                url: "bookmarks/" + id
            }
            $http(req).success(function (data) {
                def.resolve(data);
            }).error(function () {
                def.reject("Failed");
            });
            return def.promise;
        }
    };
}());