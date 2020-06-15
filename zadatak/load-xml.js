let fileInput = document.querySelector("#file-input");

if (fileInput) {
    fileInput.addEventListener('change', function () {
        if (!(fileInput.files.length > 0)) {
            alert('Error : No file selected');
            return;
        }

        // first file selected by user
        let file = document.querySelector("#file-input").files[0];

        // perform validation on file type & size if required

        // read the file
        let reader = new FileReader();

        // file reading finished successfully
        reader.addEventListener('load', function (e) {
            // contents of file in variable
            let content = e.target.result;

            displayContent(content);
        });

        // file reading failed
        reader.addEventListener('error', function () {
            alert('Error : Failed to read file');
        });


        // read as text file
        reader.readAsText(file);
    });
}


function displayContent(content) {
    // Parse XML
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(content, "text/xml");

    // Get Currency List from XML
    let currencyList = xmlDoc.getElementsByTagName("tecajna_lista")[0];

    // Get All items in currency list
    let items = currencyList.querySelectorAll('item');

    // create table
    let table = createConverterTable(items);

    // write table on front
    document.getElementById("converter-table").innerHTML = table;

    // create select and populate with currencies
    let select = createSelect(items);

    let converterDiv = document.getElementById("converter");

    converterDiv.innerHTML = select;
    converterDiv.innerHTML += "<input type='number' name='amount' id='amount'/>";
    converterDiv.innerHTML += "<button type='button' name='convert' id='convert'>Convert</button>";


    // on convert button convert money
    document.getElementById("convert").addEventListener('click', (event) => {
        event.preventDefault();

        // if currency and amount is not empty convert money
        if ((document.querySelector('#currency').value !== "") && (document.querySelector('#amount').value !== "")) {
            convertMoney(items);
        } else {
            document.getElementById("converted-table").innerHTML = 'Choose currency and type some value';
        }
    })
}

function createSelect(items) {
    let select = "<select id='currency'>";

    select += "<option value=''>Odaberi valutu</option>";

    for (let i = 0; i < items.length; i++) {
        let currency = items[i].querySelector('valuta').childNodes[0].nodeValue;

        select += "<option value='" + currency + "'>" + currency + "</option>";
    }

    select += "</select>";

    return select;
}

function createConverterTable(items) {
    let table = "<table border=1 width=100%><tr><th>Datum</th><th>Valuta</th><th>Jedinica</th><th>Kupovni</th><th>Srednji</th><th>Prodajni</th></tr>";

    for (let i = 0; i < items.length; i++) {
        table += "<tr>";
        let datumPrimjene = items[i].querySelector('datum_primjene').childNodes[0].nodeValue;
        let valuta = items[i].querySelector('valuta').childNodes[0].nodeValue;
        let jedinica = items[i].querySelector('jedinica').childNodes[0].nodeValue;
        let kupovniTecaj = items[i].querySelector('kupovni_tecaj').childNodes[0].nodeValue;
        let srednjiTecaj = items[i].querySelector('srednji_tecaj').childNodes[0].nodeValue;
        let prodajniTecaj = items[i].querySelector('prodajni_tecaj').childNodes[0].nodeValue;

        table += "<td>" + datumPrimjene + "</td>";
        table += "<td>" + valuta + "</td>";
        table += "<td>" + jedinica + "</td>";
        table += "<td>" + kupovniTecaj + "</td>";
        table += "<td>" + srednjiTecaj + "</td>";
        table += "<td>" + prodajniTecaj + "</td>";

        table += "</tr>";
    }

    table += '</table>';

    return table;
}

function convertMoney(items) {
    let table = "<table border=1 width=100%><tr><th>Valuta</th><th>Jedinica</th><th>Kupovni Iznos</th><th>Srednji Iznos</th><th>Prodajni Iznos</th></tr>";

    for (let i = 0; i < items.length; i++) {
        table += "<tr>";

        let valuta = items[i].querySelector('valuta').childNodes[0].nodeValue;
        let jedinica = items[i].querySelector('jedinica').childNodes[0].nodeValue;
        let kupovniTecaj = items[i].querySelector('kupovni_tecaj').childNodes[0].nodeValue;
        let srednjiTecaj = items[i].querySelector('srednji_tecaj').childNodes[0].nodeValue;
        let prodajniTecaj = items[i].querySelector('prodajni_tecaj').childNodes[0].nodeValue;

        // get entered amount value
        let amount = document.getElementById('amount').value;

        table += "<td>" + valuta + "</td>";
        table += "<td>" + jedinica + "</td>";
        table += "<td>" + calculateMoney(kupovniTecaj, amount) + "</td>";
        table += "<td>" + calculateMoney(srednjiTecaj, amount) + "</td>";
        table += "<td>" + calculateMoney(prodajniTecaj, amount) + "</td>";


        table += "</tr>";
    }

    table += "</table>";

    document.getElementById("converted-table").innerHTML = table;
    // console.log(document.getElementById('amount').value);
    // console.log(document.getElementById('currency').value);
}

function calculateMoney(kupovniTecaj, uneseniIznos) {
    // kupovniTecaj parse as float and replace , with .
    // decimal delimiter is .
    let purchaseAmount = parseFloat(kupovniTecaj.replace(",", "."));

    return purchaseAmount * parseFloat(uneseniIznos);
}
