"use strict";


function main ()
{
    var self = {};
    self.data = data;

    const startDate = new Date('1984-05-28');
    const stopDate = new Date('1994-09-01');
    console.log(self.data[1984][5][28].text); //[5][28].text

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };


    self.getDates = function (startDate, stopDate) {
        var dateArray = [];
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            var date = new Date (currentDate);
            dateArray.push({"date" : date, "year" : date.getFullYear(), "month" : date.getMonth() + 1, "day" : date.getDate()});
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
            var date = item["date"];

            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            };

            var dateFormatted = date.toLocaleString("ru", options);
            var day_element_evented_class = (self.data[item.year] && self.data[item.year][item.month] && self.data[item.year][item.month][item.day] && self.data[item.year][item.month][item.day]["text"] !== 'undefined' ) ? " evented" : "";

            newDayDiv.setAttribute("class", "day_element" + day_element_evented_class);
            newDayDiv.setAttribute("year", item.year);
            newDayDiv.setAttribute("month", item.month);
            newDayDiv.setAttribute("day", item.day);
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
    const eventBlock = document.getElementById("eventBlock");
    eventBlock.innerHTML = "";

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


    var year = element.getAttribute("year");
    var month = element.getAttribute("month");
    var day = element.getAttribute("day");

    var event_text = (data[year] && data[year][month] && data[year][month][day] && data[year][month][day]["text"] !== 'undefined' ) ? data[year][month][day]["text"] : "";
    console.log(event_text);

    var newEventDiv = document.createElement('div');
    newEventDiv.innerHTML = '<h4>' + element.title + '</h4>' + '<p>' + event_text + '</p>';
    eventBlock.appendChild(newEventDiv);
}

window.onload = function() {
    main();
};