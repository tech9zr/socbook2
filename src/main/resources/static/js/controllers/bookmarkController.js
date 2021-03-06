(function(){
angular.module('app')
    .controller('BookmarkController', BookmarkController);
    
    BookmarkController.$inject = ['$filter', 'CategoryService', 'BookmarkService', 'uibDateParser', 'RegisterService', '$rootScope'];
   
    function BookmarkController($filter, CategoryService, BookmarkService, uibDateParser, RegisterService, $rootScope) {
        
        var vm = this;
        vm.addBookmark = addBookmark;
        vm.deleteBookmark = deleteBookmark;
        vm.editBookmark = editBookmark;
        vm.saveBookmark = saveBookmark;
        vm.selectBookmark = selectBookmark;
        vm.getUserBookmarks = getUserBookmarks;
        vm.operation;
        vm.categories;
        vm.user = RegisterService.user;         

        init();        

        function init() {
        	if(vm.user) {
                getCategories();
                getUserBookmarks();
//                getBookmarks();
                vm.error = {};
                vm.bookmark = {
                	createdDate: new Date()
                };
                vm.closeModal = false;
        	}
        }

        function addBookmark() {
            vm.addBookmarkForm.$setPristine();
            vm.operation = "Add";
            init();
        }

        function deleteBookmark(){
            BookmarkService.deleteBookmark(vm.bookmark.id).then(function(response){
                getUserBookmarks();
            }, function(error){

            });
            vm.bookmark= {};
        }

        function editBookmark(bookmark){
        	vm.error = {};
            vm.operation = "Edit";
            vm.bookmark = angular.copy(bookmark);
            vm.bookmark.createdDate = new Date(vm.bookmark.createdDate);
        }

        function getCategories(){
            CategoryService.getCategories().then(handleSuccessCategories);
        }
        
        function getBookmarks(){
            BookmarkService.getBookmarks().then(handleSuccessBookmarks);
        }
        
        function getUserBookmarks() {
        	vm.user = RegisterService.user;
        	BookmarkService.getUserBookmarks(vm.user.username).then(handleSuccessUserBookmarks);
        }

        //Get all category
        function handleSuccessCategories(data, status){
            vm.categories = data;
        }
        
        //Get all books
        function handleSuccessBookmarks(data, status){
            vm.bookmarks = data.data;
        }
        
        function handleSuccessUserBookmarks(data, status) {
        	vm.userBookmarks = data.data;
        	BookmarkService.userBookmarks = data.data;
        }

        function openCalendar() {
            vm.popupCalendar.opened = true;
        };

        function capitalize(error){
            return '* ' + error[0].toUpperCase() + error.slice(1); 
        }

        function errorHandler(error){
            switch(error.field){
                case 'title':
                    vm.error.title = capitalize(error.message);
                    break;
                case 'isbn':
                    vm.error.isbn = capitalize(error.message);
                    break;
            }
        }

        function saveBookmark(bookmark){
            vm.user = RegisterService.user;
            bookmark.bookmarkUser = vm.user;
            BookmarkService.saveBookmark(bookmark).then(function(response){
                getUserBookmarks();
            }, function(error){
                vm.error = {};
                angular.forEach(error.data.exceptions, function(e){
                    errorHandler(e);
                });
            })
            //remove input value after submit            
            vm.addBookmarkForm.$setPristine();
            vm.error = {};
        }
        
        function selectBookmark(bookmark){
            vm.bookmark = bookmark;
        }
    };
})();