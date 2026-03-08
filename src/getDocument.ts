import type {DefaultDocumentIDType} from 'payload';

export const getDocument = async <T extends object>(
    idOrDocument: T | DefaultDocumentIDType,
    getDocumentCallback: (id: DefaultDocumentIDType) => Promise<T>,
): Promise<T> => {
    if (typeof idOrDocument === 'object') {
        return idOrDocument as T;
    }

    return getDocumentCallback(idOrDocument);
};
