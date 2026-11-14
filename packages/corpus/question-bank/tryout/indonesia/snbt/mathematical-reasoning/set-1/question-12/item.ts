import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "drug-dose",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "paling sedikit $$40\\text{ kg}$$" },
        { correct: false, label: "paling sedikit $$37{,}5\\text{ kg}$$" },
        {
          correct: false,
          label: "paling sedikit $$40\\text{ kg}$$, tetapi kurang dari $$45\\text{ kg}$$",
        },
        { correct: false, label: "tepat $$40\\text{ kg}$$" },
        { correct: false, label: "tepat $$57{,}5\\text{ kg}$$" },
      ],
    },
  },
};

export default item;
