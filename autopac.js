var DEBUG = false;
var DIRECT = 'DIRECT';
var PROXY = 'SOCKS5 127.0.0.1:7070';


var config = {
    names: [
        'ip138',
        'google',
        'twitter',
        'facebook',
        'youtube',
        'wordpress',
        'googleusercontent',
        'fbcdn',
        'twimg',
        'appspot',
        'ytimg',
        'blogger',
        'googlelab',
        'gravatar',
        'dropboxusercontent'
    ],

    domains: [
        't.co'
    ]
};

var hash = {
    names: {},
    domains: {}
};

function log() {
    if (DEBUG) {
        console.log.apply(console, arguments)
    }
}

function makeHash(list, hash) {
    for (var i = 0; i < list.length; i += 1) {
        hash[list[i]] = true;
    }
}

makeHash(config.names, hash.names);
makeHash(config.domains, hash.domains);

log('config', config);
log('hash', hash);
log('PROXY', PROXY);
log('DIRECT', DIRECT);

function FindProxyForURL(url, host) {
    var parts;

    log('url', url);
    log('host', host);

    if (hash.domains[host]) {
        return PROXY;
    }

    parts = host.split('.');

    log(parts);

    /*
     * remove com net org info, etc
     */
    parts.pop();

    log(parts);

    for (var i = 0, len = parts.length; i < len; i++) {
        if (hash.names[parts[i]]) {
            return PROXY;
        }
    }

    return DIRECT;
}