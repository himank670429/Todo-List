export default function setCookie(cookieName, cookieValue, expiratonSeconds){
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + expiratonSeconds * 1000);
    const cookieString = `${encodeURIComponent(cookieName)}=${encodeURIComponent(cookieValue)}; expires=${expirationDate.toUTCString()}; path=/`
    document.cookie = cookieString;
}