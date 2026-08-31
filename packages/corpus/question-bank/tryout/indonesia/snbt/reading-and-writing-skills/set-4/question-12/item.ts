import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "am Montag prüfte das Team Genre-Schilder auf jedem Tisch im Kontext Büchertauschmarkt.",
        },
        {
          isCorrect: false,
          label:
            "Am montag prüfte das Team Genre-Schilder auf jedem Tisch im Kontext Büchertauschmarkt.",
        },
        {
          isCorrect: true,
          label:
            "Am Montag prüfte das Team Genre-Schilder auf jedem Tisch im folgenden Kontext: Büchertauschmarkt.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte Das Team Genre-Schilder auf jedem Tisch im Kontext Büchertauschmarkt.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag, prüfte das Team Genre-Schilder auf jedem Tisch im Kontext Büchertauschmarkt",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "on Monday, the team tested genre signs on each table in this setting (book exchange market).",
        },
        {
          isCorrect: false,
          label:
            "On monday, the team tested genre signs on each table in this setting (book exchange market).",
        },
        {
          isCorrect: true,
          label:
            "On Monday, the team tested genre signs on each table in this setting (book exchange market).",
        },
        {
          isCorrect: false,
          label:
            "On Monday, The team tested genre signs on each table in this setting (book exchange market).",
        },
        {
          isCorrect: false,
          label:
            "On Monday the team tested genre signs on each table in this setting (book exchange market)",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji tanda genre di setiap meja di pasar tukar buku.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji tanda genre di setiap meja di pasar tukar buku.",
        },
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji tanda genre di setiap meja di pasar tukar buku.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji tanda genre di setiap meja di pasar tukar buku.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji tanda genre di setiap meja di pasar tukar buku",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
