import {expect, it, vi} from 'vitest';
import {createValidator} from '@/createValidator';

const mockOptions = {} as any;

it('runs the default validator when value is falsy', async () => {
    // prepare
    const defaultValidator = vi.fn().mockResolvedValue(true);

    const validator = createValidator({
        defaultValidator,
        validators: [() => 'should not run'],
    });

    // test
    await validator(null, mockOptions);

    // verify
    expect(defaultValidator).toHaveBeenCalledWith(null, mockOptions);
});

it('runs the default validator when value is an empty array', async () => {
    // prepare
    const defaultValidator = vi.fn().mockResolvedValue(true);

    const validator = createValidator({
        defaultValidator,
        validators: [() => 'should not run'],
    });

    // test
    await validator([], mockOptions);

    // verify
    expect(defaultValidator).toHaveBeenCalledWith([], mockOptions);
});

it('runs all validators and then the default when all pass', async () => {
    // prepare
    const defaultValidator = vi.fn().mockResolvedValue(true);
    const v1 = vi.fn().mockReturnValue(true);
    const v2 = vi.fn().mockReturnValue(true);

    const validator = createValidator({
        defaultValidator,
        validators: [v1, v2],
    });

    // test
    const result = await validator('value', mockOptions);

    // verify
    expect(v1).toHaveBeenCalledWith('value', mockOptions);
    expect(v2).toHaveBeenCalledWith('value', mockOptions);
    expect(defaultValidator).toHaveBeenCalled();
    expect(result).toBe(true);
});

it('short-circuits on the first failing validator', async () => {
    // prepare
    const defaultValidator = vi.fn().mockResolvedValue(true);
    const v1 = vi.fn().mockReturnValue('error from v1');
    const v2 = vi.fn().mockReturnValue(true);

    const validator = createValidator({
        defaultValidator,
        validators: [v1, v2],
    });

    // test
    const result = await validator('value', mockOptions);

    // verify
    expect(result).toBe('error from v1');
    expect(v2).not.toHaveBeenCalled();
    expect(defaultValidator).not.toHaveBeenCalled();
});

it('supports async validators', async () => {
    // prepare
    const defaultValidator = vi.fn().mockResolvedValue(true);
    const asyncValidator = vi.fn().mockResolvedValue('async error');

    const validator = createValidator({
        defaultValidator,
        validators: [asyncValidator],
    });

    // test
    const result = await validator('value', mockOptions);

    // verify
    expect(result).toBe('async error');
});
