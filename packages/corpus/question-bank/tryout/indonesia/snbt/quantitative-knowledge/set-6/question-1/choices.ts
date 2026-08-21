import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Aussage $$(1)$$ allein ist ausreichend, Aussage $$(2)$$ allein jedoch nicht.",
      value: false,
    },
    {
      label:
        "Aussage $$(2)$$ allein ist ausreichend, Aussage $$(1)$$ allein jedoch nicht.",
      value: false,
    },
    {
      label:
        "Beide Aussagen zusammen sind ausreichend, aber keine Aussage allein ist ausreichend.",
      value: true,
    },
    {
      label:
        "Aussage $$(1)$$ allein ist ausreichend, und Aussage $$(2)$$ allein ist ausreichend.",
      value: false,
    },
    {
      label:
        "Die Aussagen $$(1)$$ und $$(2)$$ sind auch zusammen nicht ausreichend.",
      value: false,
    },
  ],
  en: [
    {
      label:
        "Statement $$(1)$$ ALONE is sufficient, but statement $$(2)$$ alone is not sufficient.",
      value: false,
    },
    {
      label:
        "Statement $$(2)$$ ALONE is sufficient, but statement $$(1)$$ alone is not sufficient.",
      value: false,
    },
    {
      label:
        "BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.",
      value: true,
    },
    {
      label:
        "Statement $$(1)$$ ALONE is sufficient, and statement $$(2)$$ ALONE is sufficient.",
      value: false,
    },
    {
      label: "Statements $$(1)$$ and $$(2)$$ TOGETHER are NOT sufficient.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Pernyataan $$(1)$$ saja cukup untuk menjawab pertanyaan tetapi pernyataan $$(2)$$ saja tidak cukup.",
      value: false,
    },
    {
      label:
        "Pernyataan $$(2)$$ saja cukup untuk menjawab pertanyaan tetapi pernyataan $$(1)$$ saja tidak cukup.",
      value: false,
    },
    {
      label:
        "Dua pernyataan bersama-sama cukup untuk menjawab pertanyaan, tetapi satu pernyataan saja tidak cukup.",
      value: true,
    },
    {
      label:
        "Pernyataan $$(1)$$ saja cukup untuk menjawab pertanyaan dan pernyataan $$(2)$$ saja cukup.",
      value: false,
    },
    {
      label:
        "Pernyataan $$(1)$$ dan pernyataan $$(2)$$ tidak cukup untuk menjawab pertanyaan.",
      value: false,
    },
  ],
};

export default choices;
