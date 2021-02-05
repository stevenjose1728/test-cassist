export type RulesValidations = {
    required?: boolean,
    email?: boolean,
    minLength?: number,
    maxLength?: number,
}

export type Validation = {
    name: string,
    rules: RulesValidations,
    hasError: boolean,
    msgError: string,
    isDirty?: boolean
}