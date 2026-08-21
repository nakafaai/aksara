import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Wenn $$(1)$$, $$(2)$$ und $$(3)$$ korrekt sind.",
      value: false,
    },
    {
      label: "Wenn $$(1)$$ und $$(3)$$ korrekt sind.",
      value: false,
    },
    {
      label: "Wenn $$(2)$$ und $$(4)$$ korrekt sind.",
      value: true,
    },
    {
      label: "Wenn nur $$(4)$$ korrekt ist.",
      value: false,
    },
    {
      label: "Wenn alles richtig ist.",
      value: false,
    },
  ],
  en: [
    {
      label: "If $$(1)$$, $$(2)$$, and $$(3)$$ are correct.",
      value: false,
    },
    {
      label: "If $$(1)$$ and $$(3)$$ are correct.",
      value: false,
    },
    {
      label: "If $$(2)$$ and $$(4)$$ are correct.",
      value: true,
    },
    {
      label: "If only $$(4)$$ is correct.",
      value: false,
    },
    {
      label: "If all are correct.",
      value: false,
    },
  ],
  id: [
    {
      label: "Jika $$(1)$$, $$(2)$$, dan $$(3)$$ yang betul.",
      value: false,
    },
    {
      label: "Jika $$(1)$$ dan $$(3)$$ yang betul.",
      value: false,
    },
    {
      label: "Jika $$(2)$$ dan $$(4)$$ yang betul.",
      value: true,
    },
    {
      label: "Jika hanya $$(4)$$ yang betul.",
      value: false,
    },
    {
      label: "Jika semuanya betul.",
      value: false,
    },
  ],
};

export default choices;
