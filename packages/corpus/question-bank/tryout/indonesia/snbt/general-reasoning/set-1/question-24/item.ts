import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Jede tropische Fischpopulation wandert polwärts",
        },
        {
          isCorrect: false,
          label:
            "Die Beobachtung eines einzelnen polwärts wandernden Fisches reicht als Beweis für die Erwärmung des Ozeans aus",
        },
        {
          isCorrect: false,
          label:
            "Der Klimawandel beeinflusst die Produktivität der Fischerei in jeder Region gleich",
        },
        {
          isCorrect: true,
          label:
            "Die Erwärmung hat die Verbreitungsgebiete vieler Meeresarten polwärts verschoben",
        },
        {
          isCorrect: false,
          label:
            "Für tropische und subtropische Fischereien werden größere Produktivitätsgewinne erwartet als für polnähere Regionen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Every tropical fish population moves toward the poles",
        },
        {
          isCorrect: false,
          label:
            "Observing one fish move toward a pole is enough to prove ocean warming",
        },
        {
          isCorrect: false,
          label:
            "Climate change affects fisheries productivity equally in every region",
        },
        {
          isCorrect: true,
          label:
            "Warming has shifted the distributions of many marine species toward the poles",
        },
        {
          isCorrect: false,
          label:
            "Tropical and subtropical fisheries are projected to gain more productivity than poleward regions",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Setiap populasi ikan tropis berpindah ke arah kutub",
        },
        {
          isCorrect: false,
          label:
            "Mengamati satu ikan bergerak ke arah kutub sudah cukup untuk membuktikan pemanasan laut",
        },
        {
          isCorrect: false,
          label:
            "Perubahan iklim memengaruhi produktivitas perikanan secara sama di setiap wilayah",
        },
        {
          isCorrect: true,
          label:
            "Pemanasan telah menggeser persebaran banyak spesies laut ke arah kutub",
        },
        {
          isCorrect: false,
          label:
            "Perikanan tropis dan subtropis diproyeksikan memperoleh kenaikan produktivitas yang lebih besar daripada wilayah dekat kutub",
        },
      ],
    },
  },
};

export default item;
