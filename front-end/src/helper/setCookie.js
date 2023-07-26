export default function setCookie(cookieName, cookieValue, expirationDays){
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    const cookieString = `${encodeURIComponent(cookieName)}=${encodeURIComponent(cookieValue)}; expires=${expirationDate.toUTCString()}; path=/`
    document.cookie = cookieString;
}