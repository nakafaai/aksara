import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Sentence $$(2)$$ contains a punctuation error.",
      value: false,
    },
    {
      label:
        "The pattern *As an archipelagic country, therefore ...* makes sentence $$(1)$$ ineffective.",
      value: true,
    },
    {
      label: "Sentence $$(3)$$ uses the wrong conjunction.",
      value: false,
    },
    {
      label: "Sentence $$(4)$$ needs an additional comma.",
      value: false,
    },
    {
      label: "Sentence $$(5)$$ is needlessly wordy.",
      value: false,
    },
  ],
  id: [
    {
      label: "Kalimat $$(2)$$ mengandung kesalahan tanda baca.",
      value: false,
    },
    {
      label:
        "Pola *Sebagai negara kepulauan, maka ...* membuat kalimat $$(1)$$ tidak efektif.",
      value: true,
    },
    {
      label: "Kalimat $$(3)$$ menggunakan konjungsi yang salah.",
      value: false,
    },
    {
      label: "Kalimat $$(4)$$ memerlukan tambahan tanda koma.",
      value: false,
    },
    {
      label: "Kalimat $$(5)$$ mengandung pemborosan kata.",
      value: false,
    },
  ],
};

export default choices;
