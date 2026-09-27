import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "memberi undangan yang sama tanpa menyesuaikan hambatan peserta",
        },
        {
          isCorrect: true,
          label:
            "membuka kesempatan nyata bagi kelompok dengan kebutuhan dan hambatan yang berbeda",
        },
        {
          isCorrect: false,
          label: "menerima setiap usulan agar tidak ada kelompok yang kecewa",
        },
        {
          isCorrect: false,
          label:
            "menyerahkan keputusan sepenuhnya kepada kelompok yang hadir paling banyak",
        },
        {
          isCorrect: false,
          label: "mengukur keterlibatan hanya dari jumlah orang yang datang",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
