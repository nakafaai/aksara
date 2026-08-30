import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Alle Mitglieder von T10 sind Mitglieder von R10.",
        },
        {
          isCorrect: true,
          label: "Kein Mitglied von R10 ist Mitglied von T10.",
        },
        {
          isCorrect: false,
          label: "Einige Mitglieder von R10 sind Mitglieder von T10.",
        },
        {
          isCorrect: false,
          label: "Kein Mitglied von S10 ist Mitglied von R10.",
        },
        {
          isCorrect: false,
          label: "Einige Mitglieder von T10 sind keine Mitglieder von S10.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Every member of T10 is a member of R10.",
        },
        {
          isCorrect: true,
          label: "No member of R10 is a member of T10.",
        },
        {
          isCorrect: false,
          label: "Some members of R10 are members of T10.",
        },
        {
          isCorrect: false,
          label: "No member of S10 is a member of R10.",
        },
        {
          isCorrect: false,
          label: "Some members of T10 are not members of S10.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Semua anggota T10 merupakan anggota R10.",
        },
        {
          isCorrect: true,
          label: "Tidak ada anggota R10 yang merupakan anggota T10.",
        },
        {
          isCorrect: false,
          label: "Sebagian anggota R10 merupakan anggota T10.",
        },
        {
          isCorrect: false,
          label: "Tidak ada anggota S10 yang merupakan anggota R10.",
        },
        {
          isCorrect: false,
          label: "Sebagian anggota T10 bukan anggota S10.",
        },
      ],
    },
  },
};

export default item;
