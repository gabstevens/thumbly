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
});