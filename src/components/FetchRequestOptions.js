const FetchRequestOptions = (METHOD, BODY) => {
    var options = {
        method: `${METHOD}`,
        headers: new Headers({
            'Authorization': `Bearer 123`,
            'Content-Type': 'application/JSON'
        }),
        body: JSON.stringify(BODY)
    }
    return options
}
export default FetchRequestOptions;