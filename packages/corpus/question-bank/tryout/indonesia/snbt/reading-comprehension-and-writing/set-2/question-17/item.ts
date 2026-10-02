import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Masyarakat pesisir memperoleh manfaat dari hutan mangrove yang sehat disebabkan hutan tersebut mengurangi energi gelombang dan menyediakan daerah asuhan bagi ikan serta krustasea.",
        },
        {
          isCorrect: false,
          label:
            "Masyarakat pesisir memperoleh manfaat dari hutan mangrove yang sehat yang hutan tersebut mengurangi energi gelombang dan menyediakan daerah asuhan bagi ikan serta krustasea.",
        },
        {
          isCorrect: false,
          label:
            "Masyarakat pesisir memperoleh manfaat dari hutan mangrove yang sehat jika hutan tersebut mengurangi energi gelombang dan menyediakan daerah asuhan bagi ikan serta krustasea.",
        },
        {
          isCorrect: true,
          label:
            "Masyarakat pesisir memperoleh manfaat dari hutan mangrove yang sehat karena hutan tersebut mengurangi energi gelombang dan menyediakan daerah asuhan bagi ikan serta krustasea.",
        },
        {
          isCorrect: false,
          label:
            "Masyarakat pesisir memperoleh manfaat dari hutan mangrove yang sehat, tetapi hutan tersebut mengurangi energi gelombang dan menyediakan daerah asuhan bagi ikan serta krustasea.",
        },
      ],
    },
  },
};

export default item;
