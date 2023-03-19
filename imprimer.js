function generatePDF(){
    const element =document.getElementById("bilan");
    html2pdf()
    .from(element)
    .save();
}

function generatePDF1(){
    const elemente =document.getElementById("bil");
    html2pdf()
    .from(elemente)
    .save();
}


function generatePDF2(){
    const elementee =document.getElementById("b");
    html2pdf()
    .from(elementee)
    .save();
}