import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Beendigung des illegalen Zinnabbaus würde das Wassereinzugsgebiet zwangsläufig schädigen.",
        },
        {
          isCorrect: false,
          label:
            "Weil illegale Bergleute offen arbeiten, kann es in der Regenzeit nicht zu Hochwasser kommen.",
        },
        {
          isCorrect: false,
          label:
            "Schäden am Wassereinzugsgebiet und Bergbausedimente bedrohen die umliegende Bevölkerung nicht.",
        },
        {
          isCorrect: false,
          label:
            "Bergbausedimente verbessern den Abfluss und verhindern Unterbrechungen der Flussläufe.",
        },
        {
          isCorrect: true,
          label:
            "Bergbausedimente und unterbrochene Flussläufe können die Aufnahmekapazität verringern und die Hochwassergefahr in der Regenzeit erhöhen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Stopping illegal tin mining would necessarily damage the watershed.",
        },
        {
          isCorrect: false,
          label:
            "Because illegal miners operate openly, flooding cannot occur during the rainy season.",
        },
        {
          isCorrect: false,
          label:
            "Watershed damage and mining sedimentation do not threaten nearby communities.",
        },
        {
          isCorrect: false,
          label:
            "Mining sediment improves river flow and prevents channels from being disrupted.",
        },
        {
          isCorrect: true,
          label:
            "Mining-related sedimentation and disrupted channels can reduce river capacity and increase rainy-season flood risk.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Penghentian tambang timah ilegal pasti akan merusak DAS.",
        },
        {
          isCorrect: false,
          label:
            "Karena penambang ilegal beroperasi secara terbuka, banjir tidak mungkin terjadi pada musim hujan.",
        },
        {
          isCorrect: false,
          label:
            "Kerusakan DAS dan sedimentasi tambang tidak mengancam masyarakat di sekitarnya.",
        },
        {
          isCorrect: false,
          label:
            "Sedimentasi tambang memperbaiki aliran sungai dan mencegah alurnya terganggu.",
        },
        {
          isCorrect: true,
          label:
            "Sedimentasi tambang dan alur yang terganggu dapat mengurangi kapasitas sungai serta meningkatkan risiko banjir pada musim hujan.",
        },
      ],
    },
  },
};

export default item;
