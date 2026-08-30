import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kein Mitglied von S6 ist Mitglied von R6.",
        },
        {
          isCorrect: false,
          label: "Einige Mitglieder von T6 sind keine Mitglieder von S6.",
        },
        {
          isCorrect: false,
          label: "Alle Mitglieder von T6 sind Mitglieder von R6.",
        },
        {
          isCorrect: false,
          label: "Einige Mitglieder von R6 sind Mitglieder von T6.",
        },
        {
          isCorrect: true,
          label: "Kein Mitglied von R6 ist Mitglied von T6.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "No member of S6 is a member of R6.",
        },
        {
          isCorrect: false,
          label: "Some members of T6 are not members of S6.",
        },
        {
          isCorrect: false,
          label: "Every member of T6 is a member of R6.",
        },
        {
          isCorrect: false,
          label: "Some members of R6 are members of T6.",
        },
        {
          isCorrect: true,
          label: "No member of R6 is a member of T6.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tidak ada anggota S6 yang merupakan anggota R6.",
        },
        {
          isCorrect: false,
          label: "Sebagian anggota T6 bukan anggota S6.",
        },
        {
          isCorrect: false,
          label: "Semua anggota T6 merupakan anggota R6.",
        },
        {
          isCorrect: false,
          label: "Sebagian anggota R6 merupakan anggota T6.",
        },
        {
          isCorrect: true,
          label: "Tidak ada anggota R6 yang merupakan anggota T6.",
        },
      ],
    },
  },
};

export default item;
