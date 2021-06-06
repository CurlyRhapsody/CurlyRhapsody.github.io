var floor = 1;

function PostComment() {
    const div = document.createElement("div");
    div.className = "numinputform";
    div.style = "margin-left: auto; margin-right: auto; width: 75%;";

    // Header of comment
    // Example: #1 <Name> @ <Time>
    const header = document.createElement("p");
    header.style = "line-height: 20px; text-align: left";
    let username = document.getElementById('name').value;
    let current_time = new Date();
    let dd = format_str(current_time.getDate());
    let mm = format_str(current_time.getMonth() + 1);
    let yy = format_str(current_time.getFullYear());
    let hh = format_str(current_time.getHours());
    let min = format_str(current_time.getMinutes());
    let ss = format_str(current_time.getSeconds());
    let date_string = dd + '/' + mm + '/' + yy + ' ' + hh + ':' + min + ':' + ss;
    header.innerHTML = '#' + floor + ' <b>' + username + '</b>' + ' @ ' + date_string;

    const contents = document.createElement("p");
    contents.style = "line-height: 24px; text-align: left";
    let comments = document.getElementById('content').value;
    contents.innerHTML = comments;

    div.appendChild(header);
    div.appendChild(contents);

    let comment_section = document.getElementById('CSection');
    comment_section.append(div);
    comment_section.append(document.createElement("br"));

    floor += 1;
}

function format_str(num) {
    return (num < 10) ? '0' + num : num;
}