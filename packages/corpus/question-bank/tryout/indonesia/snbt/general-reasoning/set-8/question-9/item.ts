import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Wer die eigene Zeit gut einteilt, erzielt kein hohes Prüfungsergebnis.",
        },
        {
          isCorrect: true,
          label:
            "Wer kein hohes Prüfungsergebnis erzielt, hat die eigene Zeit nicht gut eingeteilt.",
        },
        {
          isCorrect: false,
          label:
            "Wer regelmäßig lernt, muss die eigene Zeit gut eingeteilt haben.",
        },
        {
          isCorrect: false,
          label:
            "Ein hohes Prüfungsergebnis garantiert, dass regelmäßig gelernt wurde.",
        },
        {
          isCorrect: false,
          label:
            "Schlechte Zeiteinteilung garantiert ein hohes Prüfungsergebnis.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "A student who manages their time well does not achieve a high exam score.",
        },
        {
          isCorrect: true,
          label:
            "A student who does not achieve a high exam score did not manage their time well.",
        },
        {
          isCorrect: false,
          label:
            "Every student who studies consistently must manage their time well.",
        },
        {
          isCorrect: false,
          label:
            "A high exam score guarantees that a student studied consistently.",
        },
        {
          isCorrect: false,
          label:
            "Poor time management guarantees that a student achieves a high exam score.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Mahasiswa yang mengatur waktunya dengan baik tidak meraih nilai ujian tinggi.",
        },
        {
          isCorrect: true,
          label:
            "Mahasiswa yang tidak meraih nilai ujian tinggi tidak mengatur waktunya dengan baik.",
        },
        {
          isCorrect: false,
          label:
            "Setiap mahasiswa yang belajar secara konsisten pasti mengatur waktunya dengan baik.",
        },
        {
          isCorrect: false,
          label:
            "Nilai ujian tinggi menjamin bahwa mahasiswa belajar secara konsisten.",
        },
        {
          isCorrect: false,
          label:
            "Pengaturan waktu yang buruk menjamin mahasiswa meraih nilai ujian tinggi.",
        },
      ],
    },
  },
};

export default item;
