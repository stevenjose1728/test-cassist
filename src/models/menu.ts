export type SubMenu = {
    path:string,
    title:string,
    type:string,
    active?:boolean,
    sidebartitle?:string,
    children?:[]
}

export type Children = {
    path:string,
    title:string,
    type:string,
    active?:boolean,
    sidebartitle?:string,
    children?:Array<SubMenu>
}

export type MainMenu = {
    path: string,
    title: string,
    icon: React.FC,
    type: string,
    badgeType: string,
    active: boolean,
    sidebartitle?:string,
    children?: Array<Children>
}