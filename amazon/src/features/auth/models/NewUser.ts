import { RegisterFormField } from './RegisterFormFields.interface';

export type NewUser = Omit<RegisterFormField, 'confirmPassword'>;
