import queryString from 'query-string';
import _isEmpty from 'lodash/isEmpty';

const lastScrollTop = { value: 0 };

export const copyInBuffer = (id) => {
    const el = document.getElementById(id);

    const oldContentEditable = el.contentEditable;
    const oldReadOnly = el.readOnly;
    const range = document.createRange();

    el.contenteditable = true;
    el.readonly = false;
    range.selectNodeContents(el);

    const s = window.getSelection();
    s.removeAllRanges();
    s.addRange(range);

    el.setSelectionRange(0, 999999);

    el.contentEditable = oldContentEditable;
    el.readOnly = oldReadOnly;

    document.execCommand('copy');
};

const squeezeFunc = () => {
    const checkBound = (el) => {
        const rect = el.getBoundingClientRect();
        return (rect.bottom >= 0);
    };
    const blockInViewport = checkBound(document.querySelector('.post-details'));
    if (blockInViewport) {
        document.querySelector('.challenge-slide').classList.remove('squeeze');
    } else {
        document.querySelector('.challenge-slide').classList.add('squeeze');
    }
};

const scrollDirectionChallengeFeedFunc = () => {
    const top = window.pageYOffset;

    if (top < 30) {
        document.querySelector('.post-filter__wrap').classList.remove('disable');
    } else if (lastScrollTop.value > top + 5) {
        setTimeout(() => {
            document.querySelector('.post-filter__wrap').classList.remove('disable');
        }, 500);
    } else if (lastScrollTop.value > 150 && lastScrollTop.value < top - 5) {
        setTimeout(() => {
            document.querySelector('.post-filter__wrap').classList.add('disable');
        }, 500);
    }
    lastScrollTop.value = top;
};

export const isEmpty = (val) => {
    let empty = true;

    if (!val && val !== 0) {
        empty = true;
    }

    if (typeof val === 'number') {
        empty = false;
    }

    if (typeof val === 'string') {
        empty = !val.trim();
    }

    if (typeof val === 'object' && val) {
        empty = !Object.keys(val).length;
    }

    if (Array.isArray(val)) {
        empty = !val.length;
    }

    return empty;
};

export const isBoolean = value => (typeof value === 'boolean');

export const formatStringLength = (text = '', length = -1) => (
    text && text.length > length
        ? `${text.slice(0, length)}...`
        : text
);

export const filterCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] < 255) {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
            data[i + 3] = 255;
        }
    }
    ctx.putImageData(imgData, 0, 0);

    return canvas;
};

export const dataURItoBlob = (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;

    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
    } else {
        byteString = unescape(dataURI.split(',')[1]);
    }
    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
};

export const getRandomInt = (min, max) => (Math.floor(Math.random() * (max - (min + 1))) + min);

export const arrayStringify = (array = [], separator = ',') => array.join(separator);

export const covertUtcDate = (dateStr) => {
    const ua = navigator.userAgent.toLowerCase();

    return (ua.indexOf('safari') !== -1)
        ? new Date(dateStr.replace(/-/g, '/').replace(/T/g, ' '))
        : new Date(dateStr);
};

export const getUrlEncoded = params => queryString.stringify(params, { encode: true });

export const clearObject = (obj) => {
    const result = {};

    Object.keys(obj).forEach((key) => {
        if (obj[key] || isBoolean(obj[key])) {
            result[key] = obj[key];
        }
    });

    return result;
};

export const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

export const setScrollDirectionChallengeFeeds = () => {
    lastScrollTop.value = 0;
    window.addEventListener('scroll', scrollDirectionChallengeFeedFunc.bind(this, lastScrollTop));
};

export const unsetScrollDirectionChallengeFeeds = () => {
    lastScrollTop.value = 0;
    window.removeEventListener('scroll', scrollDirectionChallengeFeedFunc.bind(this, lastScrollTop));
};

export const setScrollDirectionSqueeze = () => {
    window.addEventListener('scroll', squeezeFunc);
};

export const unsetScrollDirectionSqueeze = () => {
    window.removeEventListener('scroll', squeezeFunc);
};

/* eslint no-bitwise: ["error", { "allow": ["&"] }] */
export const getOrientation = (file, callback) => {
    const reader = new FileReader();

    reader.onload = (event) => {
        const view = new DataView(event.target.result);

        if (view.getUint16(0, false) !== 0xFFD8) {
            return callback(-2);
        }

        const length = view.byteLength;
        let offset = 2;

        while (offset < length) {
            const marker = view.getUint16(offset, false);
            offset += 2;

            if (marker === 0xFFE1) {
                offset += 2;
                if (view.getUint32(offset, false) !== 0x45786966) {
                    return callback(-1);
                }
                const little = view.getUint16(offset += 6, false) === 0x4949;
                offset += view.getUint32(offset + 4, little);
                const tags = view.getUint16(offset, little);
                offset += 2;

                for (let i = 0; i < tags; i += 1) {
                    if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                        return callback(view.getUint16(offset + (i * 12) + 8, little));
                    }
                }
            } else if ((marker & 0xFF00) !== 0xFF00) {
                break;
            } else {
                offset += view.getUint16(offset, false);
            }
        }
        return callback(-1);
    };
    reader.readAsArrayBuffer(file);
};

export const resetOrientation = (srcBase64, srcOrientation, callback) => {
    const img = new Image();

    img.onload = () => {
        const width = img.width;
        const height = img.height;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // set proper canvas dimensions before transform & export
        if (srcOrientation > 4 && srcOrientation < 9) {
            canvas.width = height;
            canvas.height = width;
        } else {
            canvas.width = width;
            canvas.height = height;
        }

        // transform context before drawing image
        switch (srcOrientation) {
            case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
            case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
            case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
            case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
            case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
            case 7: ctx.transform(0, -1, -1, 0, height, width); break;
            case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
            default: break;
        }

        // draw image
        ctx.drawImage(img, 0, 0);

        // export base64
        callback(canvas.toDataURL());
    };

    img.src = srcBase64;
};

export const getOneMediaPost = (item) => {
    const isImage = !_isEmpty(item.photos_data);
    const isVideo = !_isEmpty(item.video_data);

    if (isImage) {
        return item.photos_data[0];
    }

    if (isVideo) {
        return item.video_data;
    }

    return {};
};
