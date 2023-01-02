import express from "express"

class App{
    public app:express.Application;
    public port:number;
    constructor(){
        this.app = express();
        this.port = 8080;
    }

    public listen(): void{
        this.app.listen(this.port, ()=>{
            console.log(`app listening on port ${this.port}`)
        })
    }
}

export default App;