var generatedParser = require('./generatedParser');

exports.parse = function (str, opts) {
	if (!opts) opts = {};
	if (!opts.filename) opts.filename = '';

	try {
		return generatedParser.parse(str, opts);
	} catch (err) {
		throw normalizeError(err, opts);
	}
};

function normalizeError(err, opts) {
	if (!err.line) throw err;

	var found = err.found;
	switch (found) {
	case '\r':
	case '\n':
		found = 'new line';
		break;
	default:
		found = !found ? 'end of file' : "'" + found + "'";
	}
	err.message = 'Unexpected ' + found;

	err.loc = opts.loc || {
		line: err.line,
		column: err.column,
		start: err.offset,
		filename: opts.filename,
	};

	throw err;
}