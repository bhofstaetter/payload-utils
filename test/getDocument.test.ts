import {expect, it, vi} from 'vitest';
import {getDocument} from '@/getDocument';

const mockDoc = {id: 'abc', title: 'Test'};
const callback = vi.fn<(id: string | number) => Promise<typeof mockDoc>>();

it('returns the document directly when an object is passed', async () => {
    // test
    const result = await getDocument(mockDoc, callback);

    // verify
    expect(result).toBe(mockDoc);
    expect(callback).not.toHaveBeenCalled();
});

it('calls the callback with a string id', async () => {
    // prepare
    callback.mockResolvedValue(mockDoc);

    // test
    const result = await getDocument('abc', callback);

    // verify
    expect(callback).toHaveBeenCalledWith('abc');
    expect(result).toBe(mockDoc);
});

it('calls the callback with a number id', async () => {
    // prepare
    callback.mockResolvedValue(mockDoc);

    // test
    const result = await getDocument(42, callback);

    // verify
    expect(callback).toHaveBeenCalledWith(42);
    expect(result).toBe(mockDoc);
});
