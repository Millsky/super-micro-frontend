const fs = require('fs');
const rfu = require('require-from-url/sync');
const http = require('http');

function MyRemoteResolver (source, target) {
    this.source = source || 'resolve';
    this.target = target || 'resolve';
}

MyRemoteResolver.prototype.apply = function(resolver) {
    var target = resolver.ensureHook(this.target);
    resolver.getHook(this.source).tapAsync('MyRemoteResolver', async function(request, resolveContext, callback) {
        if (request.request[0] === '#') {
            var req = request.request.substr(1);
            console.log('DOWNLOADING');
            await new Promise((resolve, rej) => {
                http.get('http://localhost:8080/edge-handler.js', (res) => {
                    res.setEncoding('utf8');
                    let rawData = '';
                    res.on('data', (chunk) => { rawData += chunk; });
                    res.on('end', () => {
                        try {
                            fs.writeFileSync('./tmp.js', rawData);
                            resolve();
                        } catch (e) {
                            console.error(e.message);
                        }
                    });
                });
            });
            var obj = Object.assign({}, request, {
                request: './tmp.js',
            });
            return resolver.doResolve(target, obj, null, resolveContext, callback);
        }
        callback();
    });
}



module.exports = {
    mode: 'production',
    entry: {
        component: './special.js'
    },
    resolve: {
        plugins: [
            new MyRemoteResolver(),
        ]
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            },
        ]
    }
};
