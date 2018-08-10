import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MessageModel } from './message.model';

@Component({
    selector: 'app-message-dialog',
    templateUrl: 'message-dialog.html'
})
export class MessageDialogComponent {
    @Input() message: MessageModel = new MessageModel();
    @Input() enabled = false;
    @Input() hasContinue = false;
    @Output() closeEvent: EventEmitter<boolean> = new EventEmitter();
    @Output() continueEvent: EventEmitter<MessageModel> = new EventEmitter();
    btnClose() {
        this.closeEvent.emit(true);
    }
    btnContinue() {
        this.continueEvent.emit(this.message);
    }
    btnCancel() {
        this.closeEvent.emit(true);
    }
}
