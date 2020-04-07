const getUTCDateString = (): string => {
    const currentDate = new Date();

    return currentDate.toUTCString();
};

const dateString = getUTCDateString();

export const commonErrorCodes = {
    'Not Found': `${dateString} : BFE-1122001`,
    TIMEOUT: `${dateString} : BFE-1122002`,
    unauthorized: `${dateString} : BFE-1122003`,
    'error.http.403': `${dateString} : BFE-1122004`,
    'error.http.400': `${dateString} : BFE-1122005`,
    'error.http.500': `${dateString} : BFE-1122006`,
    access_denied: `${dateString} : BFE-1122007`,
    GENERAL: `${dateString} : BFE-1122010`
};

export const commonErrorMessages = {
    unauthorized: 'Unauthorized - Please log in again'
};
