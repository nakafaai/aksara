import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "word-choice",
  },
  stimulus: "kenikir",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "mengganti kata *memusnahkan* dengan *mengurangi*",
        },
        {
          correct: false,
          label: "mengganti kata *memusnahkan* dengan *membasmi*",
        },
        {
          correct: false,
          label: "mengganti kata *memusnahkan* dengan *mengusir*",
        },
        {
          correct: false,
          label: "mengganti kata *menunjukkan* dengan *membuktikan*",
        },
        {
          correct: false,
          label:
            "mengganti frasa *bedeng yang dikelilingi kenikir* dengan *seluruh bedeng cabai*",
        },
      ],
    },
  },
};

export default item;
