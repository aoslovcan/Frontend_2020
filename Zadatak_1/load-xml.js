
//učitavanje xml-a
function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    displayContents(contents);
  };
  reader.readAsText(file);
}


function displayContents(contents) {
 parse(contents);
}

document.getElementById('file-input')
  .addEventListener('change', readSingleFile, false);
  
var xmlDoc;
function parse(content)
{
  
  var parser = new DOMParser();
  xmlDoc = parser.parseFromString(content,"text/xml");
  

  var x = xmlDoc.getElementsByTagName("item");
  var table="<tr><th>Valuta</th> <th>Kupovni tečaj</th> <th>Srednji tečaj</th> <th>Prodajni tečaj</th></tr>";



    for (i = 0; i <x.length; i++) { 
      table += "<br/> <tr>" + 
      x[i].getElementsByTagName("valuta")[0].childNodes[0].nodeValue  + " " +
       
      

      x[i].getElementsByTagName("kupovni_tecaj")[0].childNodes[0].nodeValue +  " " +
     
       x[i].getElementsByTagName("srednji_tecaj")[0].childNodes[0].nodeValue +  " " +
      
       x[i].getElementsByTagName("prodajni_tecaj")[0].childNodes[0].nodeValue +
      "</tr>";


   

    /*var nmbr = item.getElementsByTagName("broj_tecajnice");

    var date = item.getElementsByTagName("datum_primjene");
    var state = item.getElementsByTagName("drzava");
    var state_iso = item.getElementsByTagName("drzava_iso");
    var currency = item.getElementsByTagName("valuta");
    var unit = item.getElementsByTagName("jedinica");
    var purchase_rate = item.getElementsByTagName("kupovni_tecaj");
    var middle_rate = item.getElementsByTagName("srednji_tecaj");
    var selling_rate = item.getElementsByTagName("prodajni_tecaj");*/



   
  }

  document.getElementById("demo").innerHTML = table;
 
}

