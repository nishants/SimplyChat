var Dictionary = function(){
    var allItems = [];
    return {
        add: function(item){
            allItems.push(item);
        },
        remove: function(item){
            var index = allItems.indexOf(item);
            if(index > -1) allItems.splice(index);
        }
    }
}

module.exports = Dictionary