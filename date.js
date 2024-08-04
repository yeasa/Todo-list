

exports.getDate = function(){
    const today = new Date();
    let options ={
        day:'numeric',
        month:'long',
        weekday:'long'
        
    };
    return today.toLocaleDateString("en-US", options);
}

exports.getDay = function(){
    const today = new Date();
    const options = {
        weekday:'long'
    }
    return today.toLocaleTimeString('en-US', options);
}