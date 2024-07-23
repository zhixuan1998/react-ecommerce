import { noop } from '@/utils/is';

export const defaultMenuProps = {
    visible: false,
    setVisible: noop,
    selectedItem: {},
    setSelectedItem: noop,

    options: [],
    keyField: 'key',
    valueField: 'value',
    searchable: false,
    menuHeight: '250px',
    animation: false,
}
