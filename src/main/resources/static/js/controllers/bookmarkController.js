(function(){
angular.module('app')
    .controller('BookmarkController', BookmarkController);
    
    BookmarkController.$inject = ['$filter', 'CategoryService', 'BookmarkService', 'uibDateParser', 'RegisterService'];
   
    function BookmarkController($filter, CategoryService, BookmarkService, uibDateParser, RegisterService) {
        
        var vm = this;
        vm.addBookmark = addBookmark;
        vm.deleteBookmark = deleteBookmark;
        vm.editBookmark = editBookmark;
        vm.openCalendar = openCalendar;
        vm.saveBookmark = saveBookmark;
        vm.selectBookmark = selectBookmark;
        vm.operation;
        vm.user;

        init();
        clearTags();

        function init() {
            getCategories();
            getBookmarks();
            vm.error = {};
            vm.bookmark = {
                creationDate: new Date()
            };
            vm.closeModal = false;            
            $(".js-tags-multiple").select2();
            $(".js-tags-multiple").select2("destroy");
            $(".js-tags-multiple").select2();
        }
        
        function clearTags() {
            $(".select2-selection__rendered").html("");
            $(".select2-selection__choice").html("");
        }

        vm.datePickerOptions = {
            formatYear: 'yy',
            maxDate : new Date()
        };

        vm.popupCalendar = {
           opened: false
        }; 

        function addBookmark() {
            vm.addBookmarkForm.$setPristine();
            vm.operation = "Add";
            init();
        }

        function deleteBookmark(){
            BookmarkService.deleteBookmark(vm.bookmark.id).then(function(response){
                getBookmarks();
            }, function(error){

            });
            vm.bookmark= {};
        }

        function editBookmark(bookmark){
            $(".js-tags-multiple").select2("destroy");
            $(".js-tags-multiple").select2();
        	vm.error = {};
            vm.operation = "Edit";
            vm.bookmark = angular.copy(bookmark);
            vm.bookmark.created_at = new Date(vm.bookmark.created_at);
            clearTags();
        }

        function getCategories(){
            CategoryService.getCategories().then(handleSuccessCategories);
        }
        
        function getBookmarks(){
            BookmarkService.getBookmarks().then(handleSuccessBookmarks);
        }

        //Get all category
        function handleSuccessCategories(data, status){
            vm.categories = data;
        }
        
        //Get all books
        function handleSuccessBookmarks(data, status){
            vm.bookmarks = data.data;
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
            bookmark.creationDate = $filter('date')(bookmark.creationDate, "yyyy-MM-dd");
            var tag = bookmark.tags;
            bookmark.tags = {"name":tag};
            vm.user = RegisterService.user;
            bookmark.bookmarkUser = vm.user;
            console.log(bookmark);
            clearTags();
            BookmarkService.saveBookmark(bookmark).then(function(response){
                getBookmarks();
                $('#add-bookmark-modal').modal('hide');
                $(".js-tags-multiple").select2("destroy");
                $(".js-tags-multiple").select2();
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