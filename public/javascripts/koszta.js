var queryString = '';
var dataUrl = '';

function onLoadCallback() {
    if (dataUrl.length > 0) {
        var query = new google.visualization.Query(dataUrl);
        query.setQuery(queryString);
        query.send(handleQueryResponse);
    } else {
        var dataTable = new google.visualization.DataTable();
        dataTable.addRows(13);

        dataTable.addColumn('number');
        dataTable.setValue(0, 0, 5);
        dataTable.setValue(1, 0, 4);
        dataTable.setValue(2, 0, 5);
        dataTable.setValue(3, 0, 3);
        dataTable.setValue(4, 0, 28);
        dataTable.setValue(5, 0, 81);
        dataTable.setValue(6, 0, 68);
        dataTable.setValue(7, 0, 49);
        dataTable.setValue(8, 0, 115);
        dataTable.setValue(9, 0, 30);
        dataTable.setValue(10, 0, 8);
        dataTable.setValue(11, 0, 11);
        dataTable.setValue(12, 0, 130);

        draw(dataTable);
    }
}

function draw(dataTable) {
    var vis = new google.visualization.ImageChart(document.getElementById('chart'));
    var options = {
        chxl: '0:|cola|anzac|muffin|pepsi|jeans|socks|scarf|gloves|necklace|shirt|panini|merlot|ring',
        chxp: '',
        chxr: '0,0,46|1,0,85',
        chxs: '',
        chxtc: '',
        chxt: 'x,y',
        chs: '500x325',
        cht: 'lc',
        chco: '3D7930',
        chd: 's:DCDCRxpe_SFH_',
        chdl: 'USD',
        chg: '14.3,-1,1,1',
        chls: '2,4,0',
        chm: 'B,C5D4B5BB,0,0,0',
        chtt: 'Koszt'
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