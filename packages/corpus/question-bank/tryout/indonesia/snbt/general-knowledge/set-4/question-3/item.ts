import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Feldverfahren wird bei verändertem Wetter angepasst, ohne das Hauptziel oder die zentralen Messregeln zu ändern.",
        },
        {
          isCorrect: false,
          label:
            "Die Methode erlaubt mehrere Durchführungswege, die denselben Ergebniskriterien unterliegen.",
        },
        {
          isCorrect: false,
          label:
            "Nach einer Beschwerde wird das Hauptziel aufgegeben und ein nicht damit zusammenhängendes Ergebnis zum neuen Ziel erklärt.",
        },
        {
          isCorrect: false,
          label:
            "Die Ausrüstung wird geprüft und verschlissene Teile werden ersetzt, bevor ein Ausfall eintritt.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten werden nach einer geplanten Schrittfolge erhoben, die mit denselben Regeln wiederholt wird.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The field procedure is adjusted when the weather changes without altering the main objective or measurement rules.",
        },
        {
          isCorrect: false,
          label:
            "The method allows several implementation paths that remain subject to the same outcome criteria.",
        },
        {
          isCorrect: false,
          label:
            "After a complaint, the main objective is abandoned and an unrelated outcome becomes the new goal.",
        },
        {
          isCorrect: false,
          label:
            "Equipment is inspected and worn parts are replaced before a failure occurs.",
        },
        {
          isCorrect: false,
          label:
            "Data are collected through a planned sequence of steps repeated under the same rules.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Prosedur lapangan disesuaikan saat cuaca berubah tanpa mengubah tujuan dan aturan ukur utama.",
        },
        {
          isCorrect: false,
          label:
            "Metode menyediakan beberapa jalur pelaksanaan yang tetap tunduk pada kriteria hasil yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Setelah ada keluhan, tujuan utama dibatalkan dan diganti dengan hasil lain yang tidak berkaitan.",
        },
        {
          isCorrect: false,
          label:
            "Peralatan diperiksa dan komponen aus diganti sebelum kegagalan terjadi.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan menurut urutan langkah yang direncanakan dan diulang dengan aturan yang sama.",
        },
      ],
    },
  },
};

export default item;
