import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$(1)$$, $$(2)$$, and $$(3)$$", value: false },
    { label: "$$(1)$$ and $$(3)$$", value: false },
    { label: "$$(2)$$ and $$(4)$$", value: false },
    { label: "Only $$(4)$$", value: false },
    { label: "All four numbers", value: true },
  ],
  id: [
    { label: "$$(1)$$, $$(2)$$, dan $$(3)$$", value: false },
    { label: "$$(1)$$ dan $$(3)$$", value: false },
    { label: "$$(2)$$ dan $$(4)$$", value: false },
    { label: "Hanya $$(4)$$", value: false },
    { label: "Keempat bilangan", value: true },
  ],
};

export default choices;
