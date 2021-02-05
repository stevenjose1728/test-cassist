import {
    Tag
} from 'react-feather';

import { MainMenu } from 'models';

export const MENUITEMS:Array<MainMenu> = [
    {
        path: '/',
        title: 'Dashboard',
        icon: Tag,
        type: 'link',
        badgeType: 'primary',
        active: false
    },
    {
        path: '/categories',
        title: 'Categorias',
        icon: Tag,
        type: 'link',
        badgeType: 'primary',
        active: false
    },
    {
        path: '/products',
        title: 'Productos',
        icon: Tag,
        type: 'link',
        badgeType: 'primary',
        active: false
    }
]
