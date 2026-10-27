import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Masyarakat pesisir memperoleh manfaat dari hutan mangrove yang sehat disebabkan hutan tersebut mengurangi energi gelombang dan menyediakan daerah asuhan bagi ikan serta krustasea.",
        },
        {
          correct: false,
          label:
            "Masyarakat pesisir memperoleh manfaat dari hutan mangrove yang sehat yang hutan tersebut mengurangi energi gelombang dan menyediakan daerah asuhan bagi ikan serta krustasea.",
        },
        {
          correct: false,
          label:
            "Masyarakat pesisir memperoleh manfaat dari hutan mangrove yang sehat jika hutan tersebut mengurangi energi gelombang dan menyediakan daerah asuhan bagi ikan serta krustasea.",
        },
        {
          correct: true,
          label:
            "Masyarakat pesisir memperoleh manfaat dari hutan mangrove yang sehat karena hutan tersebut mengurangi energi gelombang dan menyediakan daerah asuhan bagi ikan serta krustasea.",
        },
        {
          correct: false,
          label:
            "Masyarakat pesisir memperoleh manfaat dari hutan mangrove yang sehat, tetapi hutan tersebut mengurangi energi gelombang dan menyediakan daerah asuhan bagi ikan serta krustasea.",
        },
      ],
    },
  },
};

export default item;
