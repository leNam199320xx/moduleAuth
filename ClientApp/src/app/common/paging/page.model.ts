export class PageModel {
    pageIndex: number;
    page: number;
    minPageIndex = 0;
    maxPageIndex: number;
    pageLength: number;
    pageLengths: number[];
    count: number;
    displayCount: number;
    pageSize: number;
    pageLoadeds: boolean[] = [];
    pageData: any[] = [];
    loadMore = false;

    constructor(_count: number, _pageSize = 8, _currentPage = 1) {
        this.page = _currentPage < 1 ? 1 : _currentPage;
        this.pageSize = _pageSize;
        this.count = _count;
        this.displayCount = (_count < _pageSize) ? _pageSize : _count;
        this.pageLength = Math.round(this.displayCount / this.pageSize);
        this.pageIndex = this.page - 1;
        this.maxPageIndex = this.pageLength - 1;
        this.pageLengths = Array.from(Array(this.pageLength).keys());
        this.pageLoadeds = Array(this.pageLength).fill(false);
    }

    next() {
        this.pageIndex++;
        if (this.pageIndex === this.pageLength) {
            this.pageIndex = this.pageLength - 1;
        }
    }

    back() {
        this.pageIndex--;
        if (this.pageIndex === -1) {
            this.pageIndex = 0;
        }
    }

    goto(_index: number) {
        this.pageIndex = _index;
    }
}
