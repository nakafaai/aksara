import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Einige Mitglieder von T8 sind keine Mitglieder von S8.",
        },
        {
          isCorrect: false,
          label: "Alle Mitglieder von T8 sind Mitglieder von R8.",
        },
        {
          isCorrect: false,
          label: "Einige Mitglieder von R8 sind Mitglieder von T8.",
        },
        {
          isCorrect: true,
          label: "Kein Mitglied von R8 ist Mitglied von T8.",
        },
        {
          isCorrect: false,
          label: "Kein Mitglied von S8 ist Mitglied von R8.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Some members of T8 are not members of S8.",
        },
        {
          isCorrect: false,
          label: "Every member of T8 is a member of R8.",
        },
        {
          isCorrect: false,
          label: "Some members of R8 are members of T8.",
        },
        {
          isCorrect: true,
          label: "No member of R8 is a member of T8.",
        },
        {
          isCorrect: false,
          label: "No member of S8 is a member of R8.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sebagian anggota T8 bukan anggota S8.",
        },
        {
          isCorrect: false,
          label: "Semua anggota T8 merupakan anggota R8.",
        },
        {
          isCorrect: false,
          label: "Sebagian anggota R8 merupakan anggota T8.",
        },
        {
          isCorrect: true,
          label: "Tidak ada anggota R8 yang merupakan anggota T8.",
        },
        {
          isCorrect: false,
          label: "Tidak ada anggota S8 yang merupakan anggota R8.",
        },
      ],
    },
  },
};

export default item;
