import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Alle Mitglieder von T4 sind Mitglieder von R4.",
        },
        {
          isCorrect: false,
          label: "Einige Mitglieder von R4 sind Mitglieder von T4.",
        },
        {
          isCorrect: false,
          label: "Kein Mitglied von S4 ist Mitglied von R4.",
        },
        {
          isCorrect: false,
          label: "Einige Mitglieder von T4 sind keine Mitglieder von S4.",
        },
        {
          isCorrect: true,
          label: "Kein Mitglied von R4 ist Mitglied von T4.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Every member of T4 is a member of R4.",
        },
        {
          isCorrect: false,
          label: "Some members of R4 are members of T4.",
        },
        {
          isCorrect: false,
          label: "No member of S4 is a member of R4.",
        },
        {
          isCorrect: false,
          label: "Some members of T4 are not members of S4.",
        },
        {
          isCorrect: true,
          label: "No member of R4 is a member of T4.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Semua anggota T4 merupakan anggota R4.",
        },
        {
          isCorrect: false,
          label: "Sebagian anggota R4 merupakan anggota T4.",
        },
        {
          isCorrect: false,
          label: "Tidak ada anggota S4 yang merupakan anggota R4.",
        },
        {
          isCorrect: false,
          label: "Sebagian anggota T4 bukan anggota S4.",
        },
        {
          isCorrect: true,
          label: "Tidak ada anggota R4 yang merupakan anggota T4.",
        },
      ],
    },
  },
};

export default item;
