const FetchRequestOptions = (METHOD, BODY) => {
    var options = {
        method: `${METHOD}`,
        headers: new Headers({
            'Authorization': `Bearer ${process.env.REACT_APP_ACCESSKEY}`,
            'Content-Type': 'application/JSON'
        }),
        body: JSON.stringify(BODY)
    }
    return options
}
export default FetchRequestOptions;
