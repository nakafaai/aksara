import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "eine geordnete Ereignisliste ohne analytische Phasen",
        },
        {
          isCorrect: false,
          label: "das älteste Datum als Beginn für jeden Zweck wählen",
        },
        {
          isCorrect: false,
          label:
            "Übergangszeiten entfernen, damit jede Phase eine scharfe Grenze hat",
        },
        {
          isCorrect: false,
          label: "ein sehr genaues Datum ohne Quellenbeleg schätzen",
        },
        {
          isCorrect: true,
          label:
            "die Einteilung von Zeit in Phasen zur Erklärung bestimmter Veränderungen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "an ordered event list without analytical stages",
        },
        {
          isCorrect: false,
          label:
            "selection of the oldest date as the beginning for every purpose",
        },
        {
          isCorrect: false,
          label:
            "removal of transitional periods so every stage has a sharp boundary",
        },
        {
          isCorrect: false,
          label: "a highly precise date estimate without source support",
        },
        {
          isCorrect: true,
          label:
            "the division of time into stages selected to explain particular changes",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "daftar peristiwa berurutan tanpa pembagian tahap analisis",
        },
        {
          isCorrect: false,
          label: "pemilihan tanggal tertua sebagai awal untuk semua tujuan",
        },
        {
          isCorrect: false,
          label:
            "penghapusan masa peralihan agar setiap tahap memiliki batas tegas",
        },
        {
          isCorrect: false,
          label: "perkiraan tanggal yang sangat rinci tanpa dukungan sumber",
        },
        {
          isCorrect: true,
          label:
            "pembagian waktu ke dalam tahap yang dipilih untuk menjelaskan perubahan tertentu",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
