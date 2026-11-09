import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "boat-race",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kecewa karena anaknya kalah, tetapi berusaha menahan marah",
        },
        {
          correct: false,
          label:
            "tidak peduli karena terlalu sibuk menyulam jaring dan menjahit layar",
        },
        {
          correct: false,
          label: "bangga dan memuji Ilham dengan keras di depan para penonton",
        },
        {
          correct: true,
          label:
            "menyetujuinya tanpa banyak kata, lalu menunjukkannya lewat tindakan",
        },
        {
          correct: false,
          label: "menyesal karena telah meminjamkan perahunya kepada Ilham",
        },
      ],
    },
  },
};

export default item;
