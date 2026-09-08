import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "eine Wirksamkeitsanalise zu den Genre-Schildern auf dem Büchertauschmarkt",
        },
        {
          isCorrect: true,
          label:
            "eine Wirksamkeitsanalyse zu den Genre-Schildern auf dem Büchertauschmarkt",
        },
        {
          isCorrect: false,
          label:
            "eine Wirksamkaitsanalyse zu den Genre-Schildern auf dem Büchertauschmarkt",
        },
        {
          isCorrect: false,
          label:
            "eine Wirksamkeitsanalyse zu den Genre-Schildern auf dem Büchertauschmakt",
        },
        {
          isCorrect: false,
          label:
            "eine Wirksamkeitsanalyse zu den Genre-Schildern auf dem Büchertauschmarktt",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "an analysiss of the effectiveness of genre signs at the book exchange",
        },
        {
          isCorrect: true,
          label:
            "an analysis of the effectiveness of genre signs at the book exchange",
        },
        {
          isCorrect: false,
          label:
            "an analysis of the effectivness of genre signs at the book exchange",
        },
        {
          isCorrect: false,
          label:
            "an analisis of the effectiveness of genre signs at the book exchange",
        },
        {
          isCorrect: false,
          label:
            "an analysis of the effectivenes of genre signs at the book exchange",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "analisa efektivitas tanda genre di pasar tukar buku",
        },
        {
          isCorrect: true,
          label: "analisis efektivitas tanda genre di pasar tukar buku",
        },
        {
          isCorrect: false,
          label: "analisis efektifitas tanda genre di pasar tukar buku",
        },
        {
          isCorrect: false,
          label: "analisa efektifitas tanda genre di pasar tukar buku",
        },
        {
          isCorrect: false,
          label:
            "analisis efektivitas tanda genre dalam kontek pasar tukar buku",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
