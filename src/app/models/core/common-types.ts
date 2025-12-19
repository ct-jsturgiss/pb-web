
/**
 * Shorthand type for an empty lambda with no arguments.
 */
export type EmptyLambdaType = () => void;

/**
 * Constant func for a do-nothing empty lambda.
 */
export const EmptyLambda = () => {};

/**
 * Represents the type of record changes to be submitted to the API.
 */
export enum RecordChangeKind {
    None = 0,
    Insert = 1,
    Update = 2,
    Delete = 3
}