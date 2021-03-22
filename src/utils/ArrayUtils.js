var ArrayUtils = ArrayUtils || {};

ArrayUtils.jsonToArray = function (jsonData) {
    var result = [];
    for (var i in jsonData)
        result.push(jsonData[i]);
    return result;
};

ArrayUtils.getObjFromJSON = function (key, jsonData) {
    var obj = null;
    for (var k1 in jsonData) {
        if (jsonData[k1]) {
            for (var k2 in jsonData[k1]) {
                if (!jsonData[k1][k2])
                    continue;
                if (key === k2) {
                    obj = jsonData[k1][k2];
                    return obj;
                }
            }
        }
    }
};

export default ArrayUtils;