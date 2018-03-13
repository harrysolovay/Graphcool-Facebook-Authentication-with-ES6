'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _graphcoolLib = require('graphcool-lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFacebookUser = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(facebookToken) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch('https://graph.facebook.com/me?fields=id%2Cfriends&access_token=' + facebookToken);

          case 2:
            response = _context.sent;
            return _context.abrupt('return', response.json());

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getFacebookUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getUserId = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(api, facebookId) {
    var response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return api.request('\n    query {\n      User(facebookId: "' + facebookId + '") {\n        id\n      }\n    }\n  ');

          case 2:
            response = _context2.sent;
            return _context2.abrupt('return', response.User ? response.User.id : null);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getUserId(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var createUser = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(api, facebookUser) {
    var response;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return api.request('\n    mutation {\n      createUser(\n        facebookId: "' + facebookUser.id + '"\n      ) {\n        id\n      }\n    }\n  ');

          case 2:
            response = _context3.sent;
            return _context3.abrupt('return', response.createUser.id);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function createUser(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(event) {
    var graphcool, api, facebookUser, userId, authToken;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (event.context.graphcool.pat) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt('return', { error: 'Authentication not configured correctly.' });

          case 2:
            graphcool = (0, _graphcoolLib.fromEvent)(event);
            api = graphcool.api('simple/v1');
            _context4.next = 6;
            return getFacebookUser(event.data.facebookToken);

          case 6:
            facebookUser = _context4.sent;
            _context4.next = 9;
            return getUserId(api, facebookUser.id);

          case 9:
            userId = _context4.sent;

            if (userId) {
              _context4.next = 14;
              break;
            }

            _context4.next = 13;
            return createUser(api, facebookUser);

          case 13:
            userId = _context4.sent;

          case 14:
            _context4.next = 16;
            return graphcool.generateAuthToken(userId, 'User');

          case 16:
            authToken = _context4.sent;
            return _context4.abrupt('return', { data: { authToken: authToken } });

          case 18:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x6) {
    return _ref4.apply(this, arguments);
  };
}();