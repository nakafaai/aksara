import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "class-size",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$20$$ guru, sehingga kebutuhan itu baru terpenuhi pada tahun ketiga",
        },
        {
          correct: false,
          label:
            "$$12$$ guru, sehingga kebutuhan itu sudah terpenuhi pada tahun kedua",
        },
        {
          correct: false,
          label:
            "$$40$$ guru, sehingga kebutuhan itu baru terpenuhi pada tahun kelima",
        },
        {
          correct: false,
          label:
            "$$20$$ guru, sehingga kebutuhan itu sudah terpenuhi pada tahun kedua",
        },
        {
          correct: false,
          label:
            "$$60$$ guru, sehingga kebutuhan itu baru terpenuhi pada tahun kedelapan",
        },
      ],
    },
  },
};

export default item;
