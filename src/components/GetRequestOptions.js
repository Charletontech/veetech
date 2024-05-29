const GetRequestOptions = (METHOD) => {
    var options = {
        method: `${METHOD}`,
        headers: new Headers({
            'Authorization': `Bearer 123`,
        })
    }
    return options
}

export default GetRequestOptions
