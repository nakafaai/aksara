import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Kein Mitglied von R3 ist Mitglied von T3.",
        },
        {
          isCorrect: false,
          label: "Alle Mitglieder von T3 sind Mitglieder von R3.",
        },
        {
          isCorrect: false,
          label: "Einige Mitglieder von R3 sind Mitglieder von T3.",
        },
        {
          isCorrect: false,
          label: "Kein Mitglied von S3 ist Mitglied von R3.",
        },
        {
          isCorrect: false,
          label: "Einige Mitglieder von T3 sind keine Mitglieder von S3.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "No member of R3 is a member of T3.",
        },
        {
          isCorrect: false,
          label: "Every member of T3 is a member of R3.",
        },
        {
          isCorrect: false,
          label: "Some members of R3 are members of T3.",
        },
        {
          isCorrect: false,
          label: "No member of S3 is a member of R3.",
        },
        {
          isCorrect: false,
          label: "Some members of T3 are not members of S3.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Tidak ada anggota R3 yang merupakan anggota T3.",
        },
        {
          isCorrect: false,
          label: "Semua anggota T3 merupakan anggota R3.",
        },
        {
          isCorrect: false,
          label: "Sebagian anggota R3 merupakan anggota T3.",
        },
        {
          isCorrect: false,
          label: "Tidak ada anggota S3 yang merupakan anggota R3.",
        },
        {
          isCorrect: false,
          label: "Sebagian anggota T3 bukan anggota S3.",
        },
      ],
    },
  },
};

export default item;
