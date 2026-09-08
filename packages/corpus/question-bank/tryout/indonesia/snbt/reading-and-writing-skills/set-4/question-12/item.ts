import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "am Montag prüfte das Team Genre-Schilder auf jedem Tisch des Büchertauschmarkts.",
        },
        {
          isCorrect: false,
          label:
            "Am montag prüfte das Team Genre-Schilder auf jedem Tisch des Büchertauschmarkts.",
        },
        {
          isCorrect: true,
          label:
            "Am Montag prüfte das Team Genre-Schilder auf jedem Tisch des Büchertauschmarkts.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte Das Team Genre-Schilder auf jedem Tisch des Büchertauschmarkts.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag, prüfte das Team Genre-Schilder auf jedem Tisch des Büchertauschmarkts",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "on Monday, the team tested genre signs on every table at the book exchange.",
        },
        {
          isCorrect: false,
          label:
            "On monday, the team tested genre signs on every table at the book exchange.",
        },
        {
          isCorrect: true,
          label:
            "On Monday, the team tested genre signs on every table at the book exchange.",
        },
        {
          isCorrect: false,
          label:
            "On Monday, The team tested genre signs on every table at the book exchange.",
        },
        {
          isCorrect: false,
          label:
            "On Monday the team tested genre signs on every table at the book exchange",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji tanda genre di setiap meja pasar tukar buku.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji tanda genre di setiap meja pasar tukar buku.",
        },
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji tanda genre di setiap meja pasar tukar buku.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji tanda genre di setiap meja pasar tukar buku.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji tanda genre di setiap meja pasar tukar buku",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
