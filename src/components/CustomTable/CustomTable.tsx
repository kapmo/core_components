import * as React from 'react';
import { ICustomTableProps, IColumnMetadataProps } from './../../interfaces'
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Box, TablePagination,
    IconButton, TextField, TableFooter,
} from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

const CustomTable = (props: ICustomTableProps) => {

    const [searchText, setSearchText] = React.useState('');
    const [fieldSearchTexts, setFieldSearchTexts] = React.useState({});

    const onChangeFieldText = (key: string, value: any) => {
        let data: any = { ...fieldSearchTexts };
        data[key] = value;
        setFieldSearchTexts({ ...data });
        if (props.searchCharCount && (value + '').length >= props.searchCharCount) {
            props.onSearch?.(props.pageNo, props.rowsPerPage, searchText, data);
        }
    }

    const onPaginationChange = (no: number, range: any) => {
        props.onSearch?.(props.pageNo, props.rowsPerPage, searchText, fieldSearchTexts);
    }

    const TablePaginationActions = () => {
        const theme = useTheme();
        const { totalCount, pageNo, rowsPerPage, onPageChange } = props;

        return (
            <Box sx={{ flexShrink: 0, ml: 2.5 }}>
                <IconButton
                    onClick={() => onPageChange(0)}
                    disabled={pageNo === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={() => onPageChange(pageNo - 1)}
                    disabled={pageNo === 0}
                    aria-label="previous page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={() => onPageChange(pageNo + 1)}
                    disabled={pageNo >= Math.ceil(totalCount / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={() => onPageChange(Math.max(0, Math.ceil(totalCount / rowsPerPage) - 1))}
                    disabled={pageNo >= Math.ceil(totalCount / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </Box>
        );
    }

    return <Box>
        {props.enableGlobalSearch && <Box display={'flex'} justifyContent={'flex-end'}>
            <TextField
                placeholder={props.searchLabel || "Search..."}
                value={searchText} onChange={(event) => setSearchText(event?.target.value)}
            />
            <IconButton onClick={() => { props.onSearch?.(props.pageNo, props.rowsPerPage, searchText, fieldSearchTexts) }}>
                <SearchIcon />
            </IconButton>
        </Box>}
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {props.columnMetadata.map((colInfo: IColumnMetadataProps) =>
                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <TextField InputProps={{ disableUnderline: true }} id="input-with-sx"
                                        label={colInfo.colName} variant="standard" disabled={!colInfo.enableSearch}
                                        onChange={(event: any) =>
                                            onChangeFieldText(colInfo.objectField, event.target.value)} />
                                    {colInfo.enableSearch && <SearchIcon onClick={(event: any) =>
                                        onChangeFieldText(colInfo.objectField, event.target.value)} />}
                                </Box>
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tableData.map((data: any) => (
                        <TableRow>
                            {props.columnMetadata.map((colInfo: IColumnMetadataProps) =>
                                <TableCell> {data[colInfo.objectField]} </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={props.rowsPerPageOptions}
                            colSpan={3}
                            count={props.totalCount}
                            rowsPerPage={props.rowsPerPage}
                            page={props.pageNo}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={(event, page) => onPaginationChange(page, props.rowsPerPage)}
                            onRowsPerPageChange={(event) => onPaginationChange(props.pageNo, event.target.value)}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    </Box>
}

export default CustomTable;