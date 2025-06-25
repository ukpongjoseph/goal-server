const handleError = (err) => {
    const errors = {
        email: "",
        password: ""
    }
    if(err.name === "ValidationError"){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    if(err.message === "Incorrect email"){
        errors.email = "email has not been registered"
        return errors
    }
    if(err.message === "Incorrect password"){
        errors.email = "email is incorrect"
        errors.password = "password is incorrect"
        return errors
    }
    return errors
}
module.exports = handleError