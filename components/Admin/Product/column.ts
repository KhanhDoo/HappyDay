import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import ActionMenu from './/CellAction.vue'
import ColorValue from '../Color/Value.vue'

export interface Color{
    id: string   
    name: string  
    price: string 
    category: string 
    size: string 
    color: string
    createdAt: string
    isFeatured: boolean
    isArchived: boolean       
}

export const columns: ColumnDef<Color>[] = [
    {
        accessorKey: 'name',
        header:'Name'
    },
    {
        accessorKey: 'isArchived',
        header:'Archived'
    },
    {
        accessorKey: 'isFeatured',
        header:'Featured'
    },
    {
        accessorKey: 'price',
        header:'Price'
    },
    {
        accessorKey: 'category',
        header:'Category'
    },
    {
        accessorKey: 'size',
        header:'Size'
    },
    
    // { 
    //     accessorKey: 'color', 
    //     header: 'Color', 
    //     cell: ({ row }) => { 
    //         return h(ColorValue, { 
    //             colorCode: row.original.color 
    //         }); 
    //     }
    // },
    {
        accessorKey: 'createdAt',
        header:'Created At'
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const product = row.original
            return h('div', { class: 'relative' }, h(ActionMenu, {
                product
        }))
    },
  }
]