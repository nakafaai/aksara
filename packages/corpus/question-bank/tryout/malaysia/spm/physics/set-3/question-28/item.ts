import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.0\\text{ V}$$ with either voltmeter, and any voltmeter will do",
        },
        {
          correct: true,
          label:
            "$$4.0\\text{ V}$$, about $$6.0\\text{ V}$$ with the $$1\\text{ M}\\Omega$$ voltmeter, and at least $$0.50\\text{ M}\\Omega$$",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ V}$$, about $$6.0\\text{ V}$$ with the $$1\\text{ M}\\Omega$$ voltmeter, and at least $$1.0\\text{ M}\\Omega$$",
        },
        {
          correct: false,
          label:
            "$$8.0\\text{ V}$$, about $$6.0\\text{ V}$$ with the $$1\\text{ M}\\Omega$$ voltmeter, and at least $$0.50\\text{ M}\\Omega$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.0\\text{ V}$$ dengan mana-mana voltmeter, dan sebarang voltmeter boleh digunakan",
        },
        {
          correct: true,
          label:
            "$$4.0\\text{ V}$$, kira-kira $$6.0\\text{ V}$$ dengan voltmeter $$1\\text{ M}\\Omega$$, dan sekurang-kurangnya $$0.50\\text{ M}\\Omega$$",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ V}$$, kira-kira $$6.0\\text{ V}$$ dengan voltmeter $$1\\text{ M}\\Omega$$, dan sekurang-kurangnya $$1.0\\text{ M}\\Omega$$",
        },
        {
          correct: false,
          label:
            "$$8.0\\text{ V}$$, kira-kira $$6.0\\text{ V}$$ dengan voltmeter $$1\\text{ M}\\Omega$$, dan sekurang-kurangnya $$0.50\\text{ M}\\Omega$$",
        },
      ],
    },
  },
};

export default item;
