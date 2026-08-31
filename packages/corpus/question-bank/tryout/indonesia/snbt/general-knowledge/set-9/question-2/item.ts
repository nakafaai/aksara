import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dieselbe Kodierregel wird auf jede Gruppe und jeden Messzeitraum angewendet.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten werden nach einer geplanten Schrittfolge erhoben, die mit denselben Regeln wiederholt wird.",
        },
        {
          isCorrect: false,
          label:
            "Zwei Sensoren erfassen das Ereignis im selben Zeitraum und nicht nacheinander.",
        },
        {
          isCorrect: true,
          label:
            "Wiederholte Messungen bleiben trotz unterschiedlicher Erfassungszeiten in einem engen Bereich.",
        },
        {
          isCorrect: false,
          label:
            "Die Methode erlaubt mehrere Durchführungswege, die denselben Ergebniskriterien unterliegen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The same coding rule is applied to every group and every measurement period.",
        },
        {
          isCorrect: false,
          label:
            "Data are collected through a planned sequence of steps repeated under the same rules.",
        },
        {
          isCorrect: false,
          label:
            "Two sensors record the event during the same interval rather than in succession.",
        },
        {
          isCorrect: true,
          label:
            "Repeated measurements remain within a narrow range even when taken at different times.",
        },
        {
          isCorrect: false,
          label:
            "The method allows several implementation paths that remain subject to the same outcome criteria.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Aturan pengodean yang sama diterapkan pada setiap kelompok dan setiap waktu pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan menurut urutan langkah yang direncanakan dan diulang dengan aturan yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Dua sensor merekam kejadian pada selang waktu yang sama, bukan secara bergantian.",
        },
        {
          isCorrect: true,
          label:
            "Nilai pengukuran berulang tetap berada dalam rentang sempit meskipun waktu pengambilan berbeda.",
        },
        {
          isCorrect: false,
          label:
            "Metode menyediakan beberapa jalur pelaksanaan yang tetap tunduk pada kriteria hasil yang sama.",
        },
      ],
    },
  },
};

export default item;
