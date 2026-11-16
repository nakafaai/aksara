import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Carbon dioxide $$0.27\\text{ mol}$$, silicon dioxide $$0.40\\text{ mol}$$",
        },
        {
          correct: false,
          label:
            "Carbon dioxide $$0\\text{ mol}$$, silicon dioxide $$0.20\\text{ mol}$$",
        },
        {
          correct: true,
          label:
            "Carbon dioxide $$0\\text{ mol}$$, silicon dioxide $$0.40\\text{ mol}$$",
        },
        {
          correct: false,
          label:
            "Carbon dioxide $$0\\text{ mol}$$, silicon dioxide $$0.10\\text{ mol}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Karbon dioksida $$0.27\\text{ mol}$$, silikon dioksida $$0.40\\text{ mol}$$",
        },
        {
          correct: false,
          label:
            "Karbon dioksida $$0\\text{ mol}$$, silikon dioksida $$0.20\\text{ mol}$$",
        },
        {
          correct: true,
          label:
            "Karbon dioksida $$0\\text{ mol}$$, silikon dioksida $$0.40\\text{ mol}$$",
        },
        {
          correct: false,
          label:
            "Karbon dioksida $$0\\text{ mol}$$, silikon dioksida $$0.10\\text{ mol}$$",
        },
      ],
    },
  },
};

export default item;
