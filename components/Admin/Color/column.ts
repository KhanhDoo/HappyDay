import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import ActionMenu from '~/components/Admin/Color/CellAction.vue'
import ColorValue from './Value.vue'

export interface Color{
    id: string
    name: string
    value: string
    createdAt: string 
}

export const columns: ColumnDef<Color>[] = [
    {
        accessorKey: 'name',
        header:'Name'
    },
    
    { 
        accessorKey: 'value', 
        header: 'Value', 
        cell: ({ row }) => { 
            return h(ColorValue, { 
                colorCode: row.original.value 
            }); 
        }
    },
    {
        accessorKey: 'createdAt',
        header:'Created At'
    },
    {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
    const color = row.original
    return h('div', { class: 'relative' }, h(ActionMenu, {
        color
    }))
    },
  }
]