import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Wer kein hohes Prüfungsergebnis erzielt, hat die eigene Zeit nicht gut eingeteilt.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Wer die eigene Zeit gut einteilt, erzielt kein hohes Prüfungsergebnis.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Wer regelmäßig lernt, muss die eigene Zeit gut eingeteilt haben.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Ein hohes Prüfungsergebnis garantiert, dass regelmäßig gelernt wurde.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Schlechte Zeiteinteilung garantiert ein hohes Prüfungsergebnis.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "A student who does not achieve a high exam score did not manage their time well.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "A student who manages their time well does not achieve a high exam score.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Every student who studies consistently must manage their time well.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "A high exam score guarantees that a student studied consistently.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Poor time management guarantees that a student achieves a high exam score.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Mahasiswa yang tidak meraih nilai ujian tinggi tidak mengatur waktunya dengan baik.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mahasiswa yang mengatur waktunya dengan baik tidak meraih nilai ujian tinggi.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Setiap mahasiswa yang belajar secara konsisten pasti mengatur waktunya dengan baik.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Nilai ujian tinggi menjamin bahwa mahasiswa belajar secara konsisten.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pengaturan waktu yang buruk menjamin mahasiswa meraih nilai ujian tinggi.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
