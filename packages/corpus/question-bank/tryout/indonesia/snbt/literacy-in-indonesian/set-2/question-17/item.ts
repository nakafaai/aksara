import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "rice-irrigation",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pengairan berselang selalu meningkatkan hasil gabah pada musim apa pun.",
        },
        {
          correct: false,
          label:
            "Pengairan berselang mengurangi kebutuhan tenaga kerja petani.",
        },
        {
          correct: false,
          label:
            "Penggenangan terus-menerus menghasilkan lebih banyak gabah daripada pengairan berselang.",
        },
        {
          correct: true,
          label:
            "Pada musim kemarau di desa itu, pengairan berselang menghemat air tanpa menurunkan hasil, tetapi menambah kebutuhan tenaga penyiangan.",
        },
        {
          correct: false,
          label:
            "Uji coba ini membuktikan bahwa semua desa di lereng Gunung Lawu sebaiknya beralih ke pengairan berselang.",
        },
      ],
    },
  },
};

export default item;
