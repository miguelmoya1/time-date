import { DateTime } from '../src';

describe('Function timeAgo', () => {
  it('now', () => {
    expect(new DateTime().timeAgo()).toEqual({
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      week: 0,
      second: 0,
      milisecond: 0,
    });
  });

  it('in 1 year', () => {
    expect(
      new DateTime(new Date(Date.now() + 31_536_000_000)).timeAgo()
    ).toEqual({
      year: 1,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      week: 0,
      second: 0,
      milisecond: 0,
    });
  });

  it('last year', () => {
    expect(
      new DateTime(new Date(Date.now() - 31_536_000_000)).timeAgo()
    ).toEqual({
      year: 1,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      week: 0,
      second: 0,
      milisecond: 0,
    });
  });
});

describe('Function timeAgo with exclude', () => {
  it('now', () => {
    expect(new DateTime().timeAgo(['milisecond', 'day'])).toEqual({
      year: 0,
      month: 0,
      hour: 0,
      minute: 0,
      week: 0,
      second: 0,
    });
  });

  it('in 1 year', () => {
    expect(
      new DateTime(new Date(Date.now() + 31_536_000_000)).timeAgo(['year'])
    ).toEqual({
      month: 12,
      day: 5,
      hour: 0,
      minute: 0,
      week: 0,
      second: 0,
      milisecond: 0,
    });
  });

  it('last year', () => {
    expect(
      new DateTime(new Date(Date.now() - 31_536_000_000)).timeAgo()
    ).toEqual({
      year: 1,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      week: 0,
      second: 0,
      milisecond: 0,
    });
  });
});

describe('Function formatTimeAgo', () => {
  it('now', () => {
    expect(new DateTime().formatTimeAgo()).toEqual('0');
  });

  it('in 1 year', () => {
    expect(
      new DateTime(new Date(Date.now() + 31_536_000_000)).formatTimeAgo()
    ).toEqual('1y');
  });

  it('in 1 year 1 month', () => {
    expect(
      new DateTime(
        new Date(Date.now() + 31_536_000_000 + 2_592_000_000)
      ).formatTimeAgo()
    ).toEqual('1y 1m');
  });

  it('last year', () => {
    expect(
      new DateTime(new Date(Date.now() - 31_536_000_000)).formatTimeAgo()
    ).toEqual('1y ago');
  });
});

const a = new DateTime();

a.timeAgo();
