import { HostListener, Injectable, OnDestroy, PLATFORM_ID, APP_ID, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export enum BreakpointsValue {
    desktop = 0,
    tablet_landscape = 1,
    tablet_portrait = 2,
    mobile_landscape = 3,
    mobile_portrait = 4
}

@Injectable()
export class WindowService implements OnDestroy, OnInit {
    isSite = false;
    currentBreakpoint: Breakpoints;
    currentBreakpointSubject: Subject<Breakpoints> = new Subject();
    breakpoints: Breakpoints[] = [{
        query: '(min-width: 1280px)',
        device: 'desktop',
        value: BreakpointsValue.desktop
    },
    {
        query: '(min-width: 960px) and (max-width: 1289px) and (orientation:landscape)',
        device: 'tablet landscape',
        value: BreakpointsValue.tablet_landscape
    },
    {
        query: '(min-width: 600px) and (max-width: 839px)',
        device: 'tablet portrait',
        value: BreakpointsValue.tablet_portrait
    },
    {
        query: '(min-width: 480px) and (max-width: 959px) and (orientation:landscape)',
        device: 'mobile landscape',
        value: BreakpointsValue.mobile_landscape
    },
    {
        query: '(min-width: 0px) and (max-width: 599px)',
        device: 'mobile portrait',
        value: BreakpointsValue.mobile_portrait
    }];
    window: any;
    document: Document;
    body: HTMLElement;
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(APP_ID) private appId: string
    ) {
        this.setBreakpoint();
        if ((isPlatformBrowser(platformId))) {
            this.document = <any>document;
            this.window = <any>window;
            this.body = this.document.body;
            this.setBreakpoint();
        }
    }
    ngOnInit() {
    }
    matchMedia(_mediaquery) {
        const result = (this.window) ? <MediaQueryList>this.window.matchMedia(_mediaquery) : {
            matches: false,
            media: '',
            onchange: null
        };
        return result;
    }
    ngOnDestroy() {
        this.currentBreakpointSubject.unsubscribe();
    }
    setBreakpoint() {
        this.breakpoints.forEach(b => {
            const r = this.matchMedia(b.query);
            if (r.matches) {
                this.currentBreakpoint = b;
                this.body.className = b.device;
                this.currentBreakpointSubject.next(this.currentBreakpoint);
            }
        });
    }
}

export interface Breakpoints {
    device: string;
    query: string;
    value: BreakpointsValue;
}
