import type {DefaultDocumentIDType, TypeWithID} from 'payload';

export const extractId = (modelOrId: DefaultDocumentIDType | TypeWithID): DefaultDocumentIDType =>
    typeof modelOrId === 'object' ? modelOrId.id : modelOrId;

export const extractIds = (modelsOrIds: (DefaultDocumentIDType | TypeWithID)[]): DefaultDocumentIDType[] =>
    modelsOrIds.map(extractId);
