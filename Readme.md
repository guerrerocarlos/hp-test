# Technical Challenge ![Tests Status](https://github.com/guerrerocarlos/hp-test/actions/workflows/backend.yml/badge.svg)

## Test1:

Code can be found in the [/task1/backend](/task1/backend) folder:

### Live Demo:

 - Frontend: https://hp-itunes.carlosguerrero.com/     (CloudFlare hosted)
 - Backend:  https://api-hp-itunes.carlosguerrero.com/ (AWS Lambda hosted)

## Test2:

 * What do you think is wrong with the code, if anything?

 - I don’t think it should be considered a “middleware” since it actually just processes and responds to a specific action. 
 - It would depend on the business logic, but seems weird to have a “inviteUser” middleware in the “middle” of every request that comes on. Rather would make it just a specific endpoint that takes care of this action.
 - As middleware it would fail since it’s not receiving and not making use of the “next” parameter that would allow it to wrap up the request-response cycle and call the next middleware function in the stack.
 - The 500 error is correct if an error was found, but if the shop was not found a 404 error would be more appropriate.
 - In general I would also prefer the use of async/await and wait for the completion of tasks before returning the response to the client. Making it also more compatible with serverless architectures.
 - Also moving it to typescript and defining all types would obviously be ideal
 - Error 400 (Bad Request) when “User already invited to this shop” does not correspond, maybe 400 (Conflict) would be more appropriate.

* Can you see any potential problems that could lead to exceptions

 - I would prefer not to return “res.json(invitationResponse);” without knowing what it contains, and instead process the response received from the external endpoint.
 - If the request is correctly processed, nothing is returned to the user after “shop.save();”
 - Most of the possible async errors (err variables) are not handled.

* How would you refactor this code to:
 - Make it easier to read
 - I would decouple the express response returning code portion from the response object generation, and also make it async/await so to be able to return at any point, and prevent any unintended code from running after the response object was created.
 - Increase code reusability
 - Add comments along the logic to provide more context and the possible outcomes of each step.
 - Separate each function into smaller ones whenever possible without breaking logic, to be able to reuse any piece if needed.
 - The code lacks proper error handling. If an error occurs during the execution of the superagent.post request or in any of the database operations, the error should be handled and an appropriate response should be sent back to the client.
 - The code uses callbacks which can lead to callback hell when the codebase grows. Using async/await can make the code cleaner and easier to understand.
 - The code uses HTTP status code 400 when the user is already invited. It would be more appropriate to use 409 Conflict.
 - The code could be improved by checking if the createdUser and shop exist before trying to access their properties.
 - If there’s any data that is not expected to change between future requests, it could be cached locally or in a memory-based key/value storage to improve speed.
 - Extract the HTTP request to the authentication system into a separate function. This would allow to mock this function in the tests, isolating the behaviour of the processInviteUser function.
 - Similarly, extract the database operations into separate functions. This will allow to mock these functions in the tests, isolating the behaviour of the processInviteUser function.

* How might you use the latest JavaScript features to refactor the code?
 - Code here: https://github.com/guerrerocarlos/hp-test/blob/main/task2/inviteUserMiddleware.ts
