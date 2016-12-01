/**
 * Log Tools
 * @author ZHAOBO
 * @datetime 2016-11-30T22:30:54+080
 */
var log = {
    // Options Of Log
    opt: {
        level: "INFO",
        pattern: "%-5level %date{yyyy-MM-dd HH:mm:ss,SSS} %msg"
    },
    // Level Key List
    levelKey: {
        OFF: "OFF",
        FATAL: "FATAL",
        ERROR: "ERROR",
        WARN: "WARN",
        INFO: "INFO",
        DEBUG: "DEBUG",
        TRACE: "TRACE",
        ALL: "ALL"
    },
    // Level Int Value List
    levelArray: {
        "OFF": 0,
        "FATAL": 100,
        "ERROR": 200,
        "WARN": 300,
        "INFO": 400,
        "DEBUG": 500,
        "TRACE": 600,
        "ALL": 9999
    },
    /**
     * Check Option Level Config, and return whether it can be output
     * @param    {[type]}                inLevel [description]
     * @return   {Boolean}                       true: output; false: not output
     * @author ZHAOBO
     * @datetime 2016-11-30T22:35:54+080
     */
    isEnabled: function(inLevel) {
        return this.levelArray[this.opt.level] >= this.levelArray[inLevel];
    },
    /**
     * Format Message
     * @param    {[type]}                msg     [description]
     * @param    {[type]}                inLevel [description]
     * @return   {[type]}                        Output Message
     * @author ZHAOBO
     * @datetime 2016-11-30T22:35:12+080
     */
    format: function(msg, inLevel) {
        var str = this.opt.pattern;
        str = this.formatLevel(inLevel, str);
        str = this.formatDate(str);
        str = str.replace("%msg", msg);
        return str;
    },
    /**
     * Format Level String
     * @param    {[type]}                inLevel [description]
     * @param    {[type]}                str     [description]
     * @return   {[type]}                        Level String
     * @author ZHAOBO
     * @datetime 2016-11-30T22:36:28+080
     */
    formatLevel: function(inLevel, str) {
        var levelPattern = str.match(/%((-)[0-9]+){0,1}level/g);
        if (levelPattern != null) {
            if (levelPattern[0].indexOf("-") > -1) {
                var length = parseInt(levelPattern[0].substring(levelPattern[0].indexOf("%-") + 2, levelPattern[0].indexOf("level")));
                var levelStr = inLevel;
                var blanks = length - inLevel.length;
                if (blanks > 0) {
                    for (var i = 0; i < blanks; i++) {
                        levelStr += " ";
                    }
                }
                return str.replace(levelPattern[0], levelStr);
            } else {
                return str.replace(levelPattern[0], inLevel);
            }
        }
        return str;
    },
    /**
     * Format Date Time String
     * @param    {[type]}                str [description]
     * @return   {[type]}                    [description]
     * @author ZHAOBO
     * @datetime 2016-12-01T13:40:46+080
     */
    formatDate: function(str) {
        var now = new Date();
        var datePattern = str.match(/%date({.+})*/g);
        if (datePattern != null) {
            if (datePattern[0].indexOf("{") > -1) {
                var format = datePattern[0].substring(datePattern[0].indexOf("{") + 1, datePattern[0].indexOf("}"));
                return str.replace(datePattern[0], typeof Date.prototype.format == "undefined" ? now.getTime() : now.format(format));
            } else {
                return str.replace(datePattern[0], now.getTime());
            }
        }
        return str;
    },
    /**
     * Fatal Log
     * @param    {[type]}                msg [description]
     * @param    {[type]}                e   [description]
     * @return   {[type]}                    [description]
     * @author ZHAOBO
     * @datetime 2016-11-30T22:37:02+080
     */
    fatal: function(msg, e) {
        if (this.isEnabled(this.levelKey.FATAL))
            console.log(this.format(msg, this.levelKey.FATAL), typeof e !== 'undefined' ? e : "");
    },
    /**
     * Error Log
     * @param    {[type]}                msg [description]
     * @param    {[type]}                e   [description]
     * @return   {[type]}                    [description]
     * @author ZHAOBO
     * @datetime 2016-11-30T22:37:21+080
     */
    error: function(msg, e) {
        if (this.isEnabled(this.levelKey.ERROR))
            console.log(this.format(msg, this.levelKey.ERROR), typeof e !== 'undefined' ? e : "");
    },
    /**
     * Warn Log
     * @param    {[type]}                msg [description]
     * @param    {[type]}                e   [description]
     * @return   {[type]}                    [description]
     * @author ZHAOBO
     * @datetime 2016-11-30T22:37:32+080
     */
    warn: function(msg, e) {
        if (this.isEnabled(this.levelKey.WARN))
            console.log(this.format(msg, this.levelKey.WARN), typeof e !== 'undefined' ? e : "");
    },
    /**
     * Info Log
     * @param    {[type]}                msg [description]
     * @param    {[type]}                e   [description]
     * @return   {[type]}                    [description]
     * @author ZHAOBO
     * @datetime 2016-11-30T22:37:43+080
     */
    info: function(msg, e) {
        if (this.isEnabled(this.levelKey.INFO))
            console.log(this.format(msg, this.levelKey.INFO), typeof e !== 'undefined' ? e : "");
    },
    /**
     * Debug Log
     * @param    {[type]}                msg [description]
     * @param    {[type]}                e   [description]
     * @return   {[type]}                    [description]
     * @author ZHAOBO
     * @datetime 2016-11-30T22:37:53+080
     */
    debug: function(msg, e) {
        if (this.isEnabled(this.levelKey.DEBUG))
            console.log(this.format(msg, this.levelKey.DEBUG), typeof e !== 'undefined' ? e : "");
    },
    /**
     * Trace Log
     * @param    {[type]}                msg [description]
     * @param    {[type]}                e   [description]
     * @return   {[type]}                    [description]
     * @author ZHAOBO
     * @datetime 2016-11-30T22:38:02+080
     */
    trace: function(msg, e) {
        if (this.isEnabled(this.levelKey.TRACE))
            console.log(this.format(msg, this.levelKey.TRACE), typeof e !== 'undefined' ? e : "");
    }
};
