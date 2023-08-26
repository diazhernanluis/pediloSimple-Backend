
const registerValidations = (client) => {
    const { companyName, email, password } = client

    return (!companyName || !email || !password) ? false : true;
}

module.exports = {
    registerValidations
}