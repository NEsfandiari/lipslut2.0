(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var http = __webpack_require__(5);
var https = __webpack_require__(19);
var path = __webpack_require__(4);

var utils = __webpack_require__(1);
var Error = __webpack_require__(2);

var hasOwn = {}.hasOwnProperty;

// Provide extension mechanism for Stripe Resource Sub-Classes
StripeResource.extend = utils.protoExtend;

// Expose method-creator & prepared (basic) methods
StripeResource.method = __webpack_require__(12);
StripeResource.BASIC_METHODS = __webpack_require__(24);

/**
 * Encapsulates request logic for a Stripe Resource
 */
function StripeResource(stripe, urlData) {
  this._stripe = stripe;
  this._urlData = urlData || {};

  this.basePath = utils.makeURLInterpolator(stripe.getApiField('basePath'));
  this.resourcePath = this.path;
  this.path = utils.makeURLInterpolator(this.path);

  if (this.includeBasic) {
    this.includeBasic.forEach(function(methodName) {
      this[methodName] = StripeResource.BASIC_METHODS[methodName];
    }, this);
  }

  this.initialize.apply(this, arguments);
}

StripeResource.prototype = {

  path: '',

  initialize: function() {},

  // Function to override the default data processor. This allows full control
  // over how a StripeResource's request data will get converted into an HTTP
  // body. This is useful for non-standard HTTP requests. The function should
  // take method name, data, and headers as arguments.
  requestDataProcessor: null,

  // String that overrides the base API endpoint. If `overrideHost` is not null
  // then all requests for a particular resource will be sent to a base API
  // endpoint as defined by `overrideHost`.
  overrideHost: null,

  // Function to add a validation checks before sending the request, errors should
  // be thrown, and they will be passed to the callback/promise.
  validateRequest: null,

  createFullPath: function(commandPath, urlData) {
    return path.join(
      this.basePath(urlData),
      this.path(urlData),
      typeof commandPath == 'function' ?
        commandPath(urlData) : commandPath
    ).replace(/\\/g, '/'); // ugly workaround for Windows
  },

  // Creates a relative resource path with symbols left in (unlike
  // createFullPath which takes some data to replace them with). For example it
  // might produce: /invoices/{id}
  createResourcePathWithSymbols: function(pathWithSymbols) {
    return '/' + path.join(
      this.resourcePath,
      pathWithSymbols || ''
    ).replace(/\\/g, '/'); // ugly workaround for Windows
  },

  createUrlData: function() {
    var urlData = {};
    // Merge in baseData
    for (var i in this._urlData) {
      if (hasOwn.call(this._urlData, i)) {
        urlData[i] = this._urlData[i];
      }
    }
    return urlData;
  },

  wrapTimeout: function(promise, callback) {
    if (callback) {
      // Ensure callback is called outside of promise stack.
      return promise.then(function(res) {
        setTimeout(function() { callback(null, res) }, 0);
      }, function(err) {
        setTimeout(function() { callback(err, null); }, 0);
      });
    }

    return promise;
  },

  _timeoutHandler: function(timeout, req, callback) {
    var self = this;
    return function() {
      var timeoutErr = new Error('ETIMEDOUT');
      timeoutErr.code = 'ETIMEDOUT';

      req._isAborted = true;
      req.abort();

      callback.call(
        self,
        new Error.StripeConnectionError({
          message: 'Request aborted due to timeout being reached (' + timeout + 'ms)',
          detail: timeoutErr,
        }),
        null
      );
    }
  },

  _responseHandler: function(req, callback) {
    var self = this;
    return function(res) {
      var response = '';

      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        response += chunk;
      });
      res.on('end', function() {
        var headers = res.headers || {};
        // NOTE: Stripe responds with lowercase header names/keys.

        // For convenience, make Request-Id easily accessible on
        // lastResponse.
        res.requestId = headers['request-id'];

        var responseEvent = utils.removeEmpty({
          api_version: headers['stripe-version'],
          account: headers['stripe-account'],
          idempotency_key: headers['idempotency-key'],
          method: req._requestEvent.method,
          path: req._requestEvent.path,
          status: res.statusCode,
          request_id: res.requestId,
          elapsed: Date.now() - req._requestStart,
        });

        self._stripe._emitter.emit('response', responseEvent);

        try {
          response = JSON.parse(response);

          if (response.error) {
            var err;

            response.error.headers = headers;
            response.error.statusCode = res.statusCode;
            response.error.requestId = res.requestId;

            if (res.statusCode === 401) {
              err = new Error.StripeAuthenticationError(response.error);
            } else if (res.statusCode === 403) {
              err = new Error.StripePermissionError(response.error);
            } else if (res.statusCode === 429) {
              err = new Error.StripeRateLimitError(response.error);
            } else {
              err = Error.StripeError.generate(response.error);
            }
            return callback.call(self, err, null);
          }
        } catch (e) {
          return callback.call(
            self,
            new Error.StripeAPIError({
              message: 'Invalid JSON received from the Stripe API',
              response: response,
              exception: e,
              requestId: headers['request-id'],
            }),
            null
          );
        }
        // Expose res object
        Object.defineProperty(response, 'lastResponse', {
          enumerable: false,
          writable: false,
          value: res,
        });
        callback.call(self, null, response);
      });
    };
  },

  _errorHandler: function(req, callback) {
    var self = this;
    return function(error) {
      if (req._isAborted) {
        // already handled
        return;
      }
      callback.call(
        self,
        new Error.StripeConnectionError({
          message: 'An error occurred with our connection to Stripe',
          detail: error,
        }),
        null
      );
    }
  },

  _defaultHeaders: function(auth, contentLength, apiVersion) {
    var userAgentString = 'Stripe/v1 NodeBindings/' + this._stripe.getConstant('PACKAGE_VERSION');

    if (this._stripe._appInfo) {
      userAgentString += ' ' + this._stripe.getAppInfoAsString();
    }

    var headers = {
      // Use specified auth token or use default from this stripe instance:
      'Authorization': auth ?
        'Bearer ' + auth :
        this._stripe.getApiField('auth'),
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': contentLength,
      'User-Agent': userAgentString,
    };

    if (apiVersion) {
      headers['Stripe-Version'] = apiVersion;
    }

    return headers;
  },

  _request: function(method, path, data, auth, options, callback) {
    var self = this;
    var requestData;

    function makeRequestWithData(error, data) {
      var apiVersion;
      var headers;

      if (error) {
        return callback(error);
      }

      apiVersion = self._stripe.getApiField('version');
      requestData = data;
      headers = self._defaultHeaders(auth, requestData.length, apiVersion);

      self._stripe.getClientUserAgent(function(cua) {
        headers['X-Stripe-Client-User-Agent'] = cua;

        if (options.headers) {
          Object.assign(headers, options.headers);
        }

        makeRequest(apiVersion, headers);
      });
    }

    if (self.requestDataProcessor) {
      self.requestDataProcessor(method, data, options.headers, makeRequestWithData);
    } else {
      makeRequestWithData(null, utils.stringifyRequestData(data || {}));
    }

    function makeRequest(apiVersion, headers) {
      var timeout = self._stripe.getApiField('timeout');
      var isInsecureConnection = self._stripe.getApiField('protocol') == 'http';

      var host = self.overrideHost || self._stripe.getApiField('host');

      var req = (
        isInsecureConnection ? http : https
      ).request({
        host: host,
        port: self._stripe.getApiField('port'),
        path: path,
        method: method,
        agent: self._stripe.getApiField('agent'),
        headers: headers,
        ciphers: 'DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5',
      });

      var requestEvent = utils.removeEmpty({
        api_version: apiVersion,
        account: headers['Stripe-Account'],
        idempotency_key: headers['Idempotency-Key'],
        method: method,
        path: path,
      });

      req._requestEvent = requestEvent;

      req._requestStart = Date.now();

      self._stripe._emitter.emit('request', requestEvent);

      req.setTimeout(timeout, self._timeoutHandler(timeout, req, callback));
      req.on('response', self._responseHandler(req, callback));
      req.on('error', self._errorHandler(req, callback));

      req.on('socket', function(socket) {
        if (socket.connecting) {
          socket.on((isInsecureConnection ? 'connect' : 'secureConnect'), function() {
            // Send payload; we're safe:
            req.write(requestData);
            req.end();
          });
        } else {
          // we're already connected
          req.write(requestData);
          req.end();
        }
      });
    }
  },

};

module.exports = StripeResource;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Buffer = __webpack_require__(3).Buffer;
var EventEmitter = __webpack_require__(6).EventEmitter;
var qs = __webpack_require__(21);
var crypto = __webpack_require__(10);

var hasOwn = {}.hasOwnProperty;
var isPlainObject = __webpack_require__(11);

var OPTIONS_KEYS = ['api_key', 'idempotency_key', 'stripe_account', 'stripe_version'];

var utils = module.exports = {

  isAuthKey: function(key) {
    return typeof key == 'string' && /^(?:[a-z]{2}_)?[A-z0-9]{32}$/.test(key);
  },

  isOptionsHash: function(o) {
    return isPlainObject(o) && OPTIONS_KEYS.some(function(key) {
      return hasOwn.call(o, key);
    });
  },

  /**
   * Stringifies an Object, accommodating nested objects
   * (forming the conventional key 'parent[child]=value')
   */
  stringifyRequestData: function(data) {
    return qs.stringify(data, {arrayFormat: 'brackets'});
  },

  /**
   * Outputs a new function with interpolated object property values.
   * Use like so:
   *   var fn = makeURLInterpolator('some/url/{param1}/{param2}');
   *   fn({ param1: 123, param2: 456 }); // => 'some/url/123/456'
   */
  makeURLInterpolator: (function() {
    var rc = {
      '\n': '\\n', '\"': '\\\"',
      '\u2028': '\\u2028', '\u2029': '\\u2029',
    };
    return function makeURLInterpolator(str) {
      var cleanString = str.replace(/["\n\r\u2028\u2029]/g, function($0) {
        return rc[$0];
      });
      return function(outputs) {
        return cleanString.replace(/\{([\s\S]+?)\}/g, function($0, $1) {
          return encodeURIComponent(outputs[$1] || '');
        });
      };
    };
  }()),

  /**
   * Return the data argument from a list of arguments
   */
  getDataFromArgs: function(args) {
    if (args.length < 1 || !isPlainObject(args[0])) {
      return {};
    }

    if (!utils.isOptionsHash(args[0])) {
      return args.shift();
    }

    var argKeys = Object.keys(args[0]);

    var optionKeysInArgs = argKeys.filter(function(key) {
      return OPTIONS_KEYS.indexOf(key) > -1;
    });

    // In some cases options may be the provided as the first argument.
    // Here we're detecting a case where there are two distinct arguments
    // (the first being args and the second options) and with known
    // option keys in the first so that we can warn the user about it.
    if (optionKeysInArgs.length > 0 && optionKeysInArgs.length !== argKeys.length) {
      emitWarning(
        'Options found in arguments (' + optionKeysInArgs.join(', ') + '). Did you mean to pass an options ' +
        'object? See https://github.com/stripe/stripe-node/wiki/Passing-Options.'
      );
    }

    return {};
  },

  /**
   * Return the options hash from a list of arguments
   */
  getOptionsFromArgs: function(args) {
    var opts = {
      auth: null,
      headers: {},
    }
    if (args.length > 0) {
      var arg = args[args.length - 1];
      if (utils.isAuthKey(arg)) {
        opts.auth = args.pop();
      } else if (utils.isOptionsHash(arg)) {
        var params = args.pop();

        var extraKeys = Object.keys(params).filter(function(key) {
          return OPTIONS_KEYS.indexOf(key) == -1;
        });

        if (extraKeys.length) {
          emitWarning('Invalid options found (' + extraKeys.join(', ') + '); ignoring.');
        }

        if (params.api_key) {
          opts.auth = params.api_key;
        }
        if (params.idempotency_key) {
          opts.headers['Idempotency-Key'] = params.idempotency_key;
        }
        if (params.stripe_account) {
          opts.headers['Stripe-Account'] = params.stripe_account;
        }
        if (params.stripe_version) {
          opts.headers['Stripe-Version'] = params.stripe_version;
        }
      }
    }
    return opts;
  },

  /**
   * Provide simple "Class" extension mechanism
   */
  protoExtend: function(sub) {
    var Super = this;
    var Constructor = hasOwn.call(sub, 'constructor') ? sub.constructor : function() {
      Super.apply(this, arguments);
    };

    // This initialization logic is somewhat sensitive to be compatible with
    // divergent JS implementations like the one found in Qt. See here for more
    // context:
    //
    // https://github.com/stripe/stripe-node/pull/334
    Object.assign(Constructor, Super);
    Constructor.prototype = Object.create(Super.prototype);
    Object.assign(Constructor.prototype, sub);

    return Constructor;
  },

  /**
   * Encodes a particular param of data, whose value is an array, as an
   * object with integer string attributes. Returns the entirety of data
   * with just that param modified.
   */
  encodeParamWithIntegerIndexes: function(param, data) {
    if (data[param] !== undefined) {
      data[param] = utils.arrayToObject(data[param]);
    }
    return data;
  },

  /**
   * Convert an array into an object with integer string attributes
   */
  arrayToObject: function(arr) {
    if (Array.isArray(arr)) {
      var obj = {};
      arr.map(function(item, i) {
        obj[i.toString()] = item;
      });
      return obj;
    }
    return arr;
  },

  /**
  * Secure compare, from https://github.com/freewil/scmp
  */
  secureCompare: function(a, b) {
    a = Buffer.from(a);
    b = Buffer.from(b);

    // return early here if buffer lengths are not equal since timingSafeEqual
    // will throw if buffer lengths are not equal
    if (a.length !== b.length) {
      return false;
    }

    // use crypto.timingSafeEqual if available (since Node.js v6.6.0),
    // otherwise use our own scmp-internal function.
    if (crypto.timingSafeEqual) {
      return crypto.timingSafeEqual(a, b);
    }

    var len = a.length;
    var result = 0;

    for (var i = 0; i < len; ++i) {
      result |= a[i] ^ b[i];
    }
    return result === 0;
  },

  /**
  * Remove empty values from an object
  */
  removeEmpty: function(obj) {
    if (typeof obj !== 'object') {
      throw new Error('Argument must be an object');
    }

    Object.keys(obj).forEach(function(key) {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    });

    return obj;
  },

  /**
  * Determine if file data is a derivative of EventEmitter class.
  * https://nodejs.org/api/events.html#events_events
  */
  checkForStream: function (obj) {
    if (obj.file && obj.file.data) {
      return obj.file.data instanceof EventEmitter;
    }
    return false;
  },
};

function emitWarning(warning) {
  if (typeof process.emitWarning !== 'function') {
    return console.warn('Stripe: ' + warning); /* eslint-disable-line no-console */
  }

  return process.emitWarning(warning, 'Stripe');
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);

module.exports = _Error;

/**
 * Generic Error klass to wrap any errors returned by stripe-node
 */
function _Error(raw) {
  this.populate.apply(this, arguments);
  this.stack = (new Error(this.message)).stack;
}

// Extend Native Error
_Error.prototype = Object.create(Error.prototype);

_Error.prototype.type = 'GenericError';
_Error.prototype.populate = function(type, message) {
  this.type = type;
  this.message = message;
};

_Error.extend = utils.protoExtend;

/**
 * Create subclass of internal Error klass
 * (Specifically for errors returned from Stripe's REST API)
 */
var StripeError = _Error.StripeError = _Error.extend({
  type: 'StripeError',
  populate: function(raw) {
    // Move from prototype def (so it appears in stringified obj)
    this.type = this.type;

    this.stack = (new Error(raw.message)).stack;
    this.rawType = raw.type;
    this.code = raw.code;
    this.param = raw.param;
    this.message = raw.message;
    this.detail = raw.detail;
    this.raw = raw;
    this.headers = raw.headers;
    this.requestId = raw.requestId;
    this.statusCode = raw.statusCode;
  },
});

/**
 * Helper factory which takes raw stripe errors and outputs wrapping instances
 */
StripeError.generate = function(rawStripeError) {
  switch (rawStripeError.type) {
  case 'card_error':
    return new _Error.StripeCardError(rawStripeError);
  case 'invalid_request_error':
    return new _Error.StripeInvalidRequestError(rawStripeError);
  case 'api_error':
    return new _Error.StripeAPIError(rawStripeError);
  case 'idempotency_error':
    return new _Error.StripeIdempotencyError(rawStripeError);
  }
  return new _Error('Generic', 'Unknown Error');
};

// Specific Stripe Error types:
_Error.StripeCardError = StripeError.extend({type: 'StripeCardError'});
_Error.StripeInvalidRequestError = StripeError.extend({type: 'StripeInvalidRequestError'});
_Error.StripeAPIError = StripeError.extend({type: 'StripeAPIError'});
_Error.StripeAuthenticationError = StripeError.extend({type: 'StripeAuthenticationError'});
_Error.StripePermissionError = StripeError.extend({type: 'StripePermissionError'});
_Error.StripeRateLimitError = StripeError.extend({type: 'StripeRateLimitError'});
_Error.StripeConnectionError = StripeError.extend({type: 'StripeConnectionError'});
_Error.StripeSignatureVerificationError = StripeError.extend({type: 'StripeSignatureVerificationError'});
_Error.StripeIdempotencyError = StripeError.extend({type: 'StripeIdempotencyError'});


/***/ }),
/* 3 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/safe-buffer/index.js'");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/Accounts.js'");

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/lodash.isplainobject/index.js'");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);
var OPTIONAL_REGEX = /^optional!/;

/**
 * Create an API method from the declared spec.
 *
 * @param [spec.method='GET'] Request Method (POST, GET, DELETE, PUT)
 * @param [spec.path=''] Path to be appended to the API BASE_PATH, joined with
 *  the instance's path (e.g. 'charges' or 'customers')
 * @param [spec.required=[]] Array of required arguments in the order that they
 *  must be passed by the consumer of the API. Subsequent optional arguments are
 *  optionally passed through a hash (Object) as the penultimate argument
 *  (preceding the also-optional callback argument
  * @param [spec.encode] Function for mutating input parameters to a method.
 *  Usefully for applying transforms to data on a per-method basis.
 */
function stripeMethod(spec) {
  var commandPath = typeof spec.path == 'function' ? spec.path
    : utils.makeURLInterpolator(spec.path || '');
  var requestMethod = (spec.method || 'GET').toUpperCase();
  var urlParams = spec.urlParams || [];
  var encode = spec.encode || function(data) {return data;};

  return function() {
    var self = this;
    var args = [].slice.call(arguments);

    var callback = typeof args[args.length - 1] == 'function' && args.pop();
    var urlData = this.createUrlData();

    return this.wrapTimeout(new Promise((function(resolve, reject) {
      for (var i = 0, l = urlParams.length; i < l; ++i) {
        var path
        var err;

        // Note that we shift the args array after every iteration so this just
        // grabs the "next" argument for use as a URL parameter.
        var arg = args[0];

        var param = urlParams[i];

        var isOptional = OPTIONAL_REGEX.test(param);
        param = param.replace(OPTIONAL_REGEX, '');

        if (param == 'id' && typeof arg !== 'string') {
          path = this.createResourcePathWithSymbols(spec.path);
          err = new Error(
            'Stripe: "id" must be a string, but got: ' + typeof arg +
            ' (on API request to `' + requestMethod + ' ' + path + '`)'
          );
          reject(err);
          return;
        }

        if (!arg) {
          if (isOptional) {
            urlData[param] = '';
            continue;
          }

          path = this.createResourcePathWithSymbols(spec.path);
          err = new Error(
            'Stripe: Argument "' + urlParams[i] + '" required, but got: ' + arg +
            ' (on API request to `' + requestMethod + ' ' + path + '`)'
          );
          reject(err);
          return;
        }

        urlData[param] = args.shift();
      }

      var data;
      try {
        data = encode(utils.getDataFromArgs(args));
      } catch (e) {
        reject(e);
      }
      var opts = utils.getOptionsFromArgs(args);

      if (args.length) {
        path = this.createResourcePathWithSymbols(spec.path);
        err = new Error(
          'Stripe: Unknown arguments (' + args + '). Did you mean to pass an options ' +
          'object? See https://github.com/stripe/stripe-node/wiki/Passing-Options.' +
          ' (on API request to ' + requestMethod + ' `' + path + '`)'
        );
        reject(err);
        return;
      }

      var requestPath = this.createFullPath(commandPath, urlData);
      var options = {headers: Object.assign(opts.headers, spec.headers)};

      if (spec.validator) {
        try {
          spec.validator(data, options);
        } catch (err) {
          reject(err);
          return;
        }
      }

      function requestCallback(err, response) {
        if (err) {
          reject(err);
        } else {
          resolve(
            spec.transformResponseData ?
              spec.transformResponseData(response) :
              response
          );
        }
      }

      self._request(requestMethod, requestPath, data, opts.auth, options, requestCallback);
    }).bind(this)), callback);
  };
}

module.exports = stripeMethod;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(14).config({ path: '.env.development' });

const stripe = __webpack_require__(16)(process.env.GATSBY_STRIPE_SECRET_KEY);
let statusCode = 200;
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type'
};

exports.handler = function (event, context, callback) {
  // TEST for post request
  if (event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode,
      headers,
      body: ''
    });
  }

  let data = JSON.parse(event.body);
  data = JSON.parse(data.body);
  console.log(data);

  // TEST for all necessary data
  if (!data.token || !data.amount || !data.idempotency_key) {
    console.error('Required information is missing.');
    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({ status: 'missing-information' })
    });
    return;
  }

  // Actual function
  stripe.charges.create({
    currency: 'usd',
    amount: data.amount,
    source: data.token.id,
    description: `Receipt from Lipslut LLC`,
    receipt_email: data.token.email
  }, {
    idempotency_key: data.idempotency_key
  }, (err, charge) => {
    if (err !== null) {
      console.log(err);
    }

    let status = charge === null || charge.status !== 'succeeded' ? 'failed' : charge.status;
    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({ status })
    });
  });
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/dotenv/lib/main.js'");

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Stripe.DEFAULT_HOST = 'api.stripe.com';
Stripe.DEFAULT_PORT = '443';
Stripe.DEFAULT_BASE_PATH = '/v1/';
Stripe.DEFAULT_API_VERSION = null;

// Use node's default timeout:
Stripe.DEFAULT_TIMEOUT = __webpack_require__(5).createServer().timeout;

Stripe.PACKAGE_VERSION = __webpack_require__(17).version;

Stripe.USER_AGENT = {
  bindings_version: Stripe.PACKAGE_VERSION,
  lang: 'node',
  lang_version: process.version,
  platform: process.platform,
  publisher: 'stripe',
  uname: null,
};

Stripe.USER_AGENT_SERIALIZED = null;

var APP_INFO_PROPERTIES = ['name', 'version', 'url'];

var EventEmitter = __webpack_require__(6).EventEmitter;
var exec = __webpack_require__(18).exec;

var resources = {
  // Support Accounts for consistency, Account for backwards compat
  Account: __webpack_require__(7),
  Accounts: __webpack_require__(7),
  ApplePayDomains: __webpack_require__(25),
  Balance: __webpack_require__(26),
  Charges: __webpack_require__(27),
  CountrySpecs: __webpack_require__(28),
  Coupons: __webpack_require__(29),
  Customers: __webpack_require__(30),
  Disputes: __webpack_require__(31),
  EphemeralKeys: __webpack_require__(32),
  Events: __webpack_require__(33),
  ExchangeRates: __webpack_require__(34),
  Invoices: __webpack_require__(35),
  InvoiceItems: __webpack_require__(36),
  IssuerFraudRecords: __webpack_require__(37),
  LoginLinks: __webpack_require__(38),
  PaymentIntents: __webpack_require__(39),
  Payouts: __webpack_require__(40),
  Plans: __webpack_require__(41),
  RecipientCards: __webpack_require__(42),
  Recipients: __webpack_require__(43),
  Refunds: __webpack_require__(44),
  Tokens: __webpack_require__(45),
  Topups: __webpack_require__(46),
  Transfers: __webpack_require__(47),
  ApplicationFees: __webpack_require__(48),
  FileUploads: __webpack_require__(49),
  BitcoinReceivers: __webpack_require__(51),
  Products: __webpack_require__(52),
  Skus: __webpack_require__(53),
  Orders: __webpack_require__(54),
  OrderReturns: __webpack_require__(55),
  Subscriptions: __webpack_require__(56),
  SubscriptionItems: __webpack_require__(57),
  ThreeDSecure: __webpack_require__(58),
  Sources: __webpack_require__(59),
  UsageRecords: __webpack_require__(60),

  // The following rely on pre-filled IDs:
  CustomerCards: __webpack_require__(61),
  CustomerSubscriptions: __webpack_require__(62),
  ChargeRefunds: __webpack_require__(63),
  ApplicationFeeRefunds: __webpack_require__(64),
  TransferReversals: __webpack_require__(65),

};

Stripe.StripeResource = __webpack_require__(0);
Stripe.resources = resources;

function Stripe(key, version) {
  if (!(this instanceof Stripe)) {
    return new Stripe(key, version);
  }

  Object.defineProperty(this, '_emitter', {
    value: new EventEmitter(),
    enumerable: false,
    configurable: false,
    writeable: false,
  });

  this.on = this._emitter.on.bind(this._emitter);
  this.off = this._emitter.removeListener.bind(this._emitter);

  this._api = {
    auth: null,
    host: Stripe.DEFAULT_HOST,
    port: Stripe.DEFAULT_PORT,
    basePath: Stripe.DEFAULT_BASE_PATH,
    version: Stripe.DEFAULT_API_VERSION,
    timeout: Stripe.DEFAULT_TIMEOUT,
    agent: null,
    dev: false,
  };

  this._prepResources();
  this.setApiKey(key);
  this.setApiVersion(version);

  this.errors = __webpack_require__(2);
  this.webhooks = __webpack_require__(66);
}

Stripe.prototype = {

  setHost: function(host, port, protocol) {
    this._setApiField('host', host);
    if (port) {
      this.setPort(port);
    }
    if (protocol) {
      this.setProtocol(protocol);
    }
  },

  setProtocol: function(protocol) {
    this._setApiField('protocol', protocol.toLowerCase());
  },

  setPort: function(port) {
    this._setApiField('port', port);
  },

  setApiVersion: function(version) {
    if (version) {
      this._setApiField('version', version);
    }
  },

  setApiKey: function(key) {
    if (key) {
      this._setApiField(
        'auth',
        'Bearer ' + key
      );
    }
  },

  setTimeout: function(timeout) {
    this._setApiField(
      'timeout',
      timeout == null ? Stripe.DEFAULT_TIMEOUT : timeout
    );
  },

  setAppInfo: function(info) {
    if (info && typeof info !== 'object') {
      throw new Error('AppInfo must be an object.');
    }

    if (info && !info.name) {
      throw new Error('AppInfo.name is required');
    }

    info = info || {};

    var appInfo = APP_INFO_PROPERTIES.reduce(function(accum, prop) {
      if (typeof info[prop] == 'string') {
        accum = accum || {};

        accum[prop] = info[prop];
      }

      return accum;
    }, undefined);

    // Kill the cached UA string because it may no longer be valid
    Stripe.USER_AGENT_SERIALIZED = undefined;

    this._appInfo = appInfo;
  },

  setHttpAgent: function(agent) {
    this._setApiField('agent', agent);
  },

  _setApiField: function(key, value) {
    this._api[key] = value;
  },

  getApiField: function(key) {
    return this._api[key];
  },

  getConstant: function(c) {
    return Stripe[c];
  },

  // Gets a JSON version of a User-Agent and uses a cached version for a slight
  // speed advantage.
  getClientUserAgent: function(cb) {
    if (Stripe.USER_AGENT_SERIALIZED) {
      return cb(Stripe.USER_AGENT_SERIALIZED);
    }
    this.getClientUserAgentSeeded(Stripe.USER_AGENT, function(cua) {
      Stripe.USER_AGENT_SERIALIZED = cua;
      cb(Stripe.USER_AGENT_SERIALIZED);
    })
  },

  // Gets a JSON version of a User-Agent by encoding a seeded object and
  // fetching a uname from the system.
  getClientUserAgentSeeded: function(seed, cb) {
    var self = this;

    exec('uname -a', function(err, uname) {
      var userAgent = {};
      for (var field in seed) {
        userAgent[field] = encodeURIComponent(seed[field]);
      }

      // URI-encode in case there are unusual characters in the system's uname.
      userAgent.uname = encodeURIComponent(uname) || 'UNKNOWN';

      if (self._appInfo) {
        userAgent.application = self._appInfo;
      }

      cb(JSON.stringify(userAgent));
    });
  },

  getAppInfoAsString: function() {
    if (!this._appInfo) {
      return '';
    }

    var formatted = this._appInfo.name;

    if (this._appInfo.version) {
      formatted += '/' + this._appInfo.version;
    }

    if (this._appInfo.url) {
      formatted += ' (' + this._appInfo.url + ')';
    }

    return formatted;
  },

  _prepResources: function() {
    for (var name in resources) {
      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new resources[name](this);
    }
  },

};

module.exports = Stripe;
// expose constructor as a named property to enable mocking with Sinon.JS
module.exports.Stripe = Stripe;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {"_args":[["stripe@6.3.0","/Users/nikiesfandiari/Desktop/lipslut"]],"_from":"stripe@6.3.0","_id":"stripe@6.3.0","_inBundle":false,"_integrity":"sha512-f2GtsoqGLdAZe1mrtFBthpbvM9uHr6IEusyqZymJgj/Nx0xvHkzRkO/h2sePbk/4lhCjfprr4+hbhui7RMPCsw==","_location":"/stripe","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"stripe@6.3.0","name":"stripe","escapedName":"stripe","rawSpec":"6.3.0","saveSpec":null,"fetchSpec":"6.3.0"},"_requiredBy":["/"],"_resolved":"https://registry.npmjs.org/stripe/-/stripe-6.3.0.tgz","_spec":"6.3.0","_where":"/Users/nikiesfandiari/Desktop/lipslut","author":{"name":"Stripe","email":"support@stripe.com","url":"https://stripe.com/"},"bugs":{"url":"https://github.com/stripe/stripe-node/issues"},"bugs:":"https://github.com/stripe/stripe-node/issues","contributors":[{"name":"Ask Bjørn Hansen","email":"ask@develooper.com","url":"http://www.askask.com/"},{"name":"Michelle Bu","email":"michelle@stripe.com"},{"name":"Alex Sexton","email":"alex@stripe.com"},{"name":"James Padolsey"}],"dependencies":{"lodash.isplainobject":"^4.0.6","qs":"~6.5.1","safe-buffer":"^5.1.1"},"description":"Stripe API wrapper","devDependencies":{"chai":"~4.1.2","chai-as-promised":"~7.1.1","coveralls":"^3.0.0","eslint":"^4.19.1","eslint-plugin-chai-friendly":"^0.4.0","mocha":"~5.0.5","nyc":"^11.3.0"},"engines":{"node":">=4"},"homepage":"https://github.com/stripe/stripe-node","keywords":["stripe","payment processing","credit cards","api"],"license":"MIT","main":"lib/stripe.js","name":"stripe","repository":{"type":"git","url":"git://github.com/stripe/stripe-node.git"},"scripts":{"clean":"rm -rf ./.nyc_output ./node_modules/.cache ./coverage","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","lint":"eslint .","mocha":"nyc mocha","report":"nyc -r text -r lcov report","test":"npm run lint && npm run mocha"},"version":"6.3.0"}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 20 */,
/* 21 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/qs/lib/index.js'");

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isPlainObject = __webpack_require__(11);
var stripeMethod = __webpack_require__(12);

module.exports = {

  create: stripeMethod({
    method: 'POST',
  }),

  list: stripeMethod({
    method: 'GET',
  }),

  retrieve: stripeMethod({
    method: 'GET',
    path: '/{id}',
    urlParams: ['id'],
  }),

  update: stripeMethod({
    method: 'POST',
    path: '{id}',
    urlParams: ['id'],
  }),

  // Avoid 'delete' keyword in JS
  del: stripeMethod({
    method: 'DELETE',
    path: '{id}',
    urlParams: ['id'],
  }),

  setMetadata: function(id, key, value, auth, cb) {
    var self = this;
    var data = key;
    var isObject = isPlainObject(key);
    // We assume null for an empty object
    var isNull = data === null || (isObject && !Object.keys(data).length);

    // Allow optional passing of auth & cb:
    if ((isNull || isObject) && typeof value == 'string') {
      auth = value;
    } else if (typeof auth != 'string') {
      if (!cb && typeof auth == 'function') {
        cb = auth;
      }
      auth = null;
    }

    var urlData = this.createUrlData();
    var path = this.createFullPath('/' + id, urlData);

    return this.wrapTimeout(new Promise((function(resolve, reject) {
      if (isNull) {
        // Reset metadata:
        sendMetadata(null, auth);
      } else if (!isObject) {
        // Set individual metadata property:
        var metadata = {};
        metadata[key] = value;
        sendMetadata(metadata, auth);
      } else {
        // Set entire metadata object after resetting it:
        this._request('POST', path, {
          metadata: null,
        }, auth, {}, function(err, response) {
          if (err) {
            return reject(err);
          }
          sendMetadata(data, auth);
        });
      }

      function sendMetadata(metadata, auth) {
        self._request('POST', path, {
          metadata: metadata,
        }, auth, {}, function(err, response) {
          if (err) {
            reject(err);
          } else {
            resolve(response.metadata);
          }
        });
      }
    }).bind(this)), cb);
  },

  getMetadata: function(id, auth, cb) {
    if (!cb && typeof auth == 'function') {
      cb = auth;
      auth = null;
    }

    var urlData = this.createUrlData();
    var path = this.createFullPath('/' + id, urlData);

    return this.wrapTimeout(new Promise((function(resolve, reject) {
      this._request('GET', path, {}, auth, {}, function(err, response) {
        if (err) {
          reject(err);
        } else {
          resolve(response.metadata);
        }
      });
    }).bind(this)), cb);
  },

};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/ApplePayDomains.js'");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/Balance.js'");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/Charges.js'");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/CountrySpecs.js'");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/Coupons.js'");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/Customers.js'");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/Disputes.js'");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/EphemeralKeys.js'");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/Events.js'");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/ExchangeRates.js'");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/Invoices.js'");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/InvoiceItems.js'");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/IssuerFraudRecords.js'");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/LoginLinks.js'");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/PaymentIntents.js'");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/Payouts.js'");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/Plans.js'");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/RecipientCards.js'");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/Recipients.js'");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/Refunds.js'");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/Tokens.js'");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/Topups.js'");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/Transfers.js'");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/ApplicationFees.js'");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/FileUploads.js'");

/***/ }),
/* 50 */,
/* 51 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/BitcoinReceivers.js'");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/Products.js'");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/SKUs.js'");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/Orders.js'");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/OrderReturns.js'");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/Subscriptions.js'");

/***/ }),
/* 57 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/SubscriptionItems.js'");

/***/ }),
/* 58 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/ThreeDSecure.js'");

/***/ }),
/* 59 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/Sources.js'");

/***/ }),
/* 60 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/UsageRecords.js'");

/***/ }),
/* 61 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/CustomerCards.js'");

/***/ }),
/* 62 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/CustomerSubscriptions.js'");

/***/ }),
/* 63 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/ChargeRefunds.js'");

/***/ }),
/* 64 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/ApplicationFeeRefunds.js'");

/***/ }),
/* 65 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nikiesfandiari/Desktop/lipslut/node_modules/stripe/lib/resources/TransferReversals.js'");

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var crypto = __webpack_require__(10);

var utils = __webpack_require__(1);
var Error = __webpack_require__(2);

var Webhook = {
  DEFAULT_TOLERANCE: 300,

  constructEvent: function(payload, header, secret, tolerance) {
    var jsonPayload = JSON.parse(payload);

    this.signature.verifyHeader(payload, header, secret, tolerance || Webhook.DEFAULT_TOLERANCE);

    return jsonPayload;
  },
};

var signature = {
  EXPECTED_SCHEME: 'v1',

  _computeSignature: function(payload, secret) {
    return crypto.createHmac('sha256', secret)
      .update(payload, 'utf8')
      .digest('hex');
  },

  verifyHeader: function(payload, header, secret, tolerance) {
    var details = parseHeader(header, this.EXPECTED_SCHEME);

    if (!details || details.timestamp === -1) {
      throw new Error.StripeSignatureVerificationError({
        message: 'Unable to extract timestamp and signatures from header',
        detail: {
          header: header,
          payload: payload,
        },
      });
    }

    if (!details.signatures.length) {
      throw new Error.StripeSignatureVerificationError({
        message: 'No signatures found with expected scheme',
        detail: {
          header: header,
          payload: payload,
        },
      });
    }

    var expectedSignature = this._computeSignature(details.timestamp + '.' + payload, secret);

    var signatureFound = !!details.signatures
      .filter(utils.secureCompare.bind(utils, expectedSignature))
      .length;

    if (!signatureFound) {
      throw new Error.StripeSignatureVerificationError({
        message: 'No signatures found matching the expected signature for payload.' +
          ' Are you passing the raw request body you received from Stripe?' +
          ' https://github.com/stripe/stripe-node#webhook-signing',
        detail: {
          header: header,
          payload: payload,
        },
      });
    }

    var timestampAge = Math.floor(Date.now() / 1000) - details.timestamp;

    if (tolerance > 0 && timestampAge > tolerance) {
      throw new Error.StripeSignatureVerificationError({
        message: 'Timestamp outside the tolerance zone',
        detail: {
          header: header,
          payload: payload,
        },
      });
    }

    return true;
  },
};

function parseHeader(header, scheme) {
  if (typeof header !== 'string') {
    return null;
  }

  return header.split(',').reduce(function(accum, item) {
    var kv = item.split('=');

    if (kv[0] === 't') {
      accum.timestamp = kv[1];
    }

    if (kv[0] === scheme) {
      accum.signatures.push(kv[1]);
    }

    return accum;
  }, {
    timestamp: -1,
    signatures: [],
  });
}

Webhook.signature = signature;

module.exports = Webhook;


/***/ })
/******/ ])));