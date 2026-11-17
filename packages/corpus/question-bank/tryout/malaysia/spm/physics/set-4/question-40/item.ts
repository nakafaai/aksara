import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "quantum-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.0\\text{ eV}$$ and $$33\\text{ mA}$$, then $$4.0\\text{ eV}$$ and $$17\\text{ mA}$$",
        },
        {
          correct: false,
          label:
            "$$1.0\\text{ eV}$$ and $$3.3\\text{ mA}$$, then $$4.0\\text{ eV}$$ and $$3.3\\text{ mA}$$",
        },
        {
          correct: false,
          label:
            "$$1.0\\text{ eV}$$ and $$3.3\\text{ mA}$$, then $$2.0\\text{ eV}$$ and $$6.7\\text{ mA}$$",
        },
        {
          correct: true,
          label:
            "$$1.0\\text{ eV}$$ and $$3.3\\text{ mA}$$, then $$4.0\\text{ eV}$$ and $$1.7\\text{ mA}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.0\\text{ eV}$$ dan $$33\\text{ mA}$$, kemudian $$4.0\\text{ eV}$$ dan $$17\\text{ mA}$$",
        },
        {
          correct: false,
          label:
            "$$1.0\\text{ eV}$$ dan $$3.3\\text{ mA}$$, kemudian $$4.0\\text{ eV}$$ dan $$3.3\\text{ mA}$$",
        },
        {
          correct: false,
          label:
            "$$1.0\\text{ eV}$$ dan $$3.3\\text{ mA}$$, kemudian $$2.0\\text{ eV}$$ dan $$6.7\\text{ mA}$$",
        },
        {
          correct: true,
          label:
            "$$1.0\\text{ eV}$$ dan $$3.3\\text{ mA}$$, kemudian $$4.0\\text{ eV}$$ dan $$1.7\\text{ mA}$$",
        },
      ],
    },
  },
};

export default item;
