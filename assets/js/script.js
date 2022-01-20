var dayEl = $('#currentDay');
var containerEl = $('.container');
var savedEvents = [];

// Displays Current Time


dayEl.text (moment().format("dddd, MMMM, Do"));
// Shows timeblocks for each hour 
// For loop to append timeblock divs
    for (var i = 9; i < 17; i++) {
        // create timeblock div
        var timeBlockEl = $('<div>');
        timeBlockEl.attr('class', 'time-block'+i+' row');

        var hourEl = $('<div>');
        hourEl.attr('class', 'hour col-1');
        hourEl.text (i + ":00");
        timeBlockEl.append(hourEl);


        var eventEl = $('<div>');
        var textareaEl = $('<textarea>');
        eventEl.append(textareaEl);
        // Determine if past present or future;

        var currentHour = moment().hour();
        if (i < currentHour) {
            eventEl.attr('class', 'past col-10');
        }   else if (i > currentHour) {
            eventEl.attr('class', 'future col-10')
        }       else {
            eventEl.attr('class', 'present col-10')
        }
        
        
        timeBlockEl.append(eventEl);

        // Save Button
        saveBtnEl = $('<button>');
        saveBtnEl.attr('class', 'saveBtn col-1 button');
        saveBtnEl.html('<img src = "./assets/images/babysave.png" alt="save button">');
        timeBlockEl.append(saveBtnEl);

        containerEl.append(timeBlockEl);
    }

    savedEvents = JSON.parse(localStorage.getItem("savedEvents"));

    if (savedEvents) {
        for (var i = 0; i < savedEvents.length; i++) {
            var item = savedEvents[i];
            var timeblockEl = $('.'+item.className);
            console.log(timeBlockEl);
            if (item.text) {
                timeblockEl[0].firstChild.nextSibling.firstChild.value = item.text;
             }
        }
    } else {
        savedEvents = [];
    }
        
function save(event) {
    console.log(event.target.parentElement.previousSibling.firstChild)
    var savedItem = {
        className: event.target.parentElement.className.slice(0, -4),
        text: event.target.parentElement.children[1].firstChild.value.trim()
    };
    
    savedEvents.push(savedItem);
    
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
}

   document.querySelectorAll('.saveBtn').forEach(item => {
         item.addEventListener('click', save)
     })