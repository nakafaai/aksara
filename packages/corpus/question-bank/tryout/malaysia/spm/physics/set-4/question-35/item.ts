import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$4.0\\text{ k}\\Omega$$ with the thermistor at the bottom, $$60^\\circ\\text{C}$$, and a $$1.7\\text{ V}$$ threshold",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ k}\\Omega$$ with the thermistor at the top, $$60^\\circ\\text{C}$$, and a $$1.7\\text{ V}$$ threshold",
        },
        {
          correct: true,
          label:
            "$$4.0\\text{ k}\\Omega$$ with the thermistor at the top, $$30^\\circ\\text{C}$$, and a $$3.3\\text{ V}$$ threshold",
        },
        {
          correct: false,
          label:
            "$$10\\text{ k}\\Omega$$ with the thermistor at the top, $$30^\\circ\\text{C}$$, and a $$2.5\\text{ V}$$ threshold",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$4.0\\text{ k}\\Omega$$ dengan termistor di bawah, $$60^\\circ\\text{C}$$, dan ambang $$1.7\\text{ V}$$",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ k}\\Omega$$ dengan termistor di atas, $$60^\\circ\\text{C}$$, dan ambang $$1.7\\text{ V}$$",
        },
        {
          correct: true,
          label:
            "$$4.0\\text{ k}\\Omega$$ dengan termistor di atas, $$30^\\circ\\text{C}$$, dan ambang $$3.3\\text{ V}$$",
        },
        {
          correct: false,
          label:
            "$$10\\text{ k}\\Omega$$ dengan termistor di atas, $$30^\\circ\\text{C}$$, dan ambang $$2.5\\text{ V}$$",
        },
      ],
    },
  },
};

export default item;
