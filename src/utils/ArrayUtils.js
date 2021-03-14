var ArrayUtils = ArrayUtils || {};

ArrayUtils.jsonToArray = function (jsonData) {
    var result = [];
    for (var i in jsonData)
        result.push(jsonData[i]);
    return result;
};

export default ArrayUtils;