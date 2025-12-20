export interface ModelAdapter<TRecord,TChangeRecord> {
    adaptFromApi(item:any):TRecord;
    adaptToApi(item:TRecord):TChangeRecord;
}