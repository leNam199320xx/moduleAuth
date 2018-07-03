export class ResponseModel {
    message: string;
    errors: any;
    results: any;
    succeeded: string;
    username: string;
    email: string;
    code: string;
    returnUrl = '/';
    isSignedIn = false;
}
