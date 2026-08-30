import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Eine einzelne Gewichtsmessung beweist, dass ein Kind vollständig gesund ist.",
        },
        {
          isCorrect: true,
          label:
            "Das Wachstum eines Kindes wird anhand mehrerer altersgerechter Messwerte und ihrer Entwicklung über längere Zeit beurteilt.",
        },
        {
          isCorrect: false,
          label:
            "Der Kopfumfang allein bestimmt in jedem Alter den Ernährungszustand eines Kindes.",
        },
        {
          isCorrect: false,
          label:
            "Jede Zunahme von Gewicht oder Körpergröße bedeutet automatisch, dass das Wachstum altersgerecht ist.",
        },
        {
          isCorrect: false,
          label:
            "Wachstumskurven ersetzen jede weitere fachliche Beurteilung der Gesundheit eines Kindes.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "A single weight measurement is enough to prove that a child is completely healthy.",
        },
        {
          isCorrect: true,
          label:
            "Child growth is assessed with several age-appropriate measurements and their pattern over time.",
        },
        {
          isCorrect: false,
          label:
            "Head circumference alone determines a child's nutritional status at every age.",
        },
        {
          isCorrect: false,
          label:
            "Any increase in weight or height automatically means that growth is appropriate.",
        },
        {
          isCorrect: false,
          label:
            "Growth charts replace all other professional assessment of a child's health.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Satu kali pengukuran berat badan cukup untuk membuktikan bahwa seorang anak sepenuhnya sehat.",
        },
        {
          isCorrect: true,
          label:
            "Pertumbuhan anak dinilai melalui beberapa pengukuran yang sesuai dengan umur serta polanya dari waktu ke waktu.",
        },
        {
          isCorrect: false,
          label:
            "Lingkar kepala saja menentukan status gizi anak pada semua kelompok umur.",
        },
        {
          isCorrect: false,
          label:
            "Setiap kenaikan berat atau tinggi badan otomatis berarti pertumbuhan anak sudah sesuai.",
        },
        {
          isCorrect: false,
          label:
            "Kurva pertumbuhan menggantikan seluruh penilaian profesional lain terhadap kesehatan anak.",
        },
      ],
    },
  },
};

export default item;
