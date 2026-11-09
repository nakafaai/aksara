import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "salt-house",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kata _Namun_ dihilangkan",
        },
        {
          correct: true,
          label: "frasa _saling bantu-membantu_ diganti _saling membantu_",
        },
        {
          correct: false,
          label: "kata _cukup_ diganti _sangat_",
        },
        {
          correct: false,
          label: "kata _melalui_ diganti _dengan_",
        },
        {
          correct: false,
          label: "kata _modal_ diganti _uang modal_",
        },
      ],
    },
  },
};

export default item;
