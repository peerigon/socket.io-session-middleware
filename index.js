"use strict";

/**
 * pass session...
 * - cookieParse
 * - store
 * - key
 *
 * returns a socket.io compatible middleware (v1.+)
 * which attaches the session to socket.session
 *
 * if no session could be found it nexts with an error
 *
 * handle the error with sockets.on("error", ...)
 *
 * @param {Object} options
 * @returns {Function} handleSession
 */
function ioSession(options) {
    var cookieParser = options.cookieParser,
        sessionStore = options.store,
        key = options.key || "connect.sid";

    function findCookie(handshake) {
        return (handshake.secureCookies && handshake.secureCookies[key])
            || (handshake.signedCookies && handshake.signedCookies[key])
            || (handshake.cookies && handshake.cookies[key]);
    }

    function getSession(socketHandshake, callback) {
        cookieParser(socketHandshake, {}, function (parseErr) {
            if(parseErr) {
                callback(parseErr);
                return;
            }

            // use sessionStore.get() instead of deprecated sessionStore.load()
            sessionStore.get(findCookie(socketHandshake), function (storeErr, session) {
                if(storeErr) {
                    callback(storeErr);
                    return;
                }

                if(!session) {
                    callback(new Error("could not look up session by key: " + key));
                    return;
                }
                callback(null, session);
            });
        });
    }

    return function handleSession(socket, next) {
        getSession(socket.request, function (err, session) {
            if(err) {
                next(err);
                return;
            }

            socket.session = session;
            next();
        });
    };
}

module.exports = ioSession;
