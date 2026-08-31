import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "menjual layangan kepada juri",
        },
        {
          isCorrect: true,
          label: "menguji apakah perbaikan bekerja dalam angin nyata",
        },
        {
          isCorrect: false,
          label: "menyembunyikan bilah bambu",
        },
        {
          isCorrect: false,
          label: "mengganti lomba dengan pertunjukan musik",
        },
        {
          isCorrect: false,
          label:
            "menunjukkan bahwa kertas baru merupakan faktor utama keberhasilan perbaikan",
        },
      ],
    },
  },
  stimulusKey: "kite-frame",
};

export default item;
