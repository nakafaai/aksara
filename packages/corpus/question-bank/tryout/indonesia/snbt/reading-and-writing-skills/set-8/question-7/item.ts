import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Karten wurden verwendet, weil die allgemeine Aufforderung nachweislich immer scheiterte.",
        },
        {
          isCorrect: false,
          label:
            "Die Karten wurden dauerhaft eingeführt und die allgemeine Aufforderung eingestellt.",
        },
        {
          isCorrect: false,
          label:
            "Karten und allgemeine Aufforderung wurden ohne getrennte Vergleichsbedingungen verwendet.",
        },
        {
          isCorrect: true,
          label:
            "Bei den Versuchsterminen zeigte jeder Tisch eine Karte mit zwei Fragen zur jeweiligen Vorführung, während beim Vergleich die bisherige allgemeine Aufforderung galt.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich den Karteneinsatz nur mit Rückmeldungen zur allgemeinen Aufforderung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The cards were used because the general invitation had proved to fail in every situation.",
        },
        {
          isCorrect: false,
          label:
            "The cards were adopted permanently and the general invitation was discontinued.",
        },
        {
          isCorrect: false,
          label:
            "Cards and the general invitation were used without separate comparison conditions.",
        },
        {
          isCorrect: true,
          label:
            "In trial sessions, each table displayed a card with two questions specific to its demonstration, while comparison sessions used the previous general invitation.",
        },
        {
          isCorrect: false,
          label:
            "The team compared card use only with comments about the general invitation.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kartu digunakan karena undangan umum terbukti gagal dalam setiap keadaan.",
        },
        {
          isCorrect: false,
          label:
            "Kartu diterapkan permanen dan undangan umum tidak dipakai lagi.",
        },
        {
          isCorrect: false,
          label:
            "Kartu dan undangan umum digunakan tanpa kondisi pembanding terpisah.",
        },
        {
          isCorrect: true,
          label:
            "Pada sesi uji, setiap meja memuat kartu dengan dua pertanyaan khusus untuk demonstrasinya, sedangkan sesi pembanding memakai undangan umum sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan penggunaan kartu hanya dengan komentar tentang undangan umum.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
