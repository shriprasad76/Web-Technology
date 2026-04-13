// HANDLING REQUEST AND RESPONSE
//EXPRESS APPLICATION , HANDLE HTTP REQUEST NAD RESPONSE
/*
REQUEST:-
Request object contains information baout client.
examples:-url, headers, query parameters, request body, etc.

*/
application.get('/users', (req, res) => {
    // Access query parameters
    const name = req.query.name;
    const age = req.query.age;  
    // Process the request and send a response
   localhost:3000/users?name=John&age=30    

    
});
/*
what is query parameters why we use query parameters .
*/

/*
RESPONSE:-
Response object is used to send data back to the client.
examples:-status code, headers, response body, etc.
*/