import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "the word *recovered* in sentence $$(3)$$.",
      value: false,
    },
    {
      label: "the word *date* in sentence $$(4)$$.",
      value: false,
    },
    {
      label: "the word *samples* in sentence $$(5)$$.",
      value: false,
    },
    {
      label: "the word *research* in sentence $$(6)$$.",
      value: true,
    },
    {
      label: "the word *circulated* in sentence $$(8)$$.",
      value: false,
    },
  ],
  id: [
    {
      label: "kata *menemukan* pada kalimat $$(3)$$.",
      value: false,
    },
    {
      label: "kata *hidup* pada kalimat $$(4)$$.",
      value: false,
    },
    {
      label: "kata *sampel* pada kalimat $$(5)$$.",
      value: false,
    },
    {
      label: "kata *penelitian* pada kalimat $$(6)$$.",
      value: true,
    },
    {
      label: "kata *beredar* pada kalimat $$(8)$$.",
      value: false,
    },
  ],
};

export default choices;
