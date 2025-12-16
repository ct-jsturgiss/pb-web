import { IvLookupPath } from "./inventory-lookup-path";

export interface IvLookupSelection {
    [key:string]:any;
    leaf1?:IvLookupPath;
    leaf2?:IvLookupPath;
    leaf3?:IvLookupPath;
    leaf4?:IvLookupPath;
    leaf5?:IvLookupPath;
    leaf6?:IvLookupPath;
    leaf7?:IvLookupPath;
    selectionPath:string;
}

export class IvLookupSelection implements IvLookupSelection {

    constructor(leafs:(IvLookupPath|null)[]) {
        const cleanedLeafs = (leafs.filter(l => !!l) as IvLookupPath[]).sort((a,b) => a.level - b.level);
        for(let i = 0; i < cleanedLeafs.length; i++) {
            const IvLookupPath = cleanedLeafs.find(l => l.level === i + 1);
            this[`leaf${(i + 1).toString()}`] = IvLookupPath;
            if(!IvLookupPath) {
                break;
            }
        }

        this.selectionPath = (() => {
            let path:string[] = cleanedLeafs.map(l => l.nodeId.replaceAll("/",""));
            const finalPath = `/${path.join("/")}/`;
            if(finalPath === "//") {
                return "/";
            }

            return finalPath;
        })();
    }

}