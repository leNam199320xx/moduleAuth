import { Career } from './statistics.model';

export class ResponseModel {
    message: string;
    errors: any;
    results: Career[] | any;
    succeeded: string;
    username: string;
    email: string;
    code: string;
    returnUrl = '/';
    isSignedIn = false;
}
