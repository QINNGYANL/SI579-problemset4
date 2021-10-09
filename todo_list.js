
function addTask(description, dueTime){
    const parentElement = document.getElementById("task_list");
    // console.log(parentElement);
    // create due span
    const due = document.createElement("span");
    due.className = "due";
    let date = new Date(dueTime);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let date_new = month + '/' + day + '/' + year;
    let hours = date.getHours();
    let min = date.getMinutes();
    let second = date.getSeconds();
    let second_new = second < 10 ? ('0' + second) : second;
    let when = hours > 12 ? 'pm' : 'am';
    let hours_new = hours > 12 ? (hours - 12) : hours;
    let time_new = hours_new + ":" + min + ":" + second_new + " " + when;
    due.textContent = date_new + " " + time_new;
    // console.log(dueTime);
    // create task item
    const newtask = document.createElement("li");
    newtask.textContent = description;
    newtask.append(due);
    parentElement.appendChild(newtask);

    // create buttn
    const done_btn = document.createElement("button");
    done_btn.className = "btn btn-sm btn-outline-danger done";
    done_btn.type = "button";
    done_btn.textContent = "Done";
    newtask.append(done_btn);
    // task 6
    done_btn.addEventListener("click", ()=>{
        done_btn.parentElement.remove();
    });

}

const add = document.getElementById("add_task");

add.addEventListener("click", function() {
    const desc = document.getElementById("task_description_input");
    
    const duedate = document.getElementById("duedate_input");
    const duetime = document.getElementById("duetime_input");
    addTask(desc.value, dateAndTimeToTimestamp(duedate, duetime));
    document.getElementById("task_description_input").value = ''; // part 5
});


function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time
    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

// part 4
const keyboard = document.getElementById("task_description_input");
keyboard.addEventListener("keydown", event =>  {
    if (event.isComposing||event.keyCode === 13){
        const desc = document.getElementById("task_description_input");
        const duedate = document.getElementById("duedate_input");
        const duetime = document.getElementById("duetime_input");
        addTask(desc.value, dateAndTimeToTimestamp(duedate, duetime));
        document.getElementById("task_description_input").value = ''; // part 5
    }

});





