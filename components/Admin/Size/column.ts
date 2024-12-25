import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import ActionMenu from '~/components/Admin/Size/CellAction.vue'


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
        
    },
    {
        accessorKey: 'createdAt',
        header:'Created At'
    },
    {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
    const size = row.original
    return h('div', { class: 'relative' }, h(ActionMenu, {
        size
    }))
    },
  }
]