var data = [
    {
        "count": "4",
        "visible": "true",
        "operator": "vtb.cn.129.bhn",
        "datestamp": "31/05/2023 19:41:45",
        "description": "<p>đã bổ sung 3</p>"
    },
    {
        "count": "null",
        "visible": "null",
        "operator": "vtb.bld.1",
        "datestamp": "31/05/2023 16:57:00",
        "description": "File đính kèm trong \"screenshot.png\" đã được thêm mới."
    },
    {
        "count": "null",
        "visible": "null",
        "operator": "vtb.bld.1",
        "datestamp": "31/05/2023 16:57:00",
        "description": "File đính kèm trong \"334670864_980220936298661_727240739974107220_n.jpg\" đã được thêm mới."
    },
    {
        "count": "3",
        "visible": "false",
        "operator": "vtb.cn.129.bhn",
        "datestamp": "31/05/2023 16:41:45",
        "description": "<p>đã bổ sung 3</p>"
    },
    {
        "count": "null",
        "visible": "null",
        "operator": "vtb.bld.1",
        "datestamp": "31/05/2023 15:40:20",
        "description": "File đính kèm trong \"bg.png\" đã được thêm mới."
    },
    {
        "count": "3",
        "visible": "true",
        "operator": "vtb.bld.1",
        "datestamp": "31/05/2023 14:38:16",
        "description": "<p>yêu cầu bs 3</p>"
    },
    {
        "count": "null",
        "visible": "null",
        "operator": "vtb.bld.1",
        "datestamp": "31/05/2023 14:09:01",
        "description": "<p>test bổ sung thêm từ enduser</p>"
    },
    {
        "count": "2",
        "visible": "false",
        "operator": "vtb.cn.129.bhn",
        "datestamp": "31/05/2023 14:05:57",
        "description": "<p>đã bổ sun 2</p>"
    },
    {
        "count": "2",
        "visible": "true",
        "operator": "vtb.bld.1",
        "datestamp": "31/05/2023 14:05:38",
        "description": "<p>yêu cầu bổ sung thông tin 2</p>"
    },
    {
        "count": "null",
        "visible": "null",
        "operator": "vtb.bld.1",
        "datestamp": "31/05/2023 13:43:59",
        "description": "<p>abc</p>"
    },
    {
        "count": "1",
        "visible": "false",
        "operator": "vtb.cn.129.bhn",
        "datestamp": "31/05/2023 11:30:05",
        "description": "<p>đã bổ sung</p>"
    },
    {
        "count": "1",
        "visible": "true",
        "operator": "vtb.bld.1",
        "datestamp": "31/05/2023 11:29:43",
        "description": "<p>yêu cầu bổ sung id 1</p>"
    }
]

function filterSortGroupData(data) {
    // Filter data based on count being a number
    var filteredData = data.filter(function (obj) {
        return !isNaN(parseInt(obj.count));
    });

    // Sort data by datestamp in descending order
    filteredData.sort(function (a, b) {
        var dateA = new Date(a.datestamp);
        var dateB = new Date(b.datestamp);
        return dateB - dateA;
    });

    // Group data by count
    var groupedData = [];
    var currentCount = null;
    var currentGroup = [];

    for (var i = 0; i < filteredData.length; i++) {
        var obj = filteredData[i];
        var count = obj.count;

        if (count === currentCount) {
            currentGroup.push(obj);
        } else {
            if (currentGroup.length > 0) {
                groupedData.push(currentGroup);
            }
            currentCount = count;
            currentGroup = [obj];
        }
    }

    if (currentGroup.length > 0) {
        groupedData.push(currentGroup);
    }

    return groupedData;
}


var filteredSortedGroupedData = filterSortGroupData(data);
//   console.log(filteredSortedGroupedData);

var filteredNullData = data.filter(function (obj) {
    return obj.count === "null";
});

filteredNullData.sort(function (a, b) {
    var dateA = new Date(a.datestamp);
    var dateB = new Date(b.datestamp);
    return dateB - dateA;
});

// console.log(filteredNullData);

var mergedArray = [...filteredSortedGroupedData, ...filteredNullData];


// console.log(mergedArray);

function getDateString(entry) {
    if (Array.isArray(entry)) {
        return entry[entry.length - 1].datestamp;
    } else {
        return entry.datestamp;
    }
}

// Sort the data by datestamp in descending order
const sortedData = mergedArray.sort((a, b) => {
    const dateA = getDateString(a);
    const dateB = getDateString(b);
    if (dateA > dateB) {
        return -1;
    } else if (dateA < dateB) {
        return 1;
    } else {
        return 0;
    }
});
console.log(sortedData);




