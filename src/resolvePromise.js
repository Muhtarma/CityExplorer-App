//function for resolving a promise and updating the promise state (copied from the lab code)
export function resolvePromise(prms, promiseState) {
    function promiseResolvedACB(result){
        if(promiseState.promise === prms){
            promiseState.data = result;
        }
    }

    function promiseRejectedACB(error){
        if(promiseState.promise === prms){
            promiseState.error = error;
        }
    }

    promiseState.promise = prms;
    promiseState.data = null;
    promiseState.error = null;

    if(!prms)
    return;
    
    if(typeof prms.then === "function")
    prms.then(promiseResolvedACB).catch(promiseRejectedACB);

}