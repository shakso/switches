var UI = require('ui');
var ajax = require('ajax');

// Show splash screen while waiting for data
var splashWindow = new UI.Window();

// Text element to inform user
var text = new UI.Text({
  text:'Checking switches...',
  font:'GOTHIC_28_BOLD',
  color:'black',
  textOverflow:'wrap',
  textAlign:'center',
	backgroundColor:'white'
});

// Add to splashWindow and show
splashWindow.add(text);
splashWindow.show();

// Make request to openweathermap.org
ajax(
  {
    url:'http://megabox/?discover',
    type:'json'
  },
  function(data) {
    // Create an array of Menu items
  var items = [];

  for(var i = 0; i < data.hosts.length; i++) {
    items.push({
      title:data.hosts[i].name,
      icon: 'on.png'
    });
  }
    // Construct Menu to show to user
    var resultsMenu = new UI.Menu({
      sections: [{
        title: 'Switches',
        items: items
      }]
    });

    // Show the Menu, hide the splash
    resultsMenu.show();
    splashWindow.hide();
  },
  function(error) {
    console.log('Download failed: ' + error);
  }
);
