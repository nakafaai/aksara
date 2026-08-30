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
              text: "Das Überlauftor öffnet sich auf jeden Fall automatisch.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die westlichen Beete bleiben auf jeden Fall trocken.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Auf keinem Weg kann Wasser zu den westlichen Beeten gelangen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die westlichen Beete können nicht grün werden.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Ob die westlichen Beete Wasser erhalten, lässt sich nicht ableiten.",
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
              text: "The overflow gate definitely opens automatically.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The western beds definitely remain dry." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "No water can reach the western beds." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The western beds cannot become green." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "It cannot be concluded whether the western beds receive water.",
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
              text: "Pintu pelimpah pasti terbuka secara otomatis.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Petak tanaman bagian barat pasti tetap kering.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tidak ada air yang dapat mencapai petak tanaman bagian barat.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Petak tanaman bagian barat tidak mungkin menghijau.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Tidak dapat disimpulkan apakah petak tanaman bagian barat menerima air.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
