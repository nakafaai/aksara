import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Satz $$(2)$$ enthält einen Zeichensetzungsfehler.",
        },
        {
          isCorrect: false,
          label: "Satz $$(3)$$ verwendet die falsche Konjunktion.",
        },
        {
          isCorrect: true,
          label:
            "Die Verbindung *Als Inselstaat, daher ...* macht Satz $$(1)$$ grammatisch fehlerhaft.",
        },
        {
          isCorrect: false,
          label: "Satz $$(4)$$ benötigt ein zusätzliches Komma.",
        },
        {
          isCorrect: false,
          label: "Satz $$(5)$$ ist unnötig weitschweifig.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sentence $$(2)$$ contains a punctuation error.",
        },
        {
          isCorrect: false,
          label: "Sentence $$(3)$$ uses the wrong conjunction.",
        },
        {
          isCorrect: true,
          label:
            "The pattern *As an archipelagic country, therefore ...* makes sentence $$(1)$$ ineffective.",
        },
        {
          isCorrect: false,
          label: "Sentence $$(4)$$ needs an additional comma.",
        },
        {
          isCorrect: false,
          label: "Sentence $$(5)$$ is needlessly wordy.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kalimat $$(2)$$ mengandung kesalahan tanda baca.",
        },
        {
          isCorrect: false,
          label: "Kalimat $$(3)$$ menggunakan konjungsi yang salah.",
        },
        {
          isCorrect: true,
          label:
            "Pola *Sebagai negara kepulauan, maka ...* membuat kalimat $$(1)$$ tidak efektif.",
        },
        {
          isCorrect: false,
          label: "Kalimat $$(4)$$ memerlukan tambahan tanda koma.",
        },
        {
          isCorrect: false,
          label: "Kalimat $$(5)$$ mengandung pemborosan kata.",
        },
      ],
    },
  },
};

export default item;
