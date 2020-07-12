const express = require('express');
const path = require('path');
const app = express();
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const React = require('react');
const { renderToString } = require('react-dom/server');
const rfu = require('require-from-url/sync');
const port = process.env.PORT || 8080;

app.get('/health', (req, res) => res.send('OK'));

const OtherComponent = loadable(() => rfu(''))

const ElCache = {};

class ReactRemoteElement extends React.Component {
    render() {
        const { baseURL, ...restProps } = this.props;
        // Call the remote server to render the component
        let url = `${baseURL}/edge-handler.js?props=${encodeURIComponent(JSON.stringify(restProps))}`;
        if (ElCache[url]) {
            return React.createElement(ElCache[url], null);
        } else {
            const ELL = rfu(url);
            ElCache[url] = ELL;
            return React.createElement(ELL, null);
        }
    }
}

// Remote react component
app.get('/', async (req, res) => {
    try {
        const dom = renderToString(React.createElement('div', null,
            [
            React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: 'cool cool cool',
                key: 1,
                }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 2,
                }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 2,
                }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 2,
                }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),                React.createElement(ReactRemoteElement, {
                baseURL: 'http://localhost:8080',
                cool: '123',
                key: 2,
            }, null),
                React.createElement(ReactRemoteElement, {
                    baseURL: 'http://localhost:8080',
                    cool: '123',
                    key: 3,
                }, null),

            ]));
        return res.send(`<!doctype html>
             <html>
                <head>
                </head>
                
                <body>
                  <div id="root">
                    ${dom}
                  </div>
                </body>
              </html>`);
    } catch (e) {
        console.log(e);
        res.send('BAD REQUEST');
    }
});

app.listen(`${port}`, '127.0.0.1', () => console.log(`Application is up and running on ${port}`));
