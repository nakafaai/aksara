import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Aussage $$(1)$$ allein ist ausreichend, Aussage $$(2)$$ allein jedoch nicht.",
        },
        {
          isCorrect: true,
          label:
            "Beide Aussagen zusammen sind ausreichend, aber keine Aussage allein ist ausreichend.",
        },
        {
          isCorrect: false,
          label:
            "Aussage $$(2)$$ allein ist ausreichend, Aussage $$(1)$$ allein jedoch nicht.",
        },
        {
          isCorrect: false,
          label:
            "Aussage $$(1)$$ allein ist ausreichend, und Aussage $$(2)$$ allein ist ausreichend.",
        },
        {
          isCorrect: false,
          label:
            "Die Aussagen $$(1)$$ und $$(2)$$ sind auch zusammen nicht ausreichend.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Statement $$(1)$$ ALONE is sufficient, but statement $$(2)$$ alone is not sufficient.",
        },
        {
          isCorrect: true,
          label:
            "BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.",
        },
        {
          isCorrect: false,
          label:
            "Statement $$(2)$$ ALONE is sufficient, but statement $$(1)$$ alone is not sufficient.",
        },
        {
          isCorrect: false,
          label:
            "Statement $$(1)$$ ALONE is sufficient, and statement $$(2)$$ ALONE is sufficient.",
        },
        {
          isCorrect: false,
          label: "Statements $$(1)$$ and $$(2)$$ TOGETHER are NOT sufficient.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pernyataan $$(1)$$ saja cukup untuk menjawab pertanyaan tetapi pernyataan $$(2)$$ saja tidak cukup.",
        },
        {
          isCorrect: true,
          label:
            "Dua pernyataan bersama-sama cukup untuk menjawab pertanyaan, tetapi satu pernyataan saja tidak cukup.",
        },
        {
          isCorrect: false,
          label:
            "Pernyataan $$(2)$$ saja cukup untuk menjawab pertanyaan tetapi pernyataan $$(1)$$ saja tidak cukup.",
        },
        {
          isCorrect: false,
          label:
            "Pernyataan $$(1)$$ saja cukup untuk menjawab pertanyaan dan pernyataan $$(2)$$ saja cukup.",
        },
        {
          isCorrect: false,
          label:
            "Pernyataan $$(1)$$ dan pernyataan $$(2)$$ tidak cukup untuk menjawab pertanyaan.",
        },
      ],
    },
  },
};

export default item;
