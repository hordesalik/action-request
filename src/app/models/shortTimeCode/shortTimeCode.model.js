const shortTimeCodeMessagesUrl = `${process.env.SHORT_TIME_CODE_API_ORIGIN}/messages`;

export async function sendShortTimeCodeMessage(shortTimeCode, data) {
    const requestData = {
        code: shortTimeCode,
        message: data,
    };

    const requestOptions = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    };

    const response = await fetch(shortTimeCodeMessagesUrl, requestOptions);

    console.log('Short Time Code message is sent');

    return await response.json();
}
