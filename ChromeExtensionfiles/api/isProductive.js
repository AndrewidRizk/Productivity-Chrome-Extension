const LOCATION_ENDPOINT = "http://localhost:4567/";

export default async function fetchProductive() {
    let wordCount;
    const result = await fetch(LOCATION_ENDPOINT)
    .then(res => res.json())
    .catch(error => {
        console.log(error);
    })

    return result;
}