import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kedua indikator ekonomi tersebut meningkat.",
        },
        {
          isCorrect: true,
          label:
            "Kemiskinan desa dan ketimpangan desa-kota akan sama-sama meningkat.",
        },
        {
          isCorrect: false,
          label: "Hanya upah riil buruh tani yang tidak meningkat.",
        },
        {
          isCorrect: false,
          label:
            "Kemiskinan desa dan ketimpangan desa-kota akan sama-sama menurun.",
        },
        {
          isCorrect: false,
          label:
            "Model tersebut tidak memberikan simpulan tentang kemiskinan atau ketimpangan.",
        },
      ],
    },
  },
};

export default item;
