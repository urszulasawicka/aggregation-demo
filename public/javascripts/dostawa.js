var queryString = '';
var dataUrl = '';

function onLoadCallback() {
    if (dataUrl.length > 0) {
        var query = new google.visualization.Query(dataUrl);
        query.setQuery(queryString);
        query.send(handleQueryResponse);
    } else {
        var dataTable = new google.visualization.DataTable();
        dataTable.addRows(6);

        dataTable.addColumn('number');
        dataTable.addColumn('number');
        dataTable.setValue(0, 0, 435);
        dataTable.setValue(0, 1, 236);
        dataTable.setValue(1, 0, 122);
        dataTable.setValue(1, 1, 67);
        dataTable.setValue(2, 0, 304);
        dataTable.setValue(2, 1, 202);
        dataTable.setValue(3, 0, 154);
        dataTable.setValue(3, 1, 65);
        dataTable.setValue(4, 0, 284);
        dataTable.setValue(4, 1, 168);
        dataTable.setValue(5, 0, 45);
        dataTable.setValue(5, 1, 23);

        draw(dataTable);
    }
}

function draw(dataTable) {
    var vis = new google.visualization.ImageChart(document.getElementById('chart'));
    var options = {
        chxl: '0:|surf|giftware|general|food|clothing|bistro',
        chxp: '',
        chxr: '',
        chxs: '',
        chxtc: '',
        chxt: 'x,y',
        chbh: 'a',
        chs: '400x325',
        cht: 'bvg',
        chco: 'A2C180,3D7930',
        chd: 's:_____b,_p_o_O',
        chdl: 'Cena|Dostawa',
        chtt: 'Zysk'
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