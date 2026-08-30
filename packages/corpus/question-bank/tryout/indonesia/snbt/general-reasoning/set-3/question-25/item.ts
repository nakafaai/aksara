import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kein Mitglied von S1 ist Mitglied von R1.",
        },
        {
          isCorrect: false,
          label: "Einige Mitglieder von T1 sind keine Mitglieder von S1.",
        },
        {
          isCorrect: true,
          label: "Kein Mitglied von R1 ist Mitglied von T1.",
        },
        {
          isCorrect: false,
          label: "Alle Mitglieder von T1 sind Mitglieder von R1.",
        },
        {
          isCorrect: false,
          label: "Einige Mitglieder von R1 sind Mitglieder von T1.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "No member of S1 is a member of R1.",
        },
        {
          isCorrect: false,
          label: "Some members of T1 are not members of S1.",
        },
        {
          isCorrect: true,
          label: "No member of R1 is a member of T1.",
        },
        {
          isCorrect: false,
          label: "Every member of T1 is a member of R1.",
        },
        {
          isCorrect: false,
          label: "Some members of R1 are members of T1.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tidak ada anggota S1 yang merupakan anggota R1.",
        },
        {
          isCorrect: false,
          label: "Sebagian anggota T1 bukan anggota S1.",
        },
        {
          isCorrect: true,
          label: "Tidak ada anggota R1 yang merupakan anggota T1.",
        },
        {
          isCorrect: false,
          label: "Semua anggota T1 merupakan anggota R1.",
        },
        {
          isCorrect: false,
          label: "Sebagian anggota R1 merupakan anggota T1.",
        },
      ],
    },
  },
};

export default item;
