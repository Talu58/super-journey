export function signUp(user) {
  //send request to DB
    //if email exist & pwd correct
    //else if email exist and pwd incorrect
    //else if email doesn't exist
    const promise = new Promise(function(resolve, reject) {
      window.setTimeout(
        function() {
          // On tient la promesse !
          resolve({ 
            completedProfile: false
          });
        }, 800);
    });
    
    return promise;
}