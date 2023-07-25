import * as yup from 'yup';
import { schema } from './hooks';

export type FormData = yup.InferType<typeof schema>;
