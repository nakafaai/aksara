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
            "Die Aufzeichnungen werden vom frühesten bis zum spätesten Ereignis geordnet, damit die Abfolge nachvollziehbar ist.",
        },
        {
          isCorrect: true,
          label:
            "Die Daten werden nach einer geplanten Schrittfolge erhoben, die mit denselben Regeln wiederholt wird.",
        },
        {
          isCorrect: false,
          label:
            "Die Behauptung stützt sich auf wiederholte Beobachtungen und Messungen statt nur auf Vermutungen.",
        },
        {
          isCorrect: false,
          label:
            "Der Bericht bewertet Nutzen, Risiken, Kosten und Auswirkungen auf verschiedene Gruppen, bevor er eine Empfehlung abgibt.",
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
            "Records are arranged from the earliest event to the latest so the sequence of change can be traced.",
        },
        {
          isCorrect: true,
          label:
            "Data are collected through a planned sequence of steps repeated under the same rules.",
        },
        {
          isCorrect: false,
          label:
            "The claim is built from repeated observations and measurements rather than assumption alone.",
        },
        {
          isCorrect: false,
          label:
            "The report assesses benefits, risks, costs, and effects on different groups before making a recommendation.",
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
            "Catatan disusun dari kejadian paling awal hingga paling akhir agar urutan perubahan dapat ditelusuri.",
        },
        {
          isCorrect: true,
          label:
            "Data dikumpulkan menurut urutan langkah yang direncanakan dan diulang dengan aturan yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Klaim disusun dari pengamatan berulang dan hasil pengukuran, bukan dari dugaan semata.",
        },
        {
          isCorrect: false,
          label:
            "Laporan menilai manfaat, risiko, biaya, dan dampak pada berbagai kelompok sebelum memberi rekomendasi.",
        },
      ],
    },
  },
};

export default item;
