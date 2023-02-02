import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CustomTable from './CustomTable';

const colMetaDataSample = [{
    colName: 'Username',
    objectField: 'name',
    enableSearch: true
},
{
    colName: 'Email',
    objectField: 'email',
    enableSearch: false
},
{
    colName: 'Role',
    objectField: 'role',
    enableSearch: true
},
]

export default {
    title: 'Example/CustomTable',
    component: CustomTable
} as ComponentMeta<typeof CustomTable>;

const Template: ComponentStory<typeof CustomTable> = (args) => <CustomTable {...args} />;

export const TableWithSearch = Template.bind({});
TableWithSearch.args = {
    pageNo: 0,
    rowsPerPage: 1,
    totalCount: 2,
    columnMetadata: colMetaDataSample,
    enableGlobalSearch: true,
    tableData: [{ name: 'john', email: 'john@gmail.com', role: 'Admin' },
    { name: 'jack', email: 'jack@gmail.com', role: 'Manager' }],
    onSearch: (data, fieldSearchTexts) => {
        console.log(data, fieldSearchTexts);
    },
    position: 'right',
    searchLabel: 'Search User',
    searchCharCount: 3
};

export const TableWithoutSearch = Template.bind({});
TableWithoutSearch.args = {
    pageNo: 0,
    rowsPerPage: 10,
    totalCount: 100,
    columnMetadata: colMetaDataSample,
    enableGlobalSearch: false,
    tableData: [{ name: 'john', email: 'john@gmail.com', role: 'Admin' },
    { name: 'jack', email: 'jack@gmail.com', role: 'Manager' }],
};
