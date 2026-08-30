import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kinder spielen im Freien." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kinder haben mehr Gelegenheiten." }],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Der Sommer bietet Kindern Gelegenheiten." },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Der Sommer spielt im Freien." }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Gelegenheiten finden im Freien statt." },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Children play outdoors." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Children have more opportunities." }],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Summer gives children opportunities." },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Summer plays outdoors." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Opportunities occur outdoors." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Anak bermain di luar ruangan." }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Anak memiliki lebih banyak kesempatan." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Musim panas memberi anak kesempatan." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Musim panas bermain di luar ruangan." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Kesempatan terjadi di luar ruangan." },
          ],
        },
      ],
    },
  },
};

export default item;
