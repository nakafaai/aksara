import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label:
        "A student who does not achieve a high exam score did not manage their time well.",
      value: true,
    },
    {
      label:
        "A student who manages their time well does not achieve a high exam score.",
      value: false,
    },
    {
      label:
        "Every student who studies consistently must manage their time well.",
      value: false,
    },
    {
      label:
        "A high exam score guarantees that a student studied consistently.",
      value: false,
    },
    {
      label:
        "Poor time management guarantees that a student achieves a high exam score.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Mahasiswa yang tidak meraih nilai ujian tinggi tidak mengatur waktunya dengan baik.",
      value: true,
    },
    {
      label:
        "Mahasiswa yang mengatur waktunya dengan baik tidak meraih nilai ujian tinggi.",
      value: false,
    },
    {
      label:
        "Setiap mahasiswa yang belajar secara konsisten pasti mengatur waktunya dengan baik.",
      value: false,
    },
    {
      label:
        "Nilai ujian tinggi menjamin bahwa mahasiswa belajar secara konsisten.",
      value: false,
    },
    {
      label:
        "Pengaturan waktu yang buruk menjamin mahasiswa meraih nilai ujian tinggi.",
      value: false,
    },
  ],
};

export default choices;
