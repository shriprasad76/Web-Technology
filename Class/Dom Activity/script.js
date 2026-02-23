function calculate() {

    let js = Number(document.getElementById("js").value);
    let genai = Number(document.getElementById("genai").value);
    let web = Number(document.getElementById("web").value);
    let agentic = Number(document.getElementById("agentic").value);
    let iot = Number(document.getElementById("iot").value);

    if (isNaN(js) || isNaN(genai) || isNaN(web) || isNaN(agentic) || isNaN(iot)) {
        document.getElementById("result").innerHTML = "wrong number";
        return;
    }

    let total = js + genai + web + agentic + iot;
    let average = total / 5;

    let grade;

    if (average >= 90) grade = "A+";
    else if (average >= 75) grade = "A";
    else if (average >= 60) grade = "B";
    else if (average >= 40) grade = "C";
    else grade = "Fail";

    document.getElementById("result").innerHTML = `
        <h3>Result</h3>
        <p>Total Marks: ${total}</p>
        <p>Average Marks: ${average.toFixed(2)}</p>
        <p>Grade: ${grade}</p>
    `;
}
