const GetRequestOptions = (METHOD) => {
    var options = {
        method: `${METHOD}`,
        headers: new Headers({
            'Authorization': `Bearer ${process.env.REACT_APP_SECURITY_KEY}`,
        }),
        credentials: 'include',
    }
    return options
}

export default GetRequestOptions
