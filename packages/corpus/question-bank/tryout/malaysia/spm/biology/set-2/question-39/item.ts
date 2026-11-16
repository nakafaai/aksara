import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "transport-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "After about $$0.9$$ hour" },
        { correct: false, label: "After $$1.5$$ hours" },
        { correct: true, label: "After $$2$$ hours" },
        { correct: false, label: "Never, because the roots keep absorbing water" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Selepas kira-kira $$0.9$$ jam" },
        { correct: false, label: "Selepas $$1.5$$ jam" },
        { correct: true, label: "Selepas $$2$$ jam" },
        { correct: false, label: "Tidak akan layu, kerana akar terus menyerap air" },
      ],
    },
  },
};

export default item;
