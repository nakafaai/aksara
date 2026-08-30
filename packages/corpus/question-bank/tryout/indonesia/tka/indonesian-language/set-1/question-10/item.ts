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
          label: "marah karena Raka menerima lampu baru",
        },
        {
          isCorrect: true,
          label: "lega karena kenangan Raka memperoleh makna baru",
        },
        {
          isCorrect: false,
          label: "bosan karena tidak ada perubahan dalam diri Raka",
        },
        {
          isCorrect: false,
          label: "takut karena seluruh warga meninggalkan kampung",
        },
        {
          isCorrect: false,
          label: "kecewa karena perahu ayah Raka kembali",
        },
      ],
    },
  },
  stimulusKey: "harbor-lamp",
};

export default item;
