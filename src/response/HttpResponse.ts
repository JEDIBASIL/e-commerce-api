class HttpResponse{
    constructor(public status:string, public message:string,public data?:any){}
}

export default HttpResponse;