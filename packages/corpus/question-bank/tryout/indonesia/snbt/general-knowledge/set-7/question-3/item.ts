import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Bewertung bezieht betroffene Gruppen mit unterschiedlichen Mobilitäts-, Sprach- und Zugangsbedürfnissen ein.",
        },
        {
          isCorrect: true,
          label:
            "Der Bericht bewertet Nutzen, Risiken, Kosten und Auswirkungen auf verschiedene Gruppen, bevor er eine Empfehlung abgibt.",
        },
        {
          isCorrect: false,
          label:
            "Das Modell berücksichtigt Wechselwirkungen zwischen Wetter, Nutzerverhalten und Fahrplan, statt nur eine Ursache zu suchen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team legt Daten, Methoden, Ausschlussgründe und Grenzen offen, damit der Prozess geprüft werden kann.",
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
          isCorrect: false,
          label:
            "The evaluation involves affected groups with different mobility, language, and access needs.",
        },
        {
          isCorrect: true,
          label:
            "The report assesses benefits, risks, costs, and effects on different groups before making a recommendation.",
        },
        {
          isCorrect: false,
          label:
            "The model considers interactions among weather, user behaviour, and service schedules instead of seeking one cause.",
        },
        {
          isCorrect: false,
          label:
            "The team discloses data, methods, exclusion reasons, and limitations so the process can be examined.",
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
          isCorrect: false,
          label:
            "Evaluasi melibatkan kelompok terdampak dengan kebutuhan mobilitas, bahasa, dan akses yang berbeda.",
        },
        {
          isCorrect: true,
          label:
            "Laporan menilai manfaat, risiko, biaya, dan dampak pada berbagai kelompok sebelum memberi rekomendasi.",
        },
        {
          isCorrect: false,
          label:
            "Model mempertimbangkan interaksi cuaca, perilaku pengguna, dan jadwal layanan alih-alih mencari satu penyebab tunggal.",
        },
        {
          isCorrect: false,
          label:
            "Tim membuka data, metode, alasan pengecualian, dan keterbatasan agar proses dapat diperiksa.",
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
