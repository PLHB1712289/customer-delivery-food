var ArrayUtils = ArrayUtils || {};


ArrayUtils.cloneArray = function (array) {
    var result = [];
    for (var i = 0; i < array.length; i++)
        result.push(array[i]);
    return result;
};

ArrayUtils.customSplit = function (array, index, count) {
    var result = [];
    index = index < array.length ? index : array.length;

    for (var i = 0; i < index; i++){
        result.push(array[i]);
    }

    for (var i = index + count; i < array.length; i++) {
        result.push(array[i]);
    }

    return result;
};

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

ArrayUtils.isInArray = function (value, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (parseInt(value) === parseInt(arr[i])) {
            return true;
        }
    }
    return false;
};

ArrayUtils.isHaveCommonElement = function (arr1, arr2) {
    if (!arr1 || !arr2)
        return false;

    for (var i = 0; i < arr1.length; i++){
        for (var j = 0; j < arr2.length; j++) {
            if (parseInt(arr1[i]) === parseInt(arr2[j])) {
                return true;
            }
        }
    }
    return false;
};

ArrayUtils.compareTwoJSON = function (json1, json2) {
    const arr_1 = ArrayUtils.jsonToArray(json1);
    const arr_2 = ArrayUtils.jsonToArray(json2);

    if (arr_1.length !== arr_2.length) {
        return false;
    }

    for (var index = 0; index < arr_1.length; index++) {
        if (arr_1[index] !== arr_2[index]) {
            return false;
        }
    }

    return true;
}

export default ArrayUtils;