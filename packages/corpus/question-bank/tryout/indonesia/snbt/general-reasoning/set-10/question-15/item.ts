import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Alle Mitglieder von T9 sind Mitglieder von R9.",
        },
        {
          isCorrect: true,
          label: "Kein Mitglied von R9 ist Mitglied von T9.",
        },
        {
          isCorrect: false,
          label: "Einige Mitglieder von R9 sind Mitglieder von T9.",
        },
        {
          isCorrect: false,
          label: "Kein Mitglied von S9 ist Mitglied von R9.",
        },
        {
          isCorrect: false,
          label: "Einige Mitglieder von T9 sind keine Mitglieder von S9.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Every member of T9 is a member of R9.",
        },
        {
          isCorrect: true,
          label: "No member of R9 is a member of T9.",
        },
        {
          isCorrect: false,
          label: "Some members of R9 are members of T9.",
        },
        {
          isCorrect: false,
          label: "No member of S9 is a member of R9.",
        },
        {
          isCorrect: false,
          label: "Some members of T9 are not members of S9.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Semua anggota T9 merupakan anggota R9.",
        },
        {
          isCorrect: true,
          label: "Tidak ada anggota R9 yang merupakan anggota T9.",
        },
        {
          isCorrect: false,
          label: "Sebagian anggota R9 merupakan anggota T9.",
        },
        {
          isCorrect: false,
          label: "Tidak ada anggota S9 yang merupakan anggota R9.",
        },
        {
          isCorrect: false,
          label: "Sebagian anggota T9 bukan anggota S9.",
        },
      ],
    },
  },
};

export default item;
