import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Das Überlauftor öffnet sich auf jeden Fall automatisch.",
        },
        {
          isCorrect: false,
          label: "Die westlichen Beete bleiben auf jeden Fall trocken.",
        },
        {
          isCorrect: false,
          label:
            "Auf keinem Weg kann Wasser zu den westlichen Beeten gelangen.",
        },
        {
          isCorrect: false,
          label: "Die westlichen Beete können nicht grün werden.",
        },
        {
          isCorrect: true,
          label:
            "Ob die westlichen Beete Wasser erhalten, lässt sich nicht ableiten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The overflow gate definitely opens automatically.",
        },
        {
          isCorrect: false,
          label: "The western beds definitely remain dry.",
        },
        {
          isCorrect: false,
          label: "No water can reach the western beds.",
        },
        {
          isCorrect: false,
          label: "The western beds cannot become green.",
        },
        {
          isCorrect: true,
          label:
            "It cannot be concluded whether the western beds receive water.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Pintu pelimpah pasti terbuka secara otomatis.",
        },
        {
          isCorrect: false,
          label: "Petak tanaman bagian barat pasti tetap kering.",
        },
        {
          isCorrect: false,
          label:
            "Tidak ada air yang dapat mencapai petak tanaman bagian barat.",
        },
        {
          isCorrect: false,
          label: "Petak tanaman bagian barat tidak mungkin menghijau.",
        },
        {
          isCorrect: true,
          label:
            "Tidak dapat disimpulkan apakah petak tanaman bagian barat menerima air.",
        },
      ],
    },
  },
};

export default item;
