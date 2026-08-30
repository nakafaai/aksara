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
              text: "Jede tropische Fischpopulation wandert polwärts",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Die Erwärmung hat die Verbreitungsgebiete vieler Meeresarten polwärts verschoben",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Beobachtung eines einzelnen polwärts wandernden Fisches reicht als Beweis für die Erwärmung des Ozeans aus",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Klimawandel beeinflusst die Produktivität der Fischerei in jeder Region gleich",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Für tropische und subtropische Fischereien werden größere Produktivitätsgewinne erwartet als für polnähere Regionen",
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
              text: "Every tropical fish population moves toward the poles",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Warming has shifted the distributions of many marine species toward the poles",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Observing one fish move toward a pole is enough to prove ocean warming",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Climate change affects fisheries productivity equally in every region",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tropical and subtropical fisheries are projected to gain more productivity than poleward regions",
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
              text: "Setiap populasi ikan tropis berpindah ke arah kutub",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Pemanasan telah menggeser persebaran banyak spesies laut ke arah kutub",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mengamati satu ikan bergerak ke arah kutub sudah cukup untuk membuktikan pemanasan laut",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Perubahan iklim memengaruhi produktivitas perikanan secara sama di setiap wilayah",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Perikanan tropis dan subtropis diproyeksikan memperoleh kenaikan produktivitas yang lebih besar daripada wilayah dekat kutub",
            },
          ],
        },
      ],
    },
  },
};

export default item;
