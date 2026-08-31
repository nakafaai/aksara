import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Anonyme Beobachter verwendeten vorab festgelegte Lautstärkekriterien.",
        },
        {
          isCorrect: true,
          label:
            "Botschaften über deskriptive Normen können Verhalten ändern, doch ihr Effekt muss von anderen Faktoren getrennt und ihre Aussage korrekt sein.",
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
            "Der Betreiber wird Mehrheitszahlen aus aktuellen Beobachtungen verwenden.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Anonymous observers used predefined volume criteria.",
        },
        {
          isCorrect: true,
          label:
            "Descriptive-norm messages can change behaviour, but their effect must be separated from other factors and their claims must be accurate.",
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
          label:
            "The operator will use majority figures drawn from recent observations.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengamat anonim memakai kriteria volume yang telah ditetapkan.",
        },
        {
          isCorrect: true,
          label:
            "Pesan norma deskriptif dapat mengubah perilaku, tetapi efeknya harus dipisahkan dari faktor lain dan klaimnya harus akurat.",
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
            "Pengelola akan menggunakan angka mayoritas yang berasal dari pengamatan terbaru.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
