////////////////////////////////////////////////////////////////////////////////module meso
//// Version 2.10.0
(function () {
'use strict';
var DeqwasAgent = function () {
    this.initialize.apply(this, arguments);
};

DeqwasAgent.prototype = {
    codeVersion: 'xxx',
    collectionType: { normal: 'i', cart: 'c', shipping: 's' },
    collectionElementId: 'deqwas-collection',
    screenType: { normal: 'r', cart: 'k', shipping: 'h' },
    screenElementId: 'deqwas-screen',
    visibleFunctionIds: { r: true, k: true, h: true },
    urlLimitation: 2083,

    initialize: function (site, role, deqwasObject, scriptType) {
        this.site = site;
        this.role = role;
        this.objectId = deqwasObject.iid || deqwasObject.id;// TODO remove deqwasObject.id;
        this.scriptType = scriptType;
        if (deqwasObject.option == undefined) {
            deqwasObject.option = new Object();
        }

        this.parameters = {
            l: deqwasObject.location,
            fc: "",
            cid: this.site,
            iid: deqwasObject.iid || deqwasObject.id,// TODO remove deqwasObject.id,
            uid: deqwasObject.uid || deqwasObject.viewer_id,
            title: deqwasObject.iname || deqwasObject.name,
            img: deqwasObject.img || deqwasObject.image,
            val: deqwasObject.price || deqwasObject.value,
            category: deqwasObject.category,
            caption: deqwasObject.caption,
            info: deqwasObject.information,
            role: '',
            logic: '',
            place: '',
            essential: ''
        };
        this.parameterPriority = ['cid', 'fc', 'iid'];

        this.logic = '';
        this.place = '';
        this.essential = '';
        this.exclusion = deqwasObject.option.exclusion;

        if (deqwasObject.option.silence) {
            this.essential = 'confirmation';
        }
        this.noscreen = deqwasObject.option.noscreen;
        if (deqwasObject.option.noscreen || deqwasObject.option.solitude) {
            this.expression = deqwasObject.option.noscreen ? 'F' : 'X';
            this.expression += deqwasObject.option.solitude ? 'T' : 'X';
        }

        this.targetUrl = '';
        this.extension = '';
        this.baseXmlUrl = '';

        this.xslName = '';
        this.xslDirectory = '';

        this.candidates = [];

        this.iframeStyle = {
            width: '0px',
            height: '0px'
        };
        this.iframeOptions = {
            frameBorder: "0",
            scrolling: "no"
        };
    },

    getSafeProperty: function (property) {
        return Object.prototype.hasOwnProperty.call(window, property)
      ? window[property] : "";
    },

    _setCookie: function (key, val, path, expires) {
        var cookie = [key + '=' + escape(val),
                   'path' + '=' + path,
                   'expires' + '=' + expires
                 ].join(';');
        document.cookie = cookie;
    },

    _getCookie: function (key) {
        var cookieKey = key + "=";
        var val = null;
        var cookie = document.cookie + ";";
        var index = cookie.indexOf(cookieKey);
        if (index != -1) {
            var endIndex = cookie.indexOf(";", index);
            val = unescape(cookie.substring(index + cookieKey.length, endIndex));
        }
        return val;
    },

    _deleteCookie: function (key, path) {
        var commingTime = new Date();
        commingTime.setFullYear(commingTime.getFullYear() - 1);
        var expires = commingTime.toGMTString() + ";";
        this._setCookie(key, '', path, expires);
    },

    _createRandomMark: function () {
        var value = "";
        var characters = '12345678';
        for (var i = 0; i < 18; i++) {
            value += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return value;
    },

    _createRandomSession: function () {
        var value = '';
        var characters = 'abcdefghijklmnopqrstuvwxyz012345678';
        for (var i = 0; i < 8; i++) {
            value += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return value;
    },

    setViewerCookie: function () {
        var markCookieKey = "ra000000000000" + this.codeVersion + this.site;
        var markValue = this._getCookie(markCookieKey) || this._createRandomMark();

        var time = new Date();
        time.setTime(time.getTime() + (1000 * 60 * 60 * 24 * 365 * 100));
        var expires = time.toGMTString();

        this._setCookie(markCookieKey, markValue, '/', expires);
        this.parameters[markCookieKey] = markValue;
    },

    setSessionCookie: function () {
        var sessionCookieKey = 'deqwasSession';
        var sessionParameterKey = 'session';

        var sessionValue = this._getCookie(sessionCookieKey) || this._createRandomSession();

        var time = new Date();
        time.setTime(time.getTime() + (1000 * 60 * 30));
        var expires = time.toGMTString();

        this._setCookie(sessionCookieKey, sessionValue, '/', expires);
        this.parameters[sessionParameterKey] = sessionValue;
    },

    _createIframeSrcWithLimit: function (parameters, targetUrl) {
        var parameterArray = [];
        var dummies = new Object(); // for filtering entries coming from Object.prototype

        var parameterKeys = this._concatKey(this.parameterPriority, parameters);

        var iframeSrc = '' + targetUrl;
        var length = iframeSrc.length;
        for (var i = 0; i < parameterKeys.length; i++) {
            var key = parameterKeys[i];
            if (parameters[key] && typeof parameters[key] != 'function' && typeof dummies[key] == 'undefined') {
                var value = (typeof parameters[key] == 'string') ? parameters[key].replace(/[\f\n\r\t\v]/g, '') : parameters[key];
                var parameter = key + "=" + encodeURIComponent(value);
                length += 1 + parameter.length;
                if (length > this.urlLimitation) {
                    break;
                }
                parameterArray.push(parameter);
            }
        }
        iframeSrc += '?' + parameterArray.join("&");
        return iframeSrc;
    },

    _arrayContains: function (array, obj) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === obj) {
                return true;
            }
        }
        return false;
    },

    _concatKey: function (keys, hash) {
        var array = [].concat(keys);
        for (var key in hash) {
            if (!this._arrayContains(array, key)) {
                array.push(key);
            }
        }
        return array;
    },

    _createSourceParameter: function (baseXmlUrl, site, role, objectId, extension) {
        return [baseXmlUrl, site, role, objectId + extension].join('/');
    },

    _flatten: function (hash, assignment, terminator) {
        var array = [];
        for (var key in hash) {
            array.push([key, assignment, hash[key], terminator].join(''));
        }
        return array.join('');
    },

    _createIframeAsHtml: function (src, name, style, options) {
        return ['<iframe ',
       'name="', name, '" ',
        'src="', src, '" ',
      'style="', this._flatten(style, ':', ';'), '" ',
      this._flatten(options, '="', '" '),
      '></iframe>'].join('');
    },

    setTargetUrl: function (targetUrl) {
        this.targetUrl = targetUrl;
    },

    setAdditionalParameters: function (additionalParameters) {
        for (var key in additionalParameters) {
            this.parameters[key] = additionalParameters[key];
        }
    },

    setRole: function (role) {
        this.role = role;
    },

    setLogic: function (logic) {
        this.logic = logic;
    },

    setPlace: function (place) {
        this.place = place;
    },

    setEssential: function (essential) {
        this.essential = essential;
    },

    setNextCandidateId: function (objectId) {
        this.candidates.push(this._createSourceParameter(
                      this.baseXmlUrl
                      , this.site
                      , this.role
                      , objectId
                      , this.extension));
    },

    setNextCandidateParameter: function (parameter) {
        this.candidates.push(parameter);
    },

    setExtension: function (extension) {
        this.extension = extension;
    },

    setBaseXmlUrl: function (baseXmlUrl) {
        this.baseXmlUrl = baseXmlUrl;
    },

    setXslName: function (xslName) {
        this.xslName = xslName;
    },

    setXslDirectory: function (xslDirectory) {
        this.xslDirectory = xslDirectory;
    },

    setScreenName: function (screenName) {
        this.screenElementId = [this.screenElementId, screenName].join('-');
    },

    setCollectionElementId: function (elementId) {
        this.collectionElementId = elementId;
    },

    setScreenElementId: function (elementId) {
        this.screenElementId = elementId;
    },

    setIframeStyle: function (width, height, styleObject) {
        if (!width || !height) return;
        styleObject = styleObject || {};

        this.iframeStyle.width = width;
        this.iframeStyle.height = height;
        for (var key in styleObject) {
            this.iframeStyle[key] = styleObject[key];
        }
    },

    setIframeOptions: function (iframeOptions) {
        if (!iframeOptions) return;
        for (var key in iframeOptions) {
            this.iframeOptions[key] = iframeOptions[key];
        }
    },

    setWidthAndHeight: function (width, height, styleObject) {
        if (!width || !height) return;
        this.setIframeStyle(width + 'px', height + 'px', styleObject);
        this.setIframeOptions({
            width: width,
            height: height
        });
        this.setAdditionalParameters({ area: width + "x" + height });
    },

    insertContainer: function (elementId) {
        var container = document.createElement('div');
        container.id = elementId;
        container.style.cssText = 'width:0;height:0;margin:0;padding:0;border:none';
        document.body.insertBefore(container, document.body.firstChild);
        return container;
    },

    getFunctionId: function (functionId) {
        if (!functionId) {
            if (document.getElementById(this.screenElementId)) {
                functionId = this.screenType[this.scriptType];
            } else {
                functionId = this.collectionType[this.scriptType];
            }
        }

        if (this.noscreen) {
            functionId = this.collectionType[this.scriptType];
        }

        if (this.exclusion) {
            functionId = 'x';
        }

        return functionId;
    },

    appendIframeToElement: function (functionId) {
        var containerDiv;
        var elementId;
        functionId = this.getFunctionId(functionId)
        if (this.visibleFunctionIds[functionId]) {
            elementId = this.screenElementId;
            this.parameters.source = this._createSourceParameter(
                                 this.baseXmlUrl
                                 , this.site
                                 , this.role
                                 , this.objectId
                                 , this.extension);
            for (var i = 0; i < this.candidates.length; i++) {
                this.parameters['source' + (i + 2)] = this.candidates[i];
            }
            this.parameters.type = [this.xslDirectory
                              , this.site
                              , this.xslName].join('/');
            containerDiv = document.getElementById(elementId);
        }
        else {
            elementId = this.collectionElementId;
            this.iframeStyle = {
                width: '0px',
                height: '0px'
            };
            containerDiv = document.getElementById(elementId);
            if (!containerDiv) {
                containerDiv = this.insertContainer(elementId);
            }
        }
        if (!containerDiv) {
            return false;
        }

        this.parameters.fc = functionId;
        if (this.essential) {
            this.parameters.essential = this.essential;
        }
        this.parameters.role = this.role;
        this.parameters.logic = this.logic;
        this.parameters.place = this.place;
        this.parameters.essential = this.essential;
        this.parameters.expression = this.expression;

        var deqwasName = "deqwas_" + functionId;
        var iframe = document.createElement('iframe');
        iframe.src = this._createIframeSrcWithLimit(this.parameters, this.targetUrl);
        iframe.style.cssText = this._flatten(this.iframeStyle, ':', ';');
        for (var attr in this.iframeOptions) {
            iframe[attr] = this.iframeOptions[attr];
        }
        iframe.name = deqwasName;
        containerDiv.appendChild(iframe);
        return deqwasName;
    },

    _getKeywords: function () {
        var metas = document.getElementsByTagName("meta");
        for (var i = 0; i < metas.length; i++) {
            var meta = metas[i];
            var name = meta.name;

            if (name.match(/keywords/i)) {
                return this._sanitize(meta.content);
            }
        }
        return null;
    },

    _getDescription: function () {
        var metas = document.getElementsByTagName("meta");
        for (var i = 0; i < metas.length; i++) {
            var meta = metas[i];
            var name = meta.name;

            if (name.match(/description/i)) {
                return this._sanitize(meta.content);
            }
        }
        return null;
    },

    _sanitize: function (unsafeString) {
        return unsafeString.replace(/["'<>]/g, '');
    }
};

////////////////////////////////////////////////////////////////////////////////application
(function (deqwas) {
    var item_id = deqwas.iid || deqwas.id;  // TODO remove deqwas.id;
    var deqwasAgent = new DeqwasAgent("wantedlycom", "", deqwas, "normal");
    deqwasAgent.setTargetUrl(('https:' == document.location.protocol ? 'https:' : 'http:') + '//dex00.deqwas.net/common/collectionx.aspx');
    deqwasAgent.setEssential("");
    var params = {
        ref: document.referrer,
        url: document.location.href,
        alt: item_id,
        keywords: deqwasAgent._getKeywords(),
        description: deqwasAgent._getDescription()
    };
    for (var key in deqwas) {
        if (typeof deqwas[key] === 'string') {
            params[key] = deqwas[key];
        }
    }
    deqwasAgent.setAdditionalParameters(params);
    deqwasAgent.appendIframeToElement();
})(typeof deqwas !== 'undefined' ? deqwas : {});

})();

var deqwas_k = { option: {} };
deqwas_k.cid = 'wantedly';
deqwas_k.item_id = deqwas.iid || deqwas.id;
(function () {
    var dc = document.getElementById('deqwas-collection');
    var div = document.createElement('div');
    div.id = 'deqwas-collection-k';
    dc.appendChild(div);
    var div2 = document.createElement('div');
    div2.id = 'deqwas-k';
    dc.appendChild(div2);
    var script = document.createElement('script');
    if (location.pathname === '/') {
        script.src = (location.protocol == 'https:' ? 'https:' : 'http:') + '//kdex003.deqwas.net/wantedly/scripts/top.js?noCache=' + Math.floor((new Date()).getTime()/3600000);
    } else {
        script.src = (location.protocol == 'https:' ? 'https:' : 'http:') + '//kdex003.deqwas.net/wantedly/scripts/item.js?noCache=' + Math.floor((new Date()).getTime()/3600000);
    }
    script.type = 'text/javascript';
    script.defer = true;
    script.charset = 'UTF-8';
    dc.appendChild(script);
})();
