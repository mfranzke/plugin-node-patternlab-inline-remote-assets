'use strict';

const sizeOf = require('image-size');
// Handlebars helpers couldn't handle async, like e.g. the regular .fetch
const fetch = require('sync-fetch');

// Adapted this list from https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#common_image_file_types
const assetsToTransformToImg = [
	'image/apng',
	'image/avif',
	'image/gif',
	'image/jpeg',
	'image/png',
	'image/svg+xml',
	'image/svg+xml;charset=utf-8',
	'image/webp',
	'image/bmp',
	'image/x-icon',
	'image/tiff'
];

// https://stackoverflow.com/a/41407246/7167015
const consoleColors = {
	Reset: '\x1b[0m',
	Bright: '\x1b[1m',
	Dim: '\x1b[2m',
	Underscore: '\x1b[4m',
	Blink: '\x1b[5m',
	Reverse: '\x1b[7m',
	Hidden: '\x1b[8m',

	FgBlack: '\x1b[30m',
	FgRed: '\x1b[31m',
	FgGreen: '\x1b[32m',
	FgYellow: '\x1b[33m',
	FgBlue: '\x1b[34m',
	FgMagenta: '\x1b[35m',
	FgCyan: '\x1b[36m',
	FgWhite: '\x1b[37m',

	BgBlack: '\x1b[40m',
	BgRed: '\x1b[41m',
	BgGreen: '\x1b[42m',
	BgYellow: '\x1b[43m',
	BgBlue: '\x1b[44m',
	BgMagenta: '\x1b[45m',
	BgCyan: '\x1b[46m',
	BgWhite: '\x1b[47m'
};

const getCurrentTime = () => {
	const date = new Date();

	let hour = date.getHours();
	hour = (hour < 10 ? '0' : '') + hour;

	let min = date.getMinutes();
	min = (min < 10 ? '0' : '') + min;

	let sec = date.getSeconds();
	sec = (sec < 10 ? '0' : '') + sec;

	return `${hour}:${min}:${sec}`;
};

const exitProcess = (msg) => {
	const { BgRed, FgBlack, Reset } = consoleColors;

	console.error(
		`${BgRed}${FgBlack}%s${Reset}`,
		`[${getCurrentTime()}] Inline asset: ✘ ${msg}`
	);

	process.exit(1);
};

module.exports = (patternlab) => {
	if (!patternlab) {
		exitProcess('Pattern Lab not provided to plugin-init');
	}

	patternlab.engines.handlebars.engine.registerHelper(
		'inline-remote-asset',
		(file, alternativeText) => {
			const { FgCyan, Reset } = consoleColors;

			try {
				const fileData = fetch(file);
				const imageBuffer = Buffer.from(fileData.arrayBuffer());
				const contentType = fileData.headers.get('content-type');

				// Differentiate in between images and all other formats
				if (assetsToTransformToImg.indexOf(contentType) !== -1) {
					// Retrieve the image metadata like e.g. width/height and type
					const imageMeta = sizeOf(imageBuffer);

					// For all image formats we're base64 encoding the images contents
					const base64Encoded = imageBuffer.toString('base64');

					console.info(
						`${FgCyan}%s${Reset}`,
						`→ Inlining image "${file}" by filetype ${imageMeta.type} ...`
					);

					// It's always important to declare width and height as well as an alt attribute (empty one for the moment)
					return `<img src="data:${contentType};base64,${base64Encoded}" width="${
						imageMeta.width
					}" height="${
						imageMeta.height
					}" alt="${alternativeText.replaceAll(/"/g, '&quot;')}">`;
				} else {
					// For other contents we're mainly outputting the contents and sanitizing them
					const createDOMPurify = require('dompurify');
					const { JSDOM } = require('jsdom');
					const window = new JSDOM('').window;
					const DOMPurify = createDOMPurify(window);

					console.info(
						`${FgCyan}%s${Reset}`,
						`→ Inlining asset "${file}" by content-type ${contentType} ...`
					);

					return DOMPurify.sanitize(imageBuffer.toString());
				}
			} catch (e) {
				exitProcess(
					`Problems with retrieving image "${file}". Did you misspell something? Error: ${e}`
				);
			}
		}
	);
};
