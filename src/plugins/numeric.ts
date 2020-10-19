import { isNumeric } from '../utils';

export default function (descriptor: Descriptor = {}, prop: string) {
  const nextValidator = descriptor.validator;

  descriptor.type = [String, Number];

  descriptor.validator = function (value: any) {
    if (!isNumeric(value)) {
      console.error(`Provided value "${value}" for property "${prop}" is non-numeric`);

      return false;
    }

    return nextValidator ? nextValidator.apply(this, arguments) : true;
  };
}
