const path = require('path')

const _root = path.resolve(__dirname, '..');

exports.resolveRoot = function (...args) {
    return path.join(_root, ...args)
}
