import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$90\\text{ kg}$$ of glucose, atom economy $$51.1\\%$$",
        },
        {
          correct: false,
          label: "$$225\\text{ kg}$$ of glucose, atom economy $$51.1\\%$$",
        },
        {
          correct: false,
          label: "$$112.5\\text{ kg}$$ of glucose, atom economy $$100\\%$$",
        },
        {
          correct: true,
          label: "$$112.5\\text{ kg}$$ of glucose, atom economy $$51.1\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$90\\text{ kg}$$ glukosa, ekonomi atom $$51.1\\%$$",
        },
        {
          correct: false,
          label: "$$225\\text{ kg}$$ glukosa, ekonomi atom $$51.1\\%$$",
        },
        {
          correct: false,
          label: "$$112.5\\text{ kg}$$ glukosa, ekonomi atom $$100\\%$$",
        },
        {
          correct: true,
          label: "$$112.5\\text{ kg}$$ glukosa, ekonomi atom $$51.1\\%$$",
        },
      ],
    },
  },
};

export default item;
