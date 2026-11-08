import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "salt-field",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Putus asa dan berniat meninggalkan ladang garamnya.",
        },
        {
          correct: false,
          label: "Marah kepada hujan yang merusak hasil kerjanya.",
        },
        {
          correct: false,
          label: "Tidak peduli pada kerugian yang dialami keluarganya.",
        },
        {
          correct: false,
          label: "Gembira karena hujan membuat tanahnya menjadi subur.",
        },
        {
          correct: true,
          label:
            "Sabar menerima keadaan dan memilih menunggu musim berikutnya.",
        },
      ],
    },
  },
};

export default item;
