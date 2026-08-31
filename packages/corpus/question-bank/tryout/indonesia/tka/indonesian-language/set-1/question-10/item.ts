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
          isCorrect: false,
          label: "datar karena perubahan fungsi lampu hanya bersifat praktis",
        },
        {
          isCorrect: false,
          label:
            "cemas karena keterlibatan warga dapat menggeser makna pribadi kenangan Raka",
        },
        {
          isCorrect: false,
          label: "kecewa karena perahu ayah Raka kembali",
        },
        {
          isCorrect: true,
          label: "lega karena kenangan Raka memperoleh makna baru",
        },
      ],
    },
  },
  stimulusKey: "harbor-lamp",
};

export default item;
