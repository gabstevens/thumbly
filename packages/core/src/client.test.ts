import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThumblyClient } from './client';
import { ThumblyDriver } from './types';

describe('ThumblyClient', () => {
  let mockDriver: ThumblyDriver;

  beforeEach(() => {
    mockDriver = {
      submitVote: vi.fn().mockResolvedValue(undefined),
    };
    localStorage.clear();
    vi.spyOn(Storage.prototype, 'getItem');
    vi.spyOn(Storage.prototype, 'setItem');
  });

  it('should call driver.submitVote when voting', async () => {
    const client = new ThumblyClient({ surveyId: 'test-survey', driver: mockDriver });
    await client.vote(1);

    expect(mockDriver.submitVote).toHaveBeenCalledWith({
      surveyId: 'test-survey',
      optionIndex: 1,
      metadata: undefined,
    });
  });

  it('should not vote if already voted (persistence)', async () => {
    localStorage.setItem('thumbly:voted:test-survey', 'true');
    const client = new ThumblyClient({ surveyId: 'test-survey', driver: mockDriver });

    await client.vote(1);

    expect(mockDriver.submitVote).not.toHaveBeenCalled();
  });

  it('should mark as voted after successful vote', async () => {
    const client = new ThumblyClient({ surveyId: 'test-survey', driver: mockDriver });
    await client.vote(1);

    expect(localStorage.getItem('thumbly:voted:test-survey')).toBe('true');
  });

  it('should ignore persistence if disabled', async () => {
    localStorage.setItem('thumbly:voted:test-survey', 'true');
    const client = new ThumblyClient({ 
      surveyId: 'test-survey', 
      driver: mockDriver,
      disablePersistence: true 
    });

    await client.vote(1);

    expect(mockDriver.submitVote).toHaveBeenCalled();
  });

  it('should call onSuccess when vote succeeds', async () => {
    const onSuccess = vi.fn();
    const client = new ThumblyClient({ 
      surveyId: 'test-survey', 
      driver: mockDriver,
      onSuccess 
    });

    await client.vote(1);

    expect(onSuccess).toHaveBeenCalled();
  });

  it('should call driver.validate if it exists', async () => {
    mockDriver.validate = vi.fn();
    const client = new ThumblyClient({ surveyId: 'test-survey', driver: mockDriver });
    
    await client.vote(1);

    expect(mockDriver.validate).toHaveBeenCalledWith(1);
  });

  it('should call onError and rethrow if validate fails', async () => {
    const error = new Error('Invalid option');
    mockDriver.validate = vi.fn().mockImplementation(() => {
      throw error;
    });
    
    const onError = vi.fn();
    const client = new ThumblyClient({ 
      surveyId: 'test-survey', 
      driver: mockDriver,
      onError 
    });

    await expect(client.vote(99)).rejects.toThrow('Invalid option');
    expect(onError).toHaveBeenCalledWith(error);
  });

  it('should call onError when vote fails', async () => {
    const onError = vi.fn();
    const error = new Error('Permanent error');
    mockDriver.submitVote = vi.fn().mockRejectedValue(error);
    
    const client = new ThumblyClient({ 
      surveyId: 'test-survey', 
      driver: mockDriver,
      onError 
    });

    await expect(client.vote(1)).rejects.toThrow('Permanent error');
    expect(onError).toHaveBeenCalledWith(error);
  });
});