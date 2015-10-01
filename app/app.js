;(function(){
    'use strict';

    //new class
    function Friend(name,address,tel,skills,selectedAvailableCountries){
        var self = this;
        self.name = name;
        self.logo = "/img/user-logo.jpg";
        self.address = address;
        self.tel = tel;
        self.haveSkills = ko.observable(false);
        self.skills = ko.observable(skills);
        self.selectedAvailableCountries = ko.observable(selectedAvailableCountries);
    }

    function AppBook(){
        var self = this;
        self.title = ko.observable("appBook");
        self.chef = {
            name: "Dima",
            surname: "Dulin"
        };
        //form add new friend------------------
        self.formFriend = {
            name: ko.observable(),
            address: ko.observable(),
            telephone: ko.observable(),
            skills: ko.observable(),
            availableCountries: ['France', 'Ukraine', 'Germany', 'Spain'],
            selectedAvailableCountries: ko.observable("Ukraine")
        };

        self.about = ko.computed(function(){
            return self.chef.name + " " + self.chef.surname;
        });
        //watch my title----------------------
        self.title.subscribe(function(val){
            console.log('New title ' + val);
        });
        //new class------------------------------
        self.friends = ko.observableArray([
            new Friend('Vlad','Zirkova street', '0505060707', null, 'France'),
            new Friend('Tim','Zirkova street', '0505060707', "JS", 'Germany')
        ]);
        //add new friend-------------------------
        self.addFriend = function(){
            var newFriend = ko.toJS(self.formFriend);
            console.log(newFriend);
            self.friends.push(new Friend(newFriend.name,newFriend.address,newFriend.telephone,newFriend.skills,newFriend.selectedAvailableCountries));
            self.clearForm();
            //todo post to server
            //$.post('/new-friend', newFriend, function () {
            //self.friends.push(new Friend(newFriend.name));
            //self.clearForm();
            //});
        };
        //remove friend
        self.remove = function(friend){
            self.friends.remove(friend);
            self.archive.push(friend);
            //console.log(ko.toJS(self.archive));
        };
        //clear form friend----------------------
        self.clearForm = function(){
            var self =  this;
            self.formFriend.name(null);
            self.formFriend.address(null);
            self.formFriend.telephone(null);
            self.formFriend.skills(null);
            self.formFriend.selectedAvailableCountries(null);
        };
        //archive friend
        self.archive = ko.observableArray([]);
        self.restore = function(friend){
            self.friends.push(friend);
            self.archive.remove(friend);
        };
        //clearArchive
        self.clearArchive = function(){
            self.archive.removeAll();
        };

        //table
        self.myPlans = ko.observableArray([]);
        self.myPlans.push(
            {
                first: 41,
                second: 33
            },
            {
                first: 20,
                second: 33
            }
        );

    }

    var appBook = new AppBook()
    ko.applyBindings(appBook);
})();