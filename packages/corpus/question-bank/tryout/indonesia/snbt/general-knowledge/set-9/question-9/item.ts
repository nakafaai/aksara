import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Ein Teil des ersten Rückgangs kann auf Freiwillige oder Hinweise an Fahrer zurückgehen.",
        },
        {
          isCorrect: false,
          label:
            "Jede Botschaft mit einer Mehrheitsangabe verändert sicher das Verhalten aller Fahrgäste.",
        },
        {
          isCorrect: false,
          label:
            "Weil Beschwerden sanken, muss die Gesamtzahl lauter Gespräche im selben Maß gesunken sein.",
        },
        {
          isCorrect: false,
          label:
            "Anonyme Beobachter verwendeten vorab festgelegte Lautstärkekriterien.",
        },
        {
          isCorrect: false,
          label:
            "Der Betreiber wird Mehrheitszahlen aus aktuellen Beobachtungen verwenden.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Part of the initial complaint reduction may have resulted from volunteer presence or driver guidance.",
        },
        {
          isCorrect: false,
          label:
            "Any message mentioning a majority will certainly change every passenger's behaviour.",
        },
        {
          isCorrect: false,
          label:
            "Because complaints fell, the total number of loud conversations must have fallen by the same amount.",
        },
        {
          isCorrect: false,
          label: "Anonymous observers used predefined volume criteria.",
        },
        {
          isCorrect: false,
          label:
            "The operator will use majority figures drawn from recent observations.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Sebagian penurunan keluhan awal mungkin berasal dari kehadiran relawan atau pengarahan pengemudi.",
        },
        {
          isCorrect: false,
          label:
            "Setiap pesan yang menyebut mayoritas pasti mengubah perilaku semua penumpang.",
        },
        {
          isCorrect: false,
          label:
            "Karena keluhan berkurang, jumlah seluruh percakapan keras pasti turun dengan ukuran yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Pengamat anonim memakai kriteria volume yang telah ditetapkan.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola akan menggunakan angka mayoritas yang berasal dari pengamatan terbaru.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
