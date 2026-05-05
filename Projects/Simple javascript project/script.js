let questions=[
{q:"What is the return type of main method in Java?",o:["int","void","float","String"],a:"void"},
{q:"Java is which type of language?",o:["Procedure","Object Oriented","Machine","Markup"],a:"Object Oriented"},
{q:"Java file extension is?",o:[".js",".class",".java",".html"],a:".java"},
{q:"Keyword used for inheritance?",o:["this","super","extends","final"],a:"extends"},
{q:"JVM stands for?",o:["Java Virtual Machine","Java Variable Method","Joint VM","None"],a:"Java Virtual Machine"},
{q:"Constructor name is same as class name?",o:["True","False"],a:"True"},
{q:"Array index starts from?",o:["0","1","2","-1"],a:"0"},
{q:"Keyword used to create package?",o:["import","package","class","public"],a:"package"},
{q:"Keyword used to create interface?",o:["int","interface","implements","extends"],a:"interface"},
{q:"Loop keyword in Java?",o:["for","if","class","void"],a:"for"},
{q:"Write syntax of println",code:"System.out.println();"},
{q:"Import Scanner syntax",code:"import java.util.Scanner;"},
{q:"Declare int variable",code:"int a=10;"},
{q:"Write for loop syntax",code:"for(int i=0;i<5;i++){}"},
{q:"Write class syntax",code:"class Test{}"}
];

let index=0;
let score=0;
let answered=false;

function startTest(){
document.getElementById("userForm").classList.add("hide");
document.getElementById("quizBox").classList.remove("hide");
loadQ();
}

function loadQ(){
let q=questions[index];
answered=false;
document.getElementById("question").innerText=q.q;
document.getElementById("options").innerHTML="";
document.getElementById("codeAns").value="";
document.getElementById("message").innerText="";

if(q.o){
document.getElementById("codeAns").style.display="none";
document.getElementById("options").style.display="block";

q.o.forEach(opt=>{
let btn=document.createElement("div");
btn.innerText=opt;
btn.classList.add("option");
btn.onclick=()=>checkOption(btn,opt);
document.getElementById("options").appendChild(btn);
});
}
else{
document.getElementById("options").style.display="none";
document.getElementById("codeAns").style.display="block";
}
}

function checkOption(element,ans){
if(answered) return;

answered=true;
let correctAns=questions[index].a;

if(ans==correctAns){
score++;
element.classList.add("correct");
document.getElementById("message").innerText="Correct Answer!";
}
else{
element.classList.add("wrong");
document.getElementById("message").innerText="Wrong Answer!";
}
}

function submitAns(){
if(answered) return;

let userAns=document.getElementById("codeAns").value.trim();

if(userAns==""){
document.getElementById("message").innerText="Answer first!";
return;
}

answered=true;

if(userAns==questions[index].code){
score++;
document.getElementById("message").innerText="Correct Answer!";
}
else{
document.getElementById("message").innerText="Wrong Answer!";
}
}

function nextQ(){
if(!answered){
document.getElementById("message").innerText="Answer first!";
return;
}

index++;
if(index<questions.length){
loadQ();
}
else{
showResult();
}
}

function showResult(){
document.getElementById("quizBox").classList.add("hide");
document.getElementById("result").classList.remove("hide");

let name=document.getElementById("name").value;
let prn=document.getElementById("prn").value;

document.getElementById("resName").innerText="Name: "+name;
document.getElementById("resPrn").innerText="PRN: "+prn;
document.getElementById("resScore").innerText="Marks: "+score+"/15";
document.getElementById("resPer").innerText="Percentage: "+(score/15*100).toFixed(2)+"%";
}