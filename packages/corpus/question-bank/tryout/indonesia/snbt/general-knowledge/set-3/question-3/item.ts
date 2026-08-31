import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Wiederholte Messungen bleiben trotz unterschiedlicher Erfassungszeiten in einem engen Bereich.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten werden nach einer geplanten Schrittfolge erhoben, die mit denselben Regeln wiederholt wird.",
        },
        {
          isCorrect: true,
          label:
            "Dieselbe Kodierregel wird auf jede Gruppe und jeden Messzeitraum angewendet.",
        },
        {
          isCorrect: false,
          label:
            "Die Behauptung stützt sich auf wiederholte Beobachtungen und Messungen statt nur auf Vermutungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Aufzeichnungen werden vom frühesten bis zum spätesten Ereignis geordnet, damit die Abfolge nachvollziehbar ist.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Repeated measurements remain within a narrow range even when taken at different times.",
        },
        {
          isCorrect: false,
          label:
            "Data are collected through a planned sequence of steps repeated under the same rules.",
        },
        {
          isCorrect: true,
          label:
            "The same coding rule is applied to every group and every measurement period.",
        },
        {
          isCorrect: false,
          label:
            "The claim is built from repeated observations and measurements rather than assumption alone.",
        },
        {
          isCorrect: false,
          label:
            "Records are arranged from the earliest event to the latest so the sequence of change can be traced.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nilai pengukuran berulang tetap berada dalam rentang sempit meskipun waktu pengambilan berbeda.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan menurut urutan langkah yang direncanakan dan diulang dengan aturan yang sama.",
        },
        {
          isCorrect: true,
          label:
            "Aturan pengodean yang sama diterapkan pada setiap kelompok dan setiap waktu pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Klaim disusun dari pengamatan berulang dan hasil pengukuran, bukan dari dugaan semata.",
        },
        {
          isCorrect: false,
          label:
            "Catatan disusun dari kejadian paling awal hingga paling akhir agar urutan perubahan dapat ditelusuri.",
        },
      ],
    },
  },
};

export default item;
