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
            "Carbon dioxide $$220\\text{ kJ}$$, silicon dioxide $$186\\text{ kJ}$$",
        },
        {
          correct: false,
          label:
            "Carbon dioxide $$0\\text{ kJ}$$, silicon dioxide $$93.2\\text{ kJ}$$",
        },
        {
          correct: true,
          label:
            "Carbon dioxide $$0\\text{ kJ}$$, silicon dioxide $$186\\text{ kJ}$$",
        },
        {
          correct: false,
          label:
            "Carbon dioxide $$0\\text{ kJ}$$, silicon dioxide $$373\\text{ kJ}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Karbon dioksida $$220\\text{ kJ}$$, silikon dioksida $$186\\text{ kJ}$$",
        },
        {
          correct: false,
          label:
            "Karbon dioksida $$0\\text{ kJ}$$, silikon dioksida $$93.2\\text{ kJ}$$",
        },
        {
          correct: true,
          label:
            "Karbon dioksida $$0\\text{ kJ}$$, silikon dioksida $$186\\text{ kJ}$$",
        },
        {
          correct: false,
          label:
            "Karbon dioksida $$0\\text{ kJ}$$, silikon dioksida $$373\\text{ kJ}$$",
        },
      ],
    },
  },
};

export default item;
