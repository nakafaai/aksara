import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Beide Wirtschaftsindikatoren sind gestiegen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Nur der Reallohn der landwirtschaftlichen Arbeitskräfte ist nicht gestiegen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Armut in den Dörfern und die Ungleichheit zwischen Land und Stadt werden beide abnehmen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Das Modell erlaubt keine Schlussfolgerung über Armut oder Ungleichheit.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Die Armut in den Dörfern und die Ungleichheit zwischen Land und Stadt werden beide zunehmen.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Both economic indicators increased." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Only the real wage of farmworkers failed to increase.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Village poverty and rural-urban inequality will both decrease.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The model provides no conclusion about poverty or inequality.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Village poverty and rural-urban inequality will both increase.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kedua indikator ekonomi tersebut meningkat.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Hanya upah riil buruh tani yang tidak meningkat.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kemiskinan desa dan ketimpangan desa-kota akan sama-sama menurun.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Model tersebut tidak memberikan simpulan tentang kemiskinan atau ketimpangan.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Kemiskinan desa dan ketimpangan desa-kota akan sama-sama meningkat.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
