import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Einige Mitglieder von T7 sind keine Mitglieder von S7.",
        },
        {
          isCorrect: false,
          label: "Alle Mitglieder von T7 sind Mitglieder von R7.",
        },
        {
          isCorrect: true,
          label: "Kein Mitglied von R7 ist Mitglied von T7.",
        },
        {
          isCorrect: false,
          label: "Einige Mitglieder von R7 sind Mitglieder von T7.",
        },
        {
          isCorrect: false,
          label: "Kein Mitglied von S7 ist Mitglied von R7.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Some members of T7 are not members of S7.",
        },
        {
          isCorrect: false,
          label: "Every member of T7 is a member of R7.",
        },
        {
          isCorrect: true,
          label: "No member of R7 is a member of T7.",
        },
        {
          isCorrect: false,
          label: "Some members of R7 are members of T7.",
        },
        {
          isCorrect: false,
          label: "No member of S7 is a member of R7.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sebagian anggota T7 bukan anggota S7.",
        },
        {
          isCorrect: false,
          label: "Semua anggota T7 merupakan anggota R7.",
        },
        {
          isCorrect: true,
          label: "Tidak ada anggota R7 yang merupakan anggota T7.",
        },
        {
          isCorrect: false,
          label: "Sebagian anggota R7 merupakan anggota T7.",
        },
        {
          isCorrect: false,
          label: "Tidak ada anggota S7 yang merupakan anggota R7.",
        },
      ],
    },
  },
};

export default item;
