type Structure = {
  year?: number;
  month?: number;
  week?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  milisecond?: number;
};

type Exclude = keyof Structure;
type Acronim = Partial<{ [T in keyof Structure]: string }>;

export class DateTime {
  #date!: Date;
  #structure: Structure = {
    year: 31_536_000_000,
    month: 2_592_000_000,
    week: 604_800_000,
    day: 86_400_000,
    hour: 3_600_000,
    minute: 60_000,
    second: 1_000,
    milisecond: 1,
  };
  #acronim: Acronim = {
    year: 'y',
    month: 'm',
    week: 'w',
    day: 'd',
    hour: 'h',
    minute: 'min',
    second: 's',
    milisecond: 'ms',
  };

  constructor(date?: Date | string | number) {
    if (date) {
      this.#date = new Date(date);
    } else {
      this.#date = new Date();
    }
  }

  add({
    year,
    month,
    week,
    day,
    hour,
    minute,
    second,
    milisecond,
  }: Partial<Structure>) {
    this.#date = new Date(
      this.#date.getTime() +
        (year || 0) * (this.#structure.year || 0) +
        (month || 0) * (this.#structure.month || 0) +
        (week || 0) * (this.#structure.week || 0) +
        (day || 0) * (this.#structure.day || 0) +
        (hour || 0) * (this.#structure.hour || 0) +
        (minute || 0) * (this.#structure.minute || 0) +
        (second || 0) * (this.#structure.second || 0) +
        (milisecond || 0) * (this.#structure.milisecond || 0)
    );

    console.log(this.#date);
    return this;
  }

  format(format?: string) {
    // TODO: implement
  }

  timeAgo(
    ...args: [] | [exclude?: Exclude[]] | [date: DateTime, exclude: Exclude[]]
  ) {
    const exclude = args[0] instanceof Array ? args[0] : args[1] || [];
    const result: Structure = {};

    const dateToUse =
      args[0] instanceof DateTime ? args[0].toMiliseconds() : +this.#date;

    let date = Math.round(Math.abs(Math.floor(dateToUse - +new Date())));

    Object.keys(this.#structure)
      .filter((key) => exclude.indexOf(key as Exclude) === -1)
      .forEach((key) => {
        result[key] = Math.floor(date / this.#structure[key]);
        date -= result[key] * this.#structure[key];
      });

    return result;
  }

  formatTimeAgo(
    ...args: [] | [exclude?: Exclude[]] | [date: DateTime, exclude: Exclude[]]
  ) {
    const destructure = this.timeAgo(...args);

    let format = '';

    Object.keys(destructure).forEach((key) => {
      if (destructure[key] > 0) {
        format += `${destructure[key]}${this.#acronim[key]} `;
      }
    });

    const sufix = this.#date < new Date() ? ' ago' : '';

    return format.trim() ? `${format.trim()}${sufix}` : '0';
  }

  toMiliseconds() {
    return +this.#date;
  }

  toString() {
    return this.#date.toString();
  }

  toJson() {
    return this.#date.toJSON();
  }
}
