import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Beide Wirtschaftsindikatoren sind gestiegen.",
        },
        {
          isCorrect: false,
          label:
            "Nur der Reallohn der landwirtschaftlichen Arbeitskräfte ist nicht gestiegen.",
        },
        {
          isCorrect: false,
          label:
            "Die Armut in den Dörfern und die Ungleichheit zwischen Land und Stadt werden beide abnehmen.",
        },
        {
          isCorrect: false,
          label:
            "Das Modell erlaubt keine Schlussfolgerung über Armut oder Ungleichheit.",
        },
        {
          isCorrect: true,
          label:
            "Die Armut in den Dörfern und die Ungleichheit zwischen Land und Stadt werden beide zunehmen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Both economic indicators increased." },
        {
          isCorrect: false,
          label: "Only the real wage of farmworkers failed to increase.",
        },
        {
          isCorrect: false,
          label:
            "Village poverty and rural-urban inequality will both decrease.",
        },
        {
          isCorrect: false,
          label:
            "The model provides no conclusion about poverty or inequality.",
        },
        {
          isCorrect: true,
          label:
            "Village poverty and rural-urban inequality will both increase.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kedua indikator ekonomi tersebut meningkat.",
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
        {
          isCorrect: true,
          label:
            "Kemiskinan desa dan ketimpangan desa-kota akan sama-sama meningkat.",
        },
      ],
    },
  },
};

export default item;
