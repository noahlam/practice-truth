 export function filter1(imageData) {
    const { data, width, height } = imageData;
    const len = width * height * 4;

    for (let i = 0; i < len; i += 4) {
        const a = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
        data[i + 3] = a;
    }

    return imageData;
}

 export function filter2(imageData) {
    const { data, width, height } = imageData;
    const len = width * height * 4;

    for (let i = 0; i < len; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }

    return imageData;
}

 export function filter3(imageData) {
    const { data, width, height } = imageData;
    const len = width * height * 4;
    const lineWidth = width * 4;

    for (let i = 0; i < len; i += lineWidth) {
        if((i / lineWidth) % 2 !== 0) {
            for (let j = 0; j < lineWidth; j++) {
                data[i + j] = 0;
            }
        }
    }

    return imageData;
}
