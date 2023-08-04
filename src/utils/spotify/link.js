export function checkLinkForError(link) {
    const urlParams = new URLSearchParams(link.split('?')[1]);

    if (urlParams.has('error')) {
        const error = urlParams.get('error');
        return error;
    }

    return null;
}

export function processValidLink(link) {
    const urlParams = new URLSearchParams(link.split('?')[1])
    let code, state;

    if (urlParams.has('code')) {
        code = urlParams.get('code');
    }

    if (urlParams.has('state')) {
        state = urlParams.get('state')
    }

    if (!code || !state) {
        return null;
    }

    return { code: code, state: state }
}