const GetRequestOptions = (METHOD) => {
    var options = {
        method: `${METHOD}`,
        headers: new Headers({
            'Authorization': `Bearer 123`,
        }),
        credentials: 'include',
    }
    return options
}

export default GetRequestOptions
