const path = require('path');
const fs = require('fs')
const http = require('http')

// create the server instance using http
const server = http.createServer((req, res) => {
    // STATIC OPTION
    // if(req.url === "/"){
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data)=>{
    //         if(err) throw err;
    //         res.writeHead( 200, {'ContentType': 'text/html'} )
    //         res.end(data)
    //     })
    // }

    
    // DYNAMIC OPTION
    // set a filepath
    let filepath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    // set content type based on extention
    let ext = path.extname(filepath)

    // set default content type
    let contentType = 'text/html'

    // set content type based on the result of ext
    switch (ext) {
        case '.js':
            contentType = 'text/javascript';
        case '.css':
            contentType = 'text/css';
        case '.json':
            contentType = 'application/json';
        case '.png':
            contentType = 'image/png';
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // read file, remember to check for errors
    fs.readFile(filepath, (err, data) => {
        if (err) {
            // if the error is 404, serve the 404 page
            if (err.code = 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, page) => {
                    res.writeHead(200, { 'ContentType': 'text/html' });
                    res.end(page, 'utf8')
                })
            } else {
                // the error is something else, I can choose to create a file where I can inject content based on the kind of error encountered
                res.writeHead(200, { 'ContentType': 'text/html' });
                res.end(page, 'utf8')
            }
        } else {
            res.writeHead(200, { 'ContentType': contentType });
            res.end(data, 'utf8')
        }
    })
})

// create the port number you want to use
const PORT = process.env.PORT || 3030

//listen to the port number you created
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})