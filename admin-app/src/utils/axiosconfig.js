const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

    
export const config = {
    headers : {
        // Authorization : `Bearer ${getTokenFromLocalStorage.token}`,
        Authorization : `Bearer ${getTokenFromLocalStorage!==null ? getTokenFromLocalStorage.token : ''}`,
        Accept : "application/json",
        'Content-Type': 'multipart/form-data',
        'Cache-Control': 'no-cache',
    },
    withCredentials: true, // important for cookies (refresh token)
}    