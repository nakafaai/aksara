import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "sriwijaya-stones",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "prasasti perlu dibaca dengan menyadari sudut pandang pembuatnya",
        },
        {
          correct: false,
          label:
            "prasasti Sriwijaya tidak dapat dipercaya sama sekali sebagai sumber sejarah",
        },
        {
          correct: false,
          label:
            "rakyat Sriwijaya dilarang menulis apa pun tentang kehidupan mereka",
        },
        {
          correct: false,
          label:
            "catatan I-Tsing lebih lengkap daripada semua prasasti yang ditemukan",
        },
        {
          correct: false,
          label:
            "raja Sriwijaya tidak pandai menulis sehingga prasastinya singkat",
        },
      ],
    },
  },
};

export default item;
