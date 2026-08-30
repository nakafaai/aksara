import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Einige Mitglieder von R5 sind Mitglieder von T5.",
        },
        {
          isCorrect: false,
          label: "Kein Mitglied von S5 ist Mitglied von R5.",
        },
        {
          isCorrect: true,
          label: "Kein Mitglied von R5 ist Mitglied von T5.",
        },
        {
          isCorrect: false,
          label: "Einige Mitglieder von T5 sind keine Mitglieder von S5.",
        },
        {
          isCorrect: false,
          label: "Alle Mitglieder von T5 sind Mitglieder von R5.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Some members of R5 are members of T5.",
        },
        {
          isCorrect: false,
          label: "No member of S5 is a member of R5.",
        },
        {
          isCorrect: true,
          label: "No member of R5 is a member of T5.",
        },
        {
          isCorrect: false,
          label: "Some members of T5 are not members of S5.",
        },
        {
          isCorrect: false,
          label: "Every member of T5 is a member of R5.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sebagian anggota R5 merupakan anggota T5.",
        },
        {
          isCorrect: false,
          label: "Tidak ada anggota S5 yang merupakan anggota R5.",
        },
        {
          isCorrect: true,
          label: "Tidak ada anggota R5 yang merupakan anggota T5.",
        },
        {
          isCorrect: false,
          label: "Sebagian anggota T5 bukan anggota S5.",
        },
        {
          isCorrect: false,
          label: "Semua anggota T5 merupakan anggota R5.",
        },
      ],
    },
  },
};

export default item;
