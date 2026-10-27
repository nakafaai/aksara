import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kedua indikator ekonomi tersebut meningkat.",
        },
        {
          correct: true,
          label:
            "Kemiskinan desa dan ketimpangan desa-kota akan sama-sama meningkat.",
        },
        {
          correct: false,
          label: "Hanya upah riil buruh tani yang tidak meningkat.",
        },
        {
          correct: false,
          label:
            "Kemiskinan desa dan ketimpangan desa-kota akan sama-sama menurun.",
        },
        {
          correct: false,
          label:
            "Model tersebut tidak memberikan simpulan tentang kemiskinan atau ketimpangan.",
        },
      ],
    },
  },
};

export default item;
