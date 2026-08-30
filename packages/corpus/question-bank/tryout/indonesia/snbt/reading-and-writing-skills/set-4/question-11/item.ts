import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "eine Wirksamkeitsanalise zur geprüften Änderung im Kontext „Büchertauschmarkt“",
        },
        {
          isCorrect: false,
          label:
            "eine Wirksamkaitsanalyse zur geprüften Änderung im Kontext „Büchertauschmarkt“",
        },
        {
          isCorrect: true,
          label:
            "eine Wirksamkeitsanalyse zur geprüften Änderung im Kontext „Büchertauschmarkt“",
        },
        {
          isCorrect: false,
          label:
            "eine Wirksamkeitsanalyse zur geprüften Änderung im Konteks „Büchertauschmarkt“",
        },
        {
          isCorrect: false,
          label:
            "eine Wirksamkeitsanalyse zur geprüften Änderung im Kontextt „Büchertauschmarkt“",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "an analyse of the effectiveness of genre signs on each table in this setting (book exchange market)",
        },
        {
          isCorrect: false,
          label:
            "an analysis of the effectivness of genre signs on each table in this setting (book exchange market)",
        },
        {
          isCorrect: true,
          label:
            "an analysis of the effectiveness of genre signs on each table in this setting (book exchange market)",
        },
        {
          isCorrect: false,
          label:
            "an analisis of the effectiveness of genre signs on each table in this setting (book exchange market)",
        },
        {
          isCorrect: false,
          label:
            "an analysis of the effectivity of genre signs on each table in this setting (book exchange market)",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "analisa efektivitas tanda genre di setiap meja di pasar tukar buku",
        },
        {
          isCorrect: false,
          label:
            "analisis efektifitas tanda genre di setiap meja di pasar tukar buku",
        },
        {
          isCorrect: true,
          label:
            "analisis efektivitas tanda genre di setiap meja di pasar tukar buku",
        },
        {
          isCorrect: false,
          label:
            "analisa efektifitas tanda genre di setiap meja di pasar tukar buku",
        },
        {
          isCorrect: false,
          label:
            "analisis efektivitas tanda genre di setiap meja di kontek pasar tukar buku",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
