import { HashMap } from "@/types/misc.type";
import { get } from "lodash";

const dollarFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
  maximumSignificantDigits: 10,
});

class MiscUtils {
  public static async readAsDataURL(file: Blob): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        const url = fileReader.result;
        if (!url) return reject("Cannot read as data URL");
        resolve(url);
      });
      fileReader.addEventListener("error", () => reject(fileReader.error?.message));
      fileReader.readAsDataURL(file);
    });
  }

  public static getUNIXTimestamp(date: Date) {
    return parseInt((date.getTime() / 1000).toFixed(0));
  }

  public static getRandomNumberBetween(min: number, max: number) {
    // find diff
    const difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor(rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
  }

  public static sleep(milliseconds: number) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(undefined), milliseconds);
    });
  }

  public static getPropertyByDotStrings(obj: { [key: string]: any }, propString: string) {
    if (!propString) return obj;

    let prop;
    const props = propString.split(".");

    // eslint-disable-next-line no-var
    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
      prop = props[i];

      const candidate = obj[prop];
      if (candidate !== undefined) {
        obj = candidate;
      } else {
        break;
      }
    }
    return obj[props[i]];
  }

  public static capitalize(sentence?: string) {
    if (!sentence) return "";
    const allWords = sentence.toLowerCase().split(" ");

    for (let i = 0; i < allWords.length; i++) {
      allWords[i] = allWords[i].charAt(0).toUpperCase() + allWords[i].slice(1);
    }

    return allWords.join(" ");
  }

  public static ArrayToHashMap<T>(arr: T[], key: string) {
    return arr.reduce((map, element) => ({ ...map, [get(element, key) as string]: element }), {}) as HashMap<T>;
  }

  public static format(value: number | string) {
    return dollarFormatter.format(Number(value));
  }
}

export default MiscUtils;
