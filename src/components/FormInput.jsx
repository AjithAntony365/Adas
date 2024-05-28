import { MultiSelect, MultiSelectItem, Select, SelectItem, TextInput } from "@tremor/react";
import { ErrorMessage, Field } from "formik";

const FormInput = ({ name, type, label, placeholder, className }) => {
    return (
        <div className={className}>
            <label
                htmlFor={name}
                className="text-sm text-gray-900  block font-medium">
                {/* text-tremor-content */}
                {label}
            </label>
            <div >
                <Field
                    as={TextInput}
                    type={type}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    autoComplete="on"
                />
            </div>
            <ErrorMessage
                name={name}
                component="div"
                className="text-red-500 italic text-xs"
            />
        </div>
    )
};

const FormSelect = ({ name, label, placeholder, className, itemOption, setFieldValue, value }) => {
    return (
        <div className={className}>
            <label
                htmlFor={name}
                className="text-tremor-default text-tremor-content">
                {label}
            </label>
            <div>
                <Select value={value} onValueChange={e => setFieldValue(name, e)}>
                    {itemOption.map(item => (
                        <SelectItem key={item} value={item} />
                    ))}

                </Select>
            </div>
            <ErrorMessage
                name={name}
                component="div"
                className="text-red-500 italic text-xs"
            />
        </div>
    )
}

const FormMultiSelect = ({ name, label, placeholder, className, itemOption, setFieldValue, value }) => {
    return (
        <div className={className}>
            <label
                htmlFor={name}
                className="text-tremor-default text-tremor-content">
                {label}
            </label>
            <div>
                <MultiSelect value={value} onValueChange={e => setFieldValue(name, e)}>
                    {itemOption.map(item => (
                        <MultiSelectItem key={item} value={item} />
                    ))}
                </MultiSelect>
            </div>
            <ErrorMessage
                name={name}
                component="div"
                className="text-red-500 italic text-xs"
            />
        </div>
    )
}

export { FormInput, FormSelect, FormMultiSelect };

const FormSelect2 = ({ name, label, placeholder, className, itemoption }) => {
    return (
        <div className={className}>
            <label
                htmlFor={name}
                className="text-tremor-default text-tremor-content">
                {label}
            </label>
            <div>
                <Field
                    as='select'
                    name={name}
                    placeholder={placeholder}
                    className='p-2 w-full outline-0 text-tremor-content rounded-tremor-default shadow-tremor-input text-tremor-default border ring border-tremor-border  focus:border-tremor-brand-subtle  focus:ring-tremor-brand-muted hover:bg-tremor-background-muted '
                >
                    {itemoption.map(i => (
                        <option
                            key={i}
                            value={i}
                            className="text-tremor-default text-tremor-content-emphasis bg-tremor-background-muted "
                        >
                            {i}
                        </option>

                    ))}
                </Field>
            </div>
            <ErrorMessage
                name={name}
                component="div"
                className="text-red-500 italic text-xs"
            />
        </div>
    )
}