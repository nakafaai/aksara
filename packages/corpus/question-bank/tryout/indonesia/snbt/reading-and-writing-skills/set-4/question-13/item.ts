import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "die Folge Studie des Teams im untersuchten Kontext (Büchertauschmarkt)",
        },
        {
          isCorrect: false,
          label:
            "die Folge-studie des Teams im untersuchten Kontext (Büchertauschmarkt)",
        },
        {
          isCorrect: true,
          label:
            "die Folgestudie des Teams im untersuchten Kontext (Büchertauschmarkt)",
        },
        {
          isCorrect: false,
          label:
            "die Folgestudie des Team im untersuchten Kontext (Büchertauschmarkt)",
        },
        {
          isCorrect: false,
          label:
            "die Folge  Studie des Teams im untersuchten Kontext (Büchertauschmarkt)",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "the team's follow up study of genre signs on each table in this setting (book exchange market)",
        },
        {
          isCorrect: false,
          label:
            "the team's followup study of genre signs on each table in this setting (book exchange market)",
        },
        {
          isCorrect: true,
          label:
            "the team's follow-up study of genre signs on each table in this setting (book exchange market)",
        },
        {
          isCorrect: false,
          label:
            "the teams' follow--up study of genre signs on each table in this setting (book exchange market)",
        },
        {
          isCorrect: false,
          label:
            "the team follow-up-study of genre signs on each table in this setting (book exchange market)",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "kerjasama tim dalam uji tanda genre di setiap meja di pasar tukar buku",
        },
        {
          isCorrect: false,
          label:
            "kerja-sama tim dalam uji tanda genre di setiap meja di pasar tukar buku",
        },
        {
          isCorrect: true,
          label:
            "kerja sama tim dalam uji tanda genre di setiap meja di pasar tukar buku",
        },
        {
          isCorrect: false,
          label:
            "kerja  sama tim dalam uji tanda genre di setiap meja di pasar tukar buku",
        },
        {
          isCorrect: false,
          label:
            "kerja sama-sama tim dalam uji tanda genre di setiap meja di pasar tukar buku",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
