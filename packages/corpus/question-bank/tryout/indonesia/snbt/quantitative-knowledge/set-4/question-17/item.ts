import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Aussage $$(1)$$ allein reicht aus, Aussage $$(2)$$ allein reicht nicht aus.",
        },
        {
          isCorrect: false,
          label:
            "Beide Aussagen zusammen reichen aus, aber keine reicht allein aus.",
        },
        {
          isCorrect: false,
          label: "Jede Aussage allein reicht aus.",
        },
        {
          isCorrect: true,
          label:
            "Aussage $$(2)$$ allein reicht aus, Aussage $$(1)$$ allein reicht nicht aus.",
        },
        {
          isCorrect: false,
          label: "Auch zusammen reichen die beiden Aussagen nicht aus.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Statement $$(1)$$ alone is sufficient, but statement $$(2)$$ alone is not.",
        },
        {
          isCorrect: false,
          label:
            "The statements together are sufficient, but neither is sufficient alone.",
        },
        {
          isCorrect: false,
          label: "Each statement alone is sufficient.",
        },
        {
          isCorrect: true,
          label:
            "Statement $$(2)$$ alone is sufficient, but statement $$(1)$$ alone is not.",
        },
        {
          isCorrect: false,
          label: "The statements remain insufficient even when used together.",
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
            "Kedua pernyataan cukup jika digunakan bersama-sama, tetapi masing-masing saja tidak cukup.",
        },
        {
          isCorrect: false,
          label: "Setiap pernyataan cukup jika digunakan sendiri.",
        },
        {
          isCorrect: true,
          label:
            "Pernyataan $$(2)$$ saja cukup, tetapi pernyataan $$(1)$$ saja tidak cukup.",
        },
        {
          isCorrect: false,
          label:
            "Kedua pernyataan tetap tidak cukup meskipun digunakan bersama-sama.",
        },
      ],
    },
  },
};

export default item;
