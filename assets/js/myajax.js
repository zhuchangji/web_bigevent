function transform(data) {
    var rows = [];
    for (let k in data) {
        rows.push(k + "=" + data[k]);
    };
    return rows.join("&");
};
var bb = {
    ui: "beijin",
    key: 99,
    bigworld: "china"
};
function myajax(option) {
    let xhr = new XMLHttpRequest();
    var qs = transform(option.data);
    if (option.method.toUpperCase() == "GET") {
        xhr.open(option.method, option.url+"?"+qs, true);
        xhr.send();
    } else if (option.method.toUpperCase() == "POST") {
        xhr.open(option.method, option.url, false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(qs);
    };
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var zili = xhr.responseText;
            option.success(JSON.parse(zili));
  

        }
    }
}