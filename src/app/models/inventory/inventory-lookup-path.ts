import { RegexConst } from "../../../constants/regex-constants";
import { ModelAdapter } from "../core/modelAdapter";

const localConst = {
    pathDelimiter: "/",
    resetPath: "reset",
}

export class IvLookupPath {

    private m_pathId:string;
    private m_pathName:string;
    private m_level:number;
    private m_nodeId:string;
    private m_parentId:string;
    private m_isNew:boolean;

    get isNew():boolean { return this.m_isNew; }
    get pathId():string { return this.m_pathId; }
    get pathName():string { return this.m_pathName; }
    get level():number { return this.m_level; }
    get nodeId():string { return this.m_nodeId; }
    get parentId():string { return this.m_parentId; }

    constructor(
        pathId:string,
        pathName:string
    ) {
        this.m_pathId = pathId;
        this.m_pathName = pathName;
        this.m_isNew = false;
        if(this.m_pathId === localConst.pathDelimiter + localConst.pathDelimiter) {
            this.m_pathId = localConst.pathDelimiter;
        }
        this.m_level = IvLookupPath.getLevel(pathId);
        this.m_nodeId = IvLookupPath.getNodeId(pathId);
        this.m_parentId = IvLookupPath.getParentId(pathId);
    }

    asNew(toggle:boolean = true):IvLookupPath {
        this.m_isNew = toggle;

        return this;
    }

    static getLevel(path:string):number {
        let p = path.trim();
        if(p === localConst.pathDelimiter) {
            return 0;
        }

        return [...p.matchAll(RegexConst.Inventory.PathRank)].length;
    }

    static getNodeId(path:string):string {
        let p = path.trim();
        if(p === localConst.pathDelimiter || p === localConst.resetPath) {
            return `/`;
        }

        return [...p.matchAll(RegexConst.Inventory.PathRank)].map(m => m[0]).slice(-1)[0];
    }

    static getParentId(path:string):string {
        let p = path.trim();
        if(p === localConst.pathDelimiter || p === localConst.resetPath) {
            return `/`;
        }

        return [...p.matchAll(RegexConst.Inventory.PathRank)].map(m => m[0]).slice(0,-2).join("");
    }
}

export const IvLookupPathAdapter:ModelAdapter<IvLookupPath> = {

    adapt(item:any) {
        return new IvLookupPath(
            item["path_id"], 
            item["path_name"]
        );
    },

}