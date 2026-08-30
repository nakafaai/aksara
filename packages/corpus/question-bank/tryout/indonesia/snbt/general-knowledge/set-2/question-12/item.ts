import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kinder spielen im Freien.",
        },
        {
          isCorrect: false,
          label: "Kinder haben mehr Gelegenheiten.",
        },
        {
          isCorrect: true,
          label: "Der Sommer bietet Kindern Gelegenheiten.",
        },
        {
          isCorrect: false,
          label: "Der Sommer spielt im Freien.",
        },
        {
          isCorrect: false,
          label: "Gelegenheiten finden im Freien statt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Children play outdoors.",
        },
        {
          isCorrect: false,
          label: "Children have more opportunities.",
        },
        {
          isCorrect: true,
          label: "Summer gives children opportunities.",
        },
        {
          isCorrect: false,
          label: "Summer plays outdoors.",
        },
        {
          isCorrect: false,
          label: "Opportunities occur outdoors.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Anak bermain di luar ruangan.",
        },
        {
          isCorrect: false,
          label: "Anak memiliki lebih banyak kesempatan.",
        },
        {
          isCorrect: true,
          label: "Musim panas memberi anak kesempatan.",
        },
        {
          isCorrect: false,
          label: "Musim panas bermain di luar ruangan.",
        },
        {
          isCorrect: false,
          label: "Kesempatan terjadi di luar ruangan.",
        },
      ],
    },
  },
};

export default item;
