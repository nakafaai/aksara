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
              text: "Eine einzelne Gewichtsmessung beweist, dass ein Kind vollständig gesund ist.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Kopfumfang allein bestimmt in jedem Alter den Ernährungszustand eines Kindes.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jede Zunahme von Gewicht oder Körpergröße bedeutet automatisch, dass das Wachstum altersgerecht ist.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Das Wachstum eines Kindes wird anhand mehrerer altersgerechter Messwerte und ihrer Entwicklung über längere Zeit beurteilt.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Wachstumskurven ersetzen jede weitere fachliche Beurteilung der Gesundheit eines Kindes.",
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
              text: "A single weight measurement is enough to prove that a child is completely healthy.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Head circumference alone determines a child's nutritional status at every age.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Any increase in weight or height automatically means that growth is appropriate.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Child growth is assessed with several age-appropriate measurements and their pattern over time.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Growth charts replace all other professional assessment of a child's health.",
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
              text: "Satu kali pengukuran berat badan cukup untuk membuktikan bahwa seorang anak sepenuhnya sehat.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Lingkar kepala saja menentukan status gizi anak pada semua kelompok umur.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Setiap kenaikan berat atau tinggi badan otomatis berarti pertumbuhan anak sudah sesuai.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Pertumbuhan anak dinilai melalui beberapa pengukuran yang sesuai dengan umur serta polanya dari waktu ke waktu.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kurva pertumbuhan menggantikan seluruh penilaian profesional lain terhadap kesehatan anak.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
