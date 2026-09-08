import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Zutaten wurden nach Rezeptschritten geordnet, weil eine alphabetische Ordnung nachweislich immer scheiterte.",
        },
        {
          isCorrect: false,
          label:
            "Die neue Anordnung wurde dauerhaft eingeführt und die alphabetische Ordnung abgeschafft.",
        },
        {
          isCorrect: true,
          label:
            "In Versuchseinheiten waren die Zutaten nach Rezeptschritten geordnet, während sie in Vergleichseinheiten alphabetisch auf dem gemeinsamen Tisch blieben.",
        },
        {
          isCorrect: false,
          label:
            "Beide Anordnungen wurden ohne getrennte Vergleichsbedingungen verwendet.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich die neue Anordnung nur mit Rückmeldungen zur alphabetischen Ordnung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Ingredients were arranged by recipe stage because alphabetical order had proved to fail in every situation.",
        },
        {
          isCorrect: false,
          label:
            "The new layout was adopted permanently and alphabetical order was discontinued.",
        },
        {
          isCorrect: true,
          label:
            "In trial sessions, ingredients were arranged by recipe stage, while in comparison sessions they remained in alphabetical order on the shared table.",
        },
        {
          isCorrect: false,
          label:
            "The new layout and alphabetical order were used without separate comparison conditions.",
        },
        {
          isCorrect: false,
          label:
            "The team compared the new layout only with comments about alphabetical order.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bahan disusun menurut tahap resep karena susunan abjad terbukti gagal dalam setiap keadaan.",
        },
        {
          isCorrect: false,
          label:
            "Susunan baru diterapkan permanen dan susunan abjad tidak digunakan lagi.",
        },
        {
          isCorrect: true,
          label:
            "Pada pertemuan uji, bahan disusun menurut tahap resep, sedangkan pada pertemuan pembanding bahan tetap diurutkan menurut abjad di meja bersama.",
        },
        {
          isCorrect: false,
          label:
            "Susunan baru dan susunan abjad digunakan tanpa kondisi pembanding terpisah.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan susunan baru hanya dengan komentar tentang susunan abjad.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
