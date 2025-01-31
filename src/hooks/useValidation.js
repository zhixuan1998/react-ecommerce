import { useEffect, useRef, useState } from 'react';
import { isEmpty, isMobilePhone, isLength, isEmail, isStrongPassword } from 'validator';
import { compare } from '@/utils/object';

const $error = false;
const $invalid = false;

class Validation {
    #touched = false;
    #oldValidations = {};
    #forceUpdate;
    #$error = $error;
    #$invalid = $invalid;

    constructor(validations, forceUpdate) {
        this.#forceUpdate = forceUpdate;
        this.#oldValidations = validations;

        this.#standardize(validations);
    }

    get $error() {
        return this.#$error;
    }

    get $invalid() {
        return this.#$invalid;
    }

    $touch() {
        this.#touched = true;
        this.$validate();
    }

    $reset() {
        this.#touched = false;
        this.$validate();
    }

    $validate(validations = this.#oldValidations) {
        this.#$error = false;
        this.#$invalid = false;

        for (let field in validations) {
            this[field].$error = false;
            this[field].$invalid = false;

            for (let v in validations[field]) {
                this[field][v].$error = this.#touched && !validations[field][v];
                this[field][v].$invalid = !validations[field][v];

                if (this[field][v].$error) {
                    this.#$error = this[field].$error = this.#touched;
                }

                if (this[field][v].$invalid) {
                    this.#$invalid = this[field].$invalid = true;
                }
            }
        }

        this.#oldValidations = validations;
        this.#forceUpdate();
    }

    #standardize(validations, parent = this) {
        for (let field in validations) {
            parent[field] = { $error, $invalid };
            if (Object.keys(validations[field]).length > 0) {
                this.#standardize(validations[field], parent[field]);
            }
        }
    }
}

const validators = {};

validators.required = (value) => !isEmpty(value);

validators.requiredIf = (value, propOrFunc) => {
    const ifVal = typeof propOrFunc === 'function' ? propOrFunc() : !!propOrFunc;

    return !!ifVal && !isEmpty(value);
};

validators.maxLength = (value, max = 0) => isLength(value, { min: undefined, max });

validators.minLength = (value, min = 0) => isLength(value, { min, max: undefined });

validators.betweenLength = (value, { min = 0, max = 0 }) => isLength(value, { min, max });

validators.email = (value) => isEmail(value);

validators.mobilePhone = (value) => isMobilePhone(value, 'ms-MY');

validators.password = (value) =>
    isStrongPassword(value, {
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minSymbols: 1,
        minNumbers: 1
    });

validators.match = (value1, value2) => {
    if ((value1 === null && value2 === null) || (value1 === undefined && value2 === undefined))
        return true;

    const constructor1 = value1.constructor;
    const constructor2 = value2.constructor;

    if (constructor1 !== constructor2) return false;

    switch (constructor1) {
        case Date:
            return Date.parse(value1) === Date.parse(value2);
        case Object:
            return compare(value1, value2);
        case String:
            return value1.trim() === value2.trim();
        default:
            return value1 === value2;
    }
};

function useValidation(validations, state) {
    const [, forceUpdate] = useState(false);

    const $v = useRef(new Validation(validations, () => forceUpdate((state) => !state))).current;

    useEffect(() => {
        $v.$validate(validations);
    }, [state]);

    return $v;
}

export { validators };
export default useValidation;
