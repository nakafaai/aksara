import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "jumlah pendengar radio terus menurun",
        },
        {
          isCorrect: false,
          label: "beberapa kaset berjamur",
        },
        {
          isCorrect: false,
          label: "telepon studio biasanya diam",
        },
        {
          isCorrect: true,
          label:
            "ia menerima keputusan dan meminta satu jam untuk acara perpisahan",
        },
        {
          isCorrect: false,
          label: "lampu mengudara padam pukul lima",
        },
      ],
    },
  },
  stimulusKey: "last-broadcast",
};

export default item;
