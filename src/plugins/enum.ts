export default function (descriptor: Descriptor = {}, prop: string) {

    const allowedValues: Array<any> = descriptor.enum || []

    if (!Array.isArray(allowedValues)) {
        throw new Error(`The property "${prop}" with enum "${allowedValues}" is not a valid enumeration`)
    }

    if (allowedValues.length === 0) {
        throw new Error(`The property "${prop}" has named "enum" requirement but failed to specific any members. Add at least one member to the enum block`)
    }


    const nextValidator = descriptor.validator

    descriptor.validator = function (value: any) {
        if (!allowedValues.includes(value)) {
            console.error(`Provided value "${value}" is not exists in the property "${prop}" enumeration`)

            return false
        }

        return nextValidator ? nextValidator.apply(this, arguments) : true
    }
    if (!('default' in descriptor)) {
        descriptor.default = allowedValues[0]
    }
}

