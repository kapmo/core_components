interface ISearchHandler {
    (page: number, rowsPerPage: number, value: string, fieldSearchObject: any): void;
};

interface IColumnMetadataProps {
    colName: string,
    objectField: string,
    enableSearch: boolean
}

interface ICustomTableProps {
    pageNo: number,
    rowsPerPage: any,
    totalCount: number,
    columnMetadata: Array<IColumnMetadataProps>,
    enableGlobalSearch: boolean,
    tableData: Array<any>,
    rowsPerPageOptions: (number | {
        label: string;
        value: number;
    })[],
    onPageChange: (
        newPage: number,
    ) => void,
    position?: 'left' | 'right',
    searchLabel?: string,
    onSearch?: ISearchHandler,
    searchCharCount?: number
}

export { ICustomTableProps, IColumnMetadataProps };