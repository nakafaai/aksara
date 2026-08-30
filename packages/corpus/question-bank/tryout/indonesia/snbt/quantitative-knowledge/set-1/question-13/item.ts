import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Aussage $$(2)$$ allein reicht aus, Aussage $$(1)$$ allein jedoch nicht",
        },
        {
          isCorrect: false,
          label:
            "Aussage $$(1)$$ allein reicht aus, Aussage $$(2)$$ allein jedoch nicht",
        },
        {
          isCorrect: false,
          label:
            "Beide Aussagen zusammen reichen aus, aber keine Aussage allein",
        },
        {
          isCorrect: false,
          label:
            "Aussage $$(1)$$ allein reicht aus, und Aussage $$(2)$$ allein reicht aus",
        },
        {
          isCorrect: false,
          label:
            "Die Aussagen $$(1)$$ und $$(2)$$ reichen auch zusammen nicht aus",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Statement $$(2)$$ ALONE is sufficient, but statement $$(1)$$ ALONE is not sufficient",
        },
        {
          isCorrect: false,
          label:
            "Statement $$(1)$$ ALONE is sufficient, but statement $$(2)$$ ALONE is not sufficient",
        },
        {
          isCorrect: false,
          label:
            "BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient",
        },
        {
          isCorrect: false,
          label:
            "Statement $$(1)$$ ALONE is sufficient, and statement $$(2)$$ ALONE is sufficient",
        },
        {
          isCorrect: false,
          label: "Statements $$(1)$$ and $$(2)$$ TOGETHER are NOT sufficient",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pernyataan $$(2)$$ SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan $$(1)$$ SAJA tidak cukup",
        },
        {
          isCorrect: false,
          label:
            "Pernyataan $$(1)$$ SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan $$(2)$$ SAJA tidak cukup",
        },
        {
          isCorrect: false,
          label:
            "DUA pernyataan BERSAMA-SAMA cukup untuk menjawab pertanyaan, tetapi SATU pernyataan SAJA tidak cukup",
        },
        {
          isCorrect: false,
          label:
            "Pernyataan $$(1)$$ SAJA cukup untuk menjawab pertanyaan dan pernyataan $$(2)$$ SAJA cukup untuk menjawab pertanyaan",
        },
        {
          isCorrect: false,
          label:
            "Pernyataan $$(1)$$ dan pernyataan $$(2)$$ tidak cukup untuk menjawab pertanyaan",
        },
      ],
    },
  },
};

export default item;
