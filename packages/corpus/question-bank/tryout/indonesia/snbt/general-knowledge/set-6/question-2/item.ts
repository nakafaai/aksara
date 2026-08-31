import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Der Bericht bewertet Nutzen, Risiken, Kosten und Auswirkungen auf verschiedene Gruppen, bevor er eine Empfehlung abgibt.",
        },
        {
          isCorrect: false,
          label:
            "Eine Anweisung verwendet das Wort 'bald' ohne Zeitgrenze, sodass zwei Personen sie unterschiedlich auslegen.",
        },
        {
          isCorrect: true,
          label:
            "Das Modell berücksichtigt Wechselwirkungen zwischen Wetter, Nutzerverhalten und Fahrplan, statt nur eine Ursache zu suchen.",
        },
        {
          isCorrect: false,
          label:
            "Eine grundlegende Annahme wird zuerst geprüft, weil alle späteren Schlussfolgerungen von ihr abhängen.",
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
            "The report assesses benefits, risks, costs, and effects on different groups before making a recommendation.",
        },
        {
          isCorrect: false,
          label:
            "An instruction uses 'soon' without a time limit, causing two operators to interpret it differently.",
        },
        {
          isCorrect: true,
          label:
            "The model considers interactions among weather, user behaviour, and service schedules instead of seeking one cause.",
        },
        {
          isCorrect: false,
          label:
            "A basic assumption is examined first because every later conclusion depends on it.",
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
            "Laporan menilai manfaat, risiko, biaya, dan dampak pada berbagai kelompok sebelum memberi rekomendasi.",
        },
        {
          isCorrect: false,
          label:
            "Petunjuk memakai kata 'segera' tanpa batas waktu sehingga dua pelaksana menafsirkannya secara berbeda.",
        },
        {
          isCorrect: true,
          label:
            "Model mempertimbangkan interaksi cuaca, perilaku pengguna, dan jadwal layanan alih-alih mencari satu penyebab tunggal.",
        },
        {
          isCorrect: false,
          label:
            "Satu asumsi dasar diperiksa lebih dahulu karena seluruh simpulan berikutnya bergantung padanya.",
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
