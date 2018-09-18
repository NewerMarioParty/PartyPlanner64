"use strict";
var PP64;
(function (PP64) {
    var utils;
    (function (utils) {
        class arrays {
            static copyRange(outArr, inArr, outOffset, inOffset, len) {
                if (outArr instanceof ArrayBuffer)
                    outArr = new DataView(outArr);
                if (inArr instanceof ArrayBuffer)
                    inArr = new DataView(inArr);
                for (var i = 0; i < len; i++) {
                    outArr.setUint8(outOffset + i, inArr.getUint8(inOffset + i));
                }
            }
            static arrayToArrayBuffer(arr) {
                let buffer = new ArrayBuffer(arr.length);
                let u8arr = new Uint8Array(buffer);
                for (let i = 0; i < arr.length; i++) {
                    u8arr[i] = arr[i];
                }
                return buffer;
            }
            static hash(arr, startOffset, len) {
                // Can't be equal if our length would extend out of bounds.
                if (startOffset + len > arr.byteLength)
                    return "";
                return window.SparkMD5.ArrayBuffer.hash(arr, { start: startOffset, length: len });
            }
            static hashEqual(hashArgs, expected) {
                return PP64.utils.arrays.hash.apply(this, hashArgs).toLowerCase() === expected.toLowerCase();
            }
            static toHexString(buffer, len = buffer.byteLength, lineLen = 0) {
                let output = "";
                let view;
                if (buffer instanceof ArrayBuffer)
                    view = new DataView(buffer);
                else
                    view = buffer;
                for (var i = 0; i < len; i++) {
                    output += $$hex(view.getUint8(i), "") + ((i && lineLen && ((i + 1) % lineLen === 0)) ? "\n" : " ");
                }
                return output;
            }
            static print(buffer, len = buffer.byteLength, lineLen = 0) {
                console.log(PP64.utils.arrays.toHexString(buffer, len, lineLen));
            }
            static readBitAtOffset(buffer, bitOffset) {
                let bufView = buffer;
                if (bufView instanceof ArrayBuffer)
                    bufView = new DataView(bufView);
                let byteOffset = Math.floor(bitOffset / 8);
                let inByteOffset = bitOffset % 8;
                let mask = 0x80 >>> inByteOffset;
                let maskedBit = bufView.getUint8(byteOffset) & mask;
                return maskedBit ? 1 : 0;
            }
            static readByteAtBitOffset(buffer, bitOffset) {
                let bufView = buffer;
                if (bufView instanceof ArrayBuffer)
                    bufView = new DataView(bufView);
                let shortOffset = Math.floor(bitOffset / 8);
                let inShortOffset = bitOffset % 8;
                let mask = 0xFF00 >>> inShortOffset;
                let maskedByte = bufView.getUint16(shortOffset) & mask;
                return maskedByte >>> (8 - inShortOffset);
            }
            static arrayBufferToImageData(buffer, width, height) {
                let canvasCtx = PP64.utils.canvas.createContext(width, height);
                let bgImageData = canvasCtx.createImageData(width, height);
                let bufView = new Uint8Array(buffer);
                for (let i = 0; i < buffer.byteLength; i++) {
                    bgImageData.data[i] = bufView[i];
                }
                return bgImageData;
            }
            static arrayBufferToDataURL(buffer, width, height) {
                let bgImageData = PP64.utils.arrays.arrayBufferToImageData(buffer, width, height);
                let canvasCtx = PP64.utils.canvas.createContext(width, height);
                canvasCtx.putImageData(bgImageData, 0, 0);
                return canvasCtx.canvas.toDataURL();
            }
            static arrayBuffersEqual(first, second) {
                if (first.byteLength !== second.byteLength)
                    return false;
                let firstArr = new Uint8Array(first);
                let secondArr = new Uint8Array(second);
                for (let i = 0; i < firstArr.byteLength; i++) {
                    if (firstArr[i] !== secondArr[i])
                        return false;
                }
                return true;
            }
            // Joins two ArrayBuffers
            static join(buffer1, buffer2) {
                if (!buffer1 || !buffer2) {
                    return buffer1 || buffer2;
                }
                var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
                tmp.set(new Uint8Array(buffer1), 0);
                tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
                return tmp.buffer;
            }
            static equal(a, b) {
                if (a === b)
                    return true;
                if (a.length !== b.length)
                    return false;
                for (let i = 0; i < a.length; i++) {
                    if (a[i] !== b[i])
                        return false;
                }
                return true;
            }
            /**
             * Creates the intersection of two arrays.
             * equalityFn takes two values and decides if they're equal.
             */
            static intersection(a, b, equalityFn = (a, b) => a === b) {
                const output = [];
                for (let i = 0; i < a.length; i++) {
                    const aVal = a[i];
                    for (let j = 0; j < b.length; j++) {
                        if (equalityFn(aVal, b[j])) {
                            output.push(aVal);
                            break;
                        }
                    }
                }
                return output;
            }
        }
        utils.arrays = arrays;
        class browser {
            static updateWindowTitle(boardName) {
                boardName = boardName || PP64.boards.getCurrentBoard().name;
                boardName = PP64.utils.string.mpFormatToPlainText(boardName);
                document.title = boardName ? `PartyPlanner64 - ${boardName}` : "PartyPlanner64";
            }
        }
        utils.browser = browser;
        class drag {
            static showDragZone() {
                var dragZone = document.getElementById("dragZone");
                dragZone.style.display = "inline-block";
                if (!dragZone.ondragover) {
                    dragZone.ondragover = event => {
                        event.preventDefault(); // DragZone supports equality.
                    };
                }
                if (!dragZone.ondragenter) {
                    dragZone.ondragenter = event => {
                        dragZone.className = "hover";
                    };
                }
                if (!dragZone.ondragleave) {
                    dragZone.ondragleave = event => {
                        dragZone.className = "";
                    };
                }
            }
            static hideDragZone() {
                let dragZone = document.getElementById("dragZone");
                dragZone.style.display = "none";
                dragZone.className = "";
                PP64.utils.drag.clearHandlers();
            }
            static setDropHandler(fn) {
                document.getElementById("dragZone").ondrop = fn;
            }
            static clearHandlers() {
                document.getElementById("dragZone").ondrop = null;
            }
            static setEventParamDropHandler(fn) {
                PP64.utils.drag.__eventParamDropHandler = fn;
            }
            static getEventParamDropHandler() {
                return PP64.utils.drag.__eventParamDropHandler;
            }
        }
        utils.drag = drag;
        class input {
            static openFile(acceptTypes = "", callback) {
                // Cache a set of <input> elements, one for each accept type so the last
                // accessed directory hopefully remains consistent between filetypes.
                let inputs = PP64.utils.input._inputs;
                if (!inputs)
                    inputs = PP64.utils.input._inputs = {};
                let typeKey = acceptTypes || "default";
                let inputEl = inputs[typeKey];
                if (!inputEl) {
                    inputEl = inputs[typeKey] = document.createElement("input");
                    inputEl.type = "file";
                }
                inputEl.accept = acceptTypes;
                let closuredCallback = (event) => {
                    callback(event);
                    inputEl.removeEventListener("change", closuredCallback);
                    // Chrome won't fire the change event for the same file twice unless value is cleared.
                    inputEl.value = null;
                };
                inputEl.addEventListener("change", closuredCallback);
                inputEl.click();
            }
        }
        utils.input = input;
        class obj {
            static copy(obj) {
                return JSON.parse(JSON.stringify(obj));
            }
            static equals(obj1, obj2) {
                return JSON.stringify(obj1) === JSON.stringify(obj2);
            }
        }
        utils.obj = obj;
        class stringclass {
            static fromU32(u32) {
                return String.fromCharCode((u32 & 0xFF000000) >>> 24) +
                    String.fromCharCode((u32 & 0xFF0000) >>> 16) +
                    String.fromCharCode((u32 & 0xFF00) >>> 8) +
                    String.fromCharCode(u32 & 0xFF);
            }
            static toU32(str) {
                let charCodes = PP64.utils.string.toCharCodes(str);
                let u32 = 0;
                u32 |= charCodes[0] << 24;
                u32 |= charCodes[1] << 16;
                u32 |= charCodes[2] << 8;
                u32 |= charCodes[3];
                return u32;
            }
            static toCharCodes(str) {
                let charCodes = new Array(str.length);
                for (let i = 0; i < str.length; ++i)
                    charCodes[i] = str.charCodeAt(i);
                return charCodes;
            }
            static pad(str, len, padChar) {
                while (str.length < len) {
                    str = padChar + str;
                }
                return str;
            }
            static splice(value, start, delCount, newSubStr) {
                return value.slice(0, start) + newSubStr + value.slice(start + Math.abs(delCount));
            }
            static normalizeLineEndings(str) {
                if (!str)
                    return str;
                return str.replace(/\r\n|\r/g, "\n");
            }
            static mpFormatToPlainText(value) {
                if (!value)
                    return "";
                return value.replace(/<\w+>/g, "") // Remove color tags
                    .replace("\u3000", "Ⓐ") // ! A button
                    .replace("\u3001", "Ⓑ") // " B button
                    .replace("\u3002", "▲") //  C-up button
                    .replace("\u3003", "►") //  C-right button
                    .replace("\u3004", "◄") //  C-left button
                    .replace("\u3005", "▼") // & C-down button
                    .replace("\u3006", "Ⓩ") // ' Z button
                    .replace("\u3007", "🕹️") // ( Analog stick
                    .replace("\u3008", "✪") // ) (coin)
                    .replace("\u3009", "★") // * Star
                    .replace("\u3010", "Ⓢ") // , S button
                    .replace("\u3011", "Ⓡ"); // , R button
            }
        }
        utils.string = stringclass;
        class numberclass {
            static distance(x1, y1, x2, y2) {
                return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
            }
            static midpoint(x1, y1, x2, y2) {
                return {
                    x: (x1 + x2) / 2,
                    y: (y1 + y2) / 2
                };
            }
            // Distance from tx,ty to the line made from x1,y1 --- x2,y2
            static lineDistance(tx, ty, x1, y1, x2, y2) {
                return Math.abs(((y2 - y1) * tx) - ((x2 - x1) * ty) + (x2 * y1) - (y2 * x1)) / Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
            }
            /**
             * Tests if (x,y) falls within the square formed from (x_s,y_s) - (x_f,y_f)
             * Being exactly at (x_s,y_s) or (x_f,y_f) is considered in.
             */
            static pointFallsWithin(x, y, xs, ys, xf, yf) {
                const [minX, maxX] = [Math.min(xs, xf), Math.max(xs, xf)];
                const [minY, maxY] = [Math.min(ys, yf), Math.max(ys, yf)];
                return x >= minX && x <= maxX && y >= minY && y <= maxY;
            }
            static makeDivisibleBy(num, by) {
                return by * Math.ceil(num / by);
            }
            static degreesToRadians(degrees) {
                return degrees * Math.PI / 180;
            }
            static radiansToDegrees(radians) {
                return radians * 180 / Math.PI;
            }
            /**
             * Determines the angle made by two points.
             * @returns Radians counter-clockwise from the +x axis.
             */
            static determineAngle(xOrigin, yOrigin, x, y) {
                const deltaX = x - xOrigin;
                const deltaY = y - yOrigin;
                let angleRadians = Math.atan2(deltaY, deltaX);
                if (angleRadians < 0) {
                    return Math.abs(angleRadians);
                }
                return Math.abs(angleRadians - Math.PI) + Math.PI;
            }
            /**
             * Gets the IEEE-754 float formatted version of a number.
             * For example, 1.0 yields 0x3f800000
             */
            static getRawFloat32Format(num) {
                const buffer = new ArrayBuffer(4);
                const dataView = new DataView(buffer);
                dataView.setFloat32(0, num);
                return dataView.getUint32(0);
            }
        }
        utils.number = numberclass;
        class debug {
            static log(...args) {
                if ($$debug)
                    console.log.apply(console, arguments);
            }
            static hex(num, prefix = "0x") {
                let hexVal = Number(Math.abs(num)).toString(16).toUpperCase();
                if (hexVal.length === 1)
                    hexVal = "0" + hexVal;
                return (num < 0 ? "-" : "") + prefix + hexVal;
            }
        }
        utils.debug = debug;
        class canvas {
            static createContext(width, height) {
                let canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                return canvas.getContext("2d");
            }
        }
        utils.canvas = canvas;
        class react {
            static makeKeyClick(fn, ctx) {
                if (ctx)
                    fn = fn.bind(ctx);
                return (event) => {
                    if (event.keyCode === 13 || event.keyCode === 32) {
                        fn(event);
                        event.stopPropagation();
                        event.preventDefault();
                    }
                };
            }
        }
        utils.react = react;
        class analytics {
            static recordEvent(eventName, params) {
                try {
                    if (window.gtag) {
                        window.gtag("event", eventName, params);
                    }
                }
                catch (e) {
                    console.error(e); // But don't crash for analytics.
                }
            }
        }
        utils.analytics = analytics;
    })(utils = PP64.utils || (PP64.utils = {}));
})(PP64 || (PP64 = {}));
(function (PP64) {
    var utils;
    (function (utils) {
        var img;
        (function (img) {
            // Cuts an image from a bigger image at x,y coordinates.
            // A mystery: why didn't I use canvas?
            function cutFromWhole(srcBuffer, srcWidth, srcHeight, bpp, x, y, width, height) {
                let pieceWidth = width * (bpp / 8);
                let outBuffer = new ArrayBuffer(pieceWidth * height);
                let outArr = new Uint8Array(outBuffer);
                let inArr = new Uint8Array(srcBuffer);
                let srcByteWidth = (srcWidth * (bpp / 8));
                let pieceXStart = (x * (bpp / 8));
                let outPos = 0;
                for (let yi = y; yi < (y + height); yi++) {
                    let rowIdx = pieceXStart + (srcByteWidth * yi);
                    for (let j = 0; j < pieceWidth; j++) {
                        outArr[outPos++] = inArr[rowIdx + j];
                    }
                }
                return outBuffer;
            }
            img.cutFromWhole = cutFromWhole;
            ;
            function toArrayBuffer(image, width, height) {
                let canvasCtx = PP64.utils.canvas.createContext(width, height);
                canvasCtx.drawImage(image, 0, 0, width, height);
                return canvasCtx.getImageData(0, 0, width, height).data.buffer;
            }
            img.toArrayBuffer = toArrayBuffer;
            ;
            function invertColor(hex) {
                const rOrig = (hex >>> 16) & 0xFF;
                const gOrig = (hex >>> 8) & 0xFF;
                const bOrig = hex & 0xFF;
                const r = (255 - rOrig);
                const g = (255 - gOrig);
                const b = (255 - bOrig);
                return (r << 16 | g << 8 | b);
            }
            img.invertColor = invertColor;
            ;
        })(img = utils.img || (utils.img = {}));
    })(utils = PP64.utils || (PP64.utils = {}));
})(PP64 || (PP64 = {}));
var $$number = PP64.utils.number;
var $$log = PP64.utils.debug.log;
var $$hex = PP64.utils.debug.hex;
