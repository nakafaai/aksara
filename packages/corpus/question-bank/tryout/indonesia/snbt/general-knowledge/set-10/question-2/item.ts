import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Zwei Sensoren erfassen das Ereignis im selben Zeitraum und nicht nacheinander.",
        },
        {
          isCorrect: false,
          label:
            "Die Aufzeichnungen werden vom frühesten bis zum spätesten Ereignis geordnet, damit die Abfolge nachvollziehbar ist.",
        },
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
            "Ausschläge treten zu unregelmäßigen Zeiten ohne festes Intervallmuster auf.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Two sensors record the event during the same interval rather than in succession.",
        },
        {
          isCorrect: false,
          label:
            "Records are arranged from the earliest event to the latest so the sequence of change can be traced.",
        },
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
            "Spikes appear at irregular times without a fixed interval pattern.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dua sensor merekam kejadian pada selang waktu yang sama, bukan secara bergantian.",
        },
        {
          isCorrect: false,
          label:
            "Catatan disusun dari kejadian paling awal hingga paling akhir agar urutan perubahan dapat ditelusuri.",
        },
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
            "Lonjakan muncul pada waktu yang tidak teratur tanpa pola selang yang tetap.",
        },
      ],
    },
  },
};

export default item;
