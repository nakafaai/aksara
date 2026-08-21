import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "zwischen den Sätzen $$(5)$$ und $$(6)$$.",
      value: true,
    },
    {
      label: "vor Satz $$(7)$$.",
      value: false,
    },
    {
      label: "zwischen den Sätzen $$(1)$$ und $$(2)$$.",
      value: false,
    },
    {
      label: "nach dem Satz $$(3)$$.",
      value: false,
    },
    {
      label: "zwischen den Sätzen $$(4)$$ und $$(5)$$.",
      value: false,
    },
  ],
  en: [
    {
      label: "between sentences $$(5)$$ and $$(6)$$.",
      value: true,
    },
    {
      label: "before sentence $$(7)$$.",
      value: false,
    },
    {
      label: "between sentences $$(1)$$ and $$(2)$$.",
      value: false,
    },
    {
      label: "after sentence $$(3)$$.",
      value: false,
    },
    {
      label: "between sentences $$(4)$$ and $$(5)$$.",
      value: false,
    },
  ],
  id: [
    {
      label: "antara kalimat $$(5)$$ dan $$(6)$$.",
      value: true,
    },
    {
      label: "sebelum kalimat $$(7)$$.",
      value: false,
    },
    {
      label: "antara kalimat $$(1)$$ dan $$(2)$$.",
      value: false,
    },
    {
      label: "setelah kalimat $$(3)$$.",
      value: false,
    },
    {
      label: "antara kalimat $$(4)$$ dan $$(5)$$.",
      value: false,
    },
  ],
};

export default choices;
