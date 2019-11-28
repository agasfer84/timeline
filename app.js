"use strict";


function main ()
{
    var self = {};

    const startDate = new Date('1984-05-28');
    const stopDate = new Date('1994-09-01');
    //console.log(data);

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };


    self.getDates = function (startDate, stopDate) {
        var dateArray = [];
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date (currentDate));
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    };



    self.days = self.getDates(startDate, stopDate);

    console.log(self.days);

    self.drawTimeline = function () {
        const mainBlock = document.getElementById("mainBlock");
        const days = self.days;

        days.forEach(function(item, i) {
            var newDayDiv = document.createElement('div');
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            };
            var dateFormatted = item.toLocaleString("ru", options);

            newDayDiv.innerHTML = "";
            newDayDiv.setAttribute("class", "day_element");
            newDayDiv.setAttribute("title", dateFormatted);
            newDayDiv.setAttribute("onclick", "elementClicked(this);");
            mainBlock.appendChild(newDayDiv);
        });
    };

    self.drawTimeline();
}

function elementClicked(element)
{
    var day_elements = document.getElementsByClassName("clicked");

    if (day_elements.length > 0) {
        for (var i = 0; i < day_elements.length; i++) {
            if (day_elements[i].classList.contains("clicked")) {
                day_elements[i].classList.remove("clicked");
            }
        }
    }

    if (!element.classList.contains("clicked")) {
        element.classList.add("clicked");
    }

    console.log(element.title);
}

window.onload = function() {
    main();
};