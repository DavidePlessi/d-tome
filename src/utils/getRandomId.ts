export default function getRandomId() {
    return (new Date()).getTime() +
        Math.random().toString(36).substring(2) ;
}