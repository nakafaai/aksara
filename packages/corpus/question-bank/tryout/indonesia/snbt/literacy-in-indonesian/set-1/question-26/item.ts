import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "bystander-effect",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kehadiran orang lain menurunkan kesediaan tiap orang menolong, sehingga korban di tempat ramai lebih jarang ditolong siapa pun.",
        },
        {
          correct: false,
          label:
            "Efek penonton hanyalah mitos dari pemberitaan yang keliru, sehingga kehadiran orang lain tidak memengaruhi kesediaan menolong.",
        },
        {
          correct: true,
          label:
            "Kehadiran orang lain dapat menurunkan kesediaan tiap orang menolong, tetapi korban di tempat ramai belum tentu jarang ditolong.",
        },
        {
          correct: false,
          label:
            "Kehadiran orang lain dapat menurunkan kesediaan tiap orang menolong, tetapi efek itu hanya terjadi di ruang laboratorium saja.",
        },
        {
          correct: false,
          label:
            "Efek penonton selalu melemah di tempat ramai, sehingga makin banyak orang, makin besar kesediaan tiap orang menolong.",
        },
      ],
    },
  },
};

export default item;
