import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label:
        "Statement $$(1)$$ alone is sufficient, but statement $$(2)$$ alone is not sufficient.",
      value: false,
    },
    {
      label:
        "Statement $$(2)$$ alone is sufficient, but statement $$(1)$$ alone is not sufficient.",
      value: true,
    },
    {
      label:
        "Both statements together are sufficient, but neither statement alone is sufficient.",
      value: false,
    },
    {
      label:
        "Statement $$(1)$$ alone is sufficient, and statement $$(2)$$ alone is sufficient.",
      value: false,
    },
    {
      label: "Statements $$(1)$$ and $$(2)$$ together are not sufficient.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Pernyataan $$(1)$$ saja cukup, tetapi pernyataan $$(2)$$ saja tidak cukup.",
      value: false,
    },
    {
      label:
        "Pernyataan $$(2)$$ saja cukup, tetapi pernyataan $$(1)$$ saja tidak cukup.",
      value: true,
    },
    {
      label:
        "Kedua pernyataan bersama-sama cukup, tetapi masing-masing pernyataan saja tidak cukup.",
      value: false,
    },
    {
      label:
        "Pernyataan $$(1)$$ saja sudah cukup, dan pernyataan $$(2)$$ saja sudah cukup.",
      value: false,
    },
    {
      label: "Pernyataan $$(1)$$ dan $$(2)$$ bersama-sama tidak cukup.",
      value: false,
    },
  ],
};

export default choices;
