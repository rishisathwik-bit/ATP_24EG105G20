for  get and post request 
client side application and server side applicteion can interactwith each other over http protocall by making http request and http response. To make the http req from client side application,one can use either fetch function or axios module
the following are the http req types
# GET
    -to read all resources
# POST    
    -to create new resource
# PUT    
    -to update entire resource
# DELETE
    -to delete a resource
# PATCH
    -to update a resource partially

the post,put,patch req types can have body properties which can hold json data whereas get and delete request do not have body property and they can send data through url    

# state management
    sharing state + keeping statae sync across app

    context API ----->small apps
    redux/zustand(moder application) ------>large apps

# context API
    -create context object(pipe line)      
    -provide or add state to context object(add water to pipeline)
    -set this context provider to a parent
    -consume context from parents
# issues with context
    -context with use statehook is best and simple state management mechanism for small applications.But it creates un-necessary rerendring issues when multiple state is part of a context

to overcome these unnecessary rerendering issue,create multiple contexts and make sure ecah contxt has a single state
    when the application size is huge then mainatince of multiple context will become an issue. for that large applications advanced state managemmenat tools like redux or zustane can be used

# Advanced state management with zustand
    -    