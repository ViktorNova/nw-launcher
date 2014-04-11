var plugins = {
    register: function(plugin) {

    }
}


$.fn.autocomplete = function(starters) {
    var bloodhound = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        // `states` is an array of state names defined in "The Basics"
        local: starters
    });

    // kicks off the loading/processing of `local` and `prefetch`
    bloodhound.initialize();

    $(this).typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'Starters',
            displayKey: 'name',
            // `ttAdapter` wraps the suggestion engine in an adapter that
            // is compatible with the typeahead jQuery plugin
            source: bloodhound.ttAdapter()
        });
}




function searchCommands() {
    var starters = [];
    var ini = require("ini");
    var fs = require("fs");
    var DirWalker = require("dirwalker");
    var dirwalker = new DirWalker("/home/knappmeier/bin");
    dirwalker.on('File', function(filepath,stat) {
        if (filepath.search('\\.desktop$')>=0) {
            var desktopFile = ini.parse(fs.readFileSync(filepath, 'utf-8'))
            starters.push({
                icon: desktopFile['Desktop Entry'].Icon,
                name: desktopFile['Desktop Entry'].Name,
                path: filepath
            });
        }
    });
    dirwalker.walk();
    return starters;
}


var starters;

$(function() {
    starters = searchCommands();
    $('#starterSearch').autocomplete(starters);
});
