/**
 * Format Date Object to String
 * @param    {[type]}                format [description]
 * @return   {[type]}                       [description]
 * @author ZHAOBO
 * @datetime 2016-12-01T10:08:15+080
 */
Date.prototype.format = function(format) {
    var o = {
        "y+": "" + this.getFullYear(),
        "M+": "" + (this.getMonth() + 1),
        "d+": "" + this.getDate(),
        "H+": "" + this.getHours(),
        "m+": "" + this.getMinutes(),
        "s+": "" + this.getSeconds(),
        "S+": "" + this.getMilliseconds()
    };

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length <= o[k].length ? o[k] : ("0000" + o[k]).substr(o[k].length + 4 - RegExp.$1.length));
        }
    }

    return format;
};
