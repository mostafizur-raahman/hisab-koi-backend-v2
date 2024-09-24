const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajvErrors = require("ajv-errors");
const Fault = require("./Fault");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
ajvErrors(ajv);

const validator = (schema, data) => {
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
        const errorMessage = generateErrorMessage(validate.errors);
        console.debug("ERROR ", errorMessage);
        throw new Fault(`${errorMessage}`, 400);
    }
};

const generateErrorMessage = (errors) => {
    const error = errors[0]; // Get the first error
    const _field = error.instancePath.slice(1); // Get the field causing the error
    const _params = error.params; // Get error parameters
    const _limit = _params?.limit; // Get the limit if applicable

    // Define error message templates based on different validation keywords
    const errorMessages = {
        errorMessage: () => error.message,
        additionalProperties: () =>
            `Unexpected property '${_params.additionalProperty}'`,
        required: () => `Missing required field '${_params.missingProperty}'`,
        minLength: () =>
            `'${_field}' should be at least ${_limit} characters long`,
        maxLength: () =>
            `'${_field}' should be at most ${_limit} characters long`,
        type: () => `'${_field}' must be of type '${_params.type}'`,
        format: () => `'${_field}' must be a valid ${_params.format} value`,
        minimum: () => `'${_field}' must be greater than or equal to ${_limit}`,
        maximum: () => `'${_field}' must be less than or equal to ${_limit}`,
        pattern: () =>
            `'${_field}' must match the pattern '${_params.pattern}'`,
    };

    // Return the corresponding error message or a default message
    return errorMessages[error.keyword]
        ? errorMessages[error.keyword]()
        : `Invalid field '${_field}'`;
};

module.exports = validator;
