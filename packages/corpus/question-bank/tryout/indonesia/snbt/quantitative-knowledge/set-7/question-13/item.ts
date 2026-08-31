import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Aussage $$(1)$$ allein reicht aus, Aussage $$(2)$$ allein jedoch nicht.",
        },
        {
          isCorrect: false,
          label:
            "Beide Aussagen zusammen reichen aus, aber keine Aussage allein.",
        },
        {
          isCorrect: true,
          label:
            "Aussage $$(2)$$ allein reicht aus, Aussage $$(1)$$ allein jedoch nicht.",
        },
        {
          isCorrect: false,
          label:
            "Aussage $$(1)$$ allein reicht aus, und Aussage $$(2)$$ allein reicht aus.",
        },
        {
          isCorrect: false,
          label:
            "Die Aussagen $$(1)$$ und $$(2)$$ reichen auch zusammen nicht aus.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Statement $$(1)$$ alone is sufficient, but statement $$(2)$$ alone is not sufficient.",
        },
        {
          isCorrect: false,
          label:
            "Both statements together are sufficient, but neither statement alone is sufficient.",
        },
        {
          isCorrect: true,
          label:
            "Statement $$(2)$$ alone is sufficient, but statement $$(1)$$ alone is not sufficient.",
        },
        {
          isCorrect: false,
          label:
            "Statement $$(1)$$ alone is sufficient, and statement $$(2)$$ alone is sufficient.",
        },
        {
          isCorrect: false,
          label: "Statements $$(1)$$ and $$(2)$$ together are not sufficient.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pernyataan $$(1)$$ saja cukup, tetapi pernyataan $$(2)$$ saja tidak cukup.",
        },
        {
          isCorrect: false,
          label:
            "Kedua pernyataan bersama-sama cukup, tetapi masing-masing pernyataan saja tidak cukup.",
        },
        {
          isCorrect: true,
          label:
            "Pernyataan $$(2)$$ saja cukup, tetapi pernyataan $$(1)$$ saja tidak cukup.",
        },
        {
          isCorrect: false,
          label:
            "Pernyataan $$(1)$$ saja sudah cukup, dan pernyataan $$(2)$$ saja sudah cukup.",
        },
        {
          isCorrect: false,
          label: "Pernyataan $$(1)$$ dan $$(2)$$ bersama-sama tidak cukup.",
        },
      ],
    },
  },
};

export default item;
