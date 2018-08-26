import { Career } from './statistics.model';

export class ResponseModel {
    message: string;
    errors: any;
    results: Career[] | any;
    username: string;
    email: string;
    code: string;
    succeeded: boolean;
    returnUrl = '/';
    isSignedIn = false;
}
