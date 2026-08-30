import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Einige Mitglieder von T2 sind keine Mitglieder von S2.",
        },
        {
          isCorrect: true,
          label: "Kein Mitglied von R2 ist Mitglied von T2.",
        },
        {
          isCorrect: false,
          label: "Alle Mitglieder von T2 sind Mitglieder von R2.",
        },
        {
          isCorrect: false,
          label: "Einige Mitglieder von R2 sind Mitglieder von T2.",
        },
        {
          isCorrect: false,
          label: "Kein Mitglied von S2 ist Mitglied von R2.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Some members of T2 are not members of S2.",
        },
        {
          isCorrect: true,
          label: "No member of R2 is a member of T2.",
        },
        {
          isCorrect: false,
          label: "Every member of T2 is a member of R2.",
        },
        {
          isCorrect: false,
          label: "Some members of R2 are members of T2.",
        },
        {
          isCorrect: false,
          label: "No member of S2 is a member of R2.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sebagian anggota T2 bukan anggota S2.",
        },
        {
          isCorrect: true,
          label: "Tidak ada anggota R2 yang merupakan anggota T2.",
        },
        {
          isCorrect: false,
          label: "Semua anggota T2 merupakan anggota R2.",
        },
        {
          isCorrect: false,
          label: "Sebagian anggota R2 merupakan anggota T2.",
        },
        {
          isCorrect: false,
          label: "Tidak ada anggota S2 yang merupakan anggota R2.",
        },
      ],
    },
  },
};

export default item;
