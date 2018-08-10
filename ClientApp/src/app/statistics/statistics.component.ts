import { Component } from '@angular/core';
import { MessageModel, MessageType } from '../shared/message-dialog/message.model';

@Component({
    selector: 'app-statistics',
    templateUrl: 'statistics.html'
})
export class StatisticsComponent {
    errorMessage: MessageModel;
    errorMessageOld: MessageModel;
    getSearchResults($val: string) {
        if ($val && $val !== '') {
            // search
        } else {
            // error message
            this.errorMessage = new MessageModel();
            this.errorMessage.key = 404;
            this.errorMessage.message = 'Not found';
            this.errorMessage.type = MessageType.error;
        }
    }

    closeMessageDialog() {
        this.errorMessageOld = this.errorMessage;
        this.errorMessage = undefined;
    }
}
