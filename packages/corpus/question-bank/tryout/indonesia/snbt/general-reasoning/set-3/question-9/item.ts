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
              text: "Die Beendigung des illegalen Zinnabbaus würde das Wassereinzugsgebiet zwangsläufig schädigen.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Bergbausedimente und unterbrochene Flussläufe können die Aufnahmekapazität verringern und die Hochwassergefahr in der Regenzeit erhöhen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Weil illegale Bergleute offen arbeiten, kann es in der Regenzeit nicht zu Hochwasser kommen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Schäden am Wassereinzugsgebiet und Bergbausedimente bedrohen die umliegende Bevölkerung nicht.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Bergbausedimente verbessern den Abfluss und verhindern Unterbrechungen der Flussläufe.",
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
              text: "Stopping illegal tin mining would necessarily damage the watershed.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Mining-related sedimentation and disrupted channels can reduce river capacity and increase rainy-season flood risk.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Because illegal miners operate openly, flooding cannot occur during the rainy season.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Watershed damage and mining sedimentation do not threaten nearby communities.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mining sediment improves river flow and prevents channels from being disrupted.",
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
              text: "Penghentian tambang timah ilegal pasti akan merusak DAS.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Sedimentasi tambang dan alur yang terganggu dapat mengurangi kapasitas sungai serta meningkatkan risiko banjir pada musim hujan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Karena penambang ilegal beroperasi secara terbuka, banjir tidak mungkin terjadi pada musim hujan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kerusakan DAS dan sedimentasi tambang tidak mengancam masyarakat di sekitarnya.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sedimentasi tambang memperbaiki aliran sungai dan mencegah alurnya terganggu.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
