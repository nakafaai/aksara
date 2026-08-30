import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "marah karena Ayu mengambil partitur Rafi",
        },
        {
          isCorrect: true,
          label:
            "hangat karena keduanya saling memahami bentuk dukungan yang tidak diucapkan",
        },
        {
          isCorrect: false,
          label: "takut karena konser dihentikan",
        },
        {
          isCorrect: false,
          label: "kecewa karena klarinet rusak",
        },
        {
          isCorrect: false,
          label: "bingung karena orkes tidak membungkuk",
        },
      ],
    },
  },
  stimulusKey: "empty-measure",
};

export default item;
