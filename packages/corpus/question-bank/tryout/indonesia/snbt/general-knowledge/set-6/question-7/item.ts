import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "ein Verbot, das jede Handlungsauswahl beseitigt",
        },
        {
          isCorrect: true,
          label:
            "ein Impuls, der eine Handlung attraktiver oder lohnender macht",
        },
        {
          isCorrect: false,
          label:
            "eine Information ohne Einfluss auf Kosten oder Nutzen einer Handlung",
        },
        {
          isCorrect: false,
          label: "eine Strafe nach einer anderen, sachfremden Handlung",
        },
        {
          isCorrect: false,
          label:
            "ein Maßstab für Ergebnisse ohne Einfluss auf die Entscheidung",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "a prohibition that removes every choice of action",
        },
        {
          isCorrect: true,
          label: "a stimulus that makes an action more attractive or rewarding",
        },
        {
          isCorrect: false,
          label:
            "information that changes neither the cost nor benefit of an action",
        },
        {
          isCorrect: false,
          label: "a penalty following a different, unrelated action",
        },
        {
          isCorrect: false,
          label:
            "a standard for measuring outcomes without influencing a decision",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "larangan yang menghapus seluruh pilihan tindakan",
        },
        {
          isCorrect: true,
          label:
            "rangsangan yang membuat suatu tindakan lebih menarik atau menguntungkan",
        },
        {
          isCorrect: false,
          label: "informasi yang tidak mengubah biaya atau manfaat tindakan",
        },
        {
          isCorrect: false,
          label: "hukuman setelah tindakan lain yang tidak berkaitan",
        },
        {
          isCorrect: false,
          label: "standar untuk mengukur hasil tanpa memengaruhi keputusan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
