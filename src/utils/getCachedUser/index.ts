export const getCachedUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const getCachedWhoami = () => {
    const whoami = localStorage.getItem('whoami');
    return whoami ? JSON.parse(whoami) : null;
};

export const getCachedTSId = () => localStorage.getItem('technicalSolutionId') || null;