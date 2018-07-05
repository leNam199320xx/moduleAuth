import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigModel } from './config.model';
import { map } from 'rxjs/Operators';

@Injectable()
export class ConfigsService {
    configs: ConfigModel = new ConfigModel();
    constructor(private http: HttpClient) { }

    getConfigsFromJson(username: string = 'namld') {
        return this.http.get<ConfigModel>('assets/user-configs/' + username + '/configs.json', { responseType: 'json' });
    }

}
