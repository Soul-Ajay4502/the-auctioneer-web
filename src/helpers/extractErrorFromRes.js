function extractErrorFromRes(error) {
    let errorMessage = '';

    if (!!error.response) {
        errorMessage =
            error.response.data?.statusText || 'Something went wrong';
    }

    if (!errorMessage) {
        errorMessage = 'Something went wrong :(';
    }

    return errorMessage;
}

export default extractErrorFromRes;
