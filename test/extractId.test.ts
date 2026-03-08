import {describe, expect, it} from 'vitest';
import {extractId, extractIds} from '@/extractId';

describe('extractId', () => {
    it('returns a string id as-is', () => {
        expect(extractId('abc')).toBe('abc');
    });

    it('returns a number id as-is', () => {
        expect(extractId(42)).toBe(42);
    });

    it('extracts the id from an object with a string id', () => {
        expect(extractId({id: 'abc'})).toBe('abc');
    });

    it('extracts the id from an object with a number id', () => {
        expect(extractId({id: 42})).toBe(42);
    });
});

describe('extractIds', () => {
    it('extracts ids from a mixed array', () => {
        expect(extractIds(['a', {id: 'b'}, 3, {id: 4}])).toEqual(['a', 'b', 3, 4]);
    });

    it('returns an empty array for empty input', () => {
        expect(extractIds([])).toEqual([]);
    });
});
