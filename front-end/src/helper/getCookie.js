export default function getCookie(cookieName){
    let cookieValue = null;
    document.cookie.split(';').forEach(item => {
        const [name, value] = item.split('=');
        const trimmedName = name.trim();
        if (trimmedName === 'access-token'){
            cookieValue = decodeURIComponent(value);
        }
    })
    return cookieValue;
}