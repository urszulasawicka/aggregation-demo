var queryString = '';
var dataUrl = '';

function onLoadCallback() {
    if (dataUrl.length > 0) {
        var query = new google.visualization.Query(dataUrl);
        query.setQuery(queryString);
        query.send(handleQueryResponse);
    } else {
        var dataTable = new google.visualization.DataTable();
        dataTable.addRows(9);

        dataTable.addColumn('number');
        dataTable.setValue(0, 0, 27.251767654300206);
        dataTable.setValue(1, 0, 42.74535507881781);
        dataTable.setValue(2, 0, 50.86911274351674);
        dataTable.setValue(3, 0, 49.45749951916772);
        dataTable.setValue(4, 0, 47.558383763525136);
        dataTable.setValue(5, 0, 43.66407178747481);
        dataTable.setValue(6, 0, 25.72874816918341);
        dataTable.setValue(7, 0, 36.42413203210115);
        dataTable.setValue(8, 0, 43.36433931775357);

        draw(dataTable);
    }
}

function draw(dataTable) {
    var vis = new google.visualization.ImageChart(document.getElementById('chart'));
    var options = {
        chxl: '0:|cola|socks|gift|necklace|juice|basket|surfing|shirt',
        chxp: '',
        chxr: '',
        chxs: '',
        chxtc: '',
        chxt: 'x,y',
        chs: '400x360',
        cht: 'r',
        chco: 'FF0000',
        chd: 's:RafedbQWa',
        chdl: 'Szt.',
        chls: '2,4,0',
        chm: 'B,FF000080,0,0,0',
        chtt: 'Produkty'
    };
    vis.draw(dataTable, options);
}

function handleQueryResponse(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }
    draw(response.getDataTable());
}

google.load("visualization", "1", {
        packages: ["imagechart"]
    });
google.setOnLoadCallback(onLoadCallback);