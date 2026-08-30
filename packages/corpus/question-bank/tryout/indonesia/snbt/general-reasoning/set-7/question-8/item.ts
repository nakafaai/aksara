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
              text: "Sie ist zwingend wahr, weil die grünen Flächen abnahmen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sie ist wahrscheinlich wahr, weil die Landoberflächentemperatur zunahm.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sie ist mit Sicherheit falsch, weil das Projekt keine Überschwemmungsdaten erfasste.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Sie wird von den Angaben nicht gestützt, weil sie eine weder gemessene noch durch eine Regel verknüpfte Folge einführt.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sie wird gestützt, weil Schwebstaub und Überschwemmungen gleichwertige Folgen sind.",
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
            {
              kind: "text",
              text: "It is necessarily true because green land cover decreased.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "It is probably true because land surface temperature increased.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "It is definitely false because the project recorded no flooding data.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "It is not supported by the information because it introduces an outcome that was neither measured nor linked by a stated rule.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "It is supported because airborne particles and flooding are equivalent outcomes.",
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
              text: "Simpulan itu pasti benar karena tutupan lahan hijau berkurang.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Simpulan itu mungkin benar karena suhu permukaan lahan meningkat.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Simpulan itu pasti salah karena proyek tidak mencatat data banjir.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Simpulan itu tidak didukung oleh informasi karena memperkenalkan hasil yang tidak diukur dan tidak dihubungkan oleh aturan apa pun.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Simpulan itu didukung karena partikel di udara dan banjir merupakan hasil yang setara.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
