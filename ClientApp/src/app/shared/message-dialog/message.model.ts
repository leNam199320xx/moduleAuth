export class MessageModel {
    message: string;
    key: number;
    type: MessageType = MessageType.error;
    continueUrl: string;
    continueValue: string | number;
    continueType: MessageContinueType = MessageContinueType.url;
}
export enum MessageType {
    error = 0,
    warning = 1,
    success = 2
}
export enum MessageContinueType {
    url = 1,
    value = 2
}
