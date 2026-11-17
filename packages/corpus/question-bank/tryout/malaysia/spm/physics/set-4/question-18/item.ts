import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$2.6\\text{ mm}$$ farther out, at least $$3.6\\text{ m}$$ away, with the lens then $$50.7\\text{ mm}$$ from the sensor",
        },
        {
          correct: false,
          label:
            "$$2.6\\text{ mm}$$ farther out, at least $$3.5\\text{ m}$$ away, with the lens then $$50.0\\text{ mm}$$ from the sensor",
        },
        {
          correct: false,
          label:
            "$$2.6\\text{ mm}$$ closer in, at least $$3.6\\text{ m}$$ away, with the lens then $$49.3\\text{ mm}$$ from the sensor",
        },
        {
          correct: false,
          label:
            "$$2.6\\text{ mm}$$ farther out, at least $$71\\text{ m}$$ away, with the lens then $$52.6\\text{ mm}$$ from the sensor",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$2.6\\text{ mm}$$ lebih jauh keluar, sekurang-kurangnya $$3.6\\text{ m}$$ jauhnya, dengan kanta kemudian $$50.7\\text{ mm}$$ dari penderia",
        },
        {
          correct: false,
          label:
            "$$2.6\\text{ mm}$$ lebih jauh keluar, sekurang-kurangnya $$3.5\\text{ m}$$ jauhnya, dengan kanta kemudian $$50.0\\text{ mm}$$ dari penderia",
        },
        {
          correct: false,
          label:
            "$$2.6\\text{ mm}$$ lebih dekat ke dalam, sekurang-kurangnya $$3.6\\text{ m}$$ jauhnya, dengan kanta kemudian $$49.3\\text{ mm}$$ dari penderia",
        },
        {
          correct: false,
          label:
            "$$2.6\\text{ mm}$$ lebih jauh keluar, sekurang-kurangnya $$71\\text{ m}$$ jauhnya, dengan kanta kemudian $$52.6\\text{ mm}$$ dari penderia",
        },
      ],
    },
  },
};

export default item;
