import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Botschaften über deskriptive Normen können Verhalten ändern, doch ihr Effekt muss von anderen Faktoren getrennt und ihre Aussage korrekt sein.",
        },
        {
          isCorrect: false,
          label:
            "Der Betreiber könnte mehr Verbotsschilder aufstellen, ohne Botschaft oder Messung zu ändern.",
        },
        {
          isCorrect: true,
          label:
            "Im ersten Test hatten Busse mit neuer Botschaft zugleich häufiger Freiwillige und zusätzlich informierte Fahrer.",
        },
        {
          isCorrect: false,
          label:
            "Der Betreiber wird Mehrheitszahlen aus aktuellen Beobachtungen verwenden.",
        },
        {
          isCorrect: false,
          label:
            "Jede Botschaft mit einer Mehrheitsangabe verändert sicher das Verhalten aller Fahrgäste.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Descriptive-norm messages can change behaviour, but their effect must be separated from other factors and their claims must be accurate.",
        },
        {
          isCorrect: false,
          label:
            "The operator could post more prohibitions without changing the message or measurement design.",
        },
        {
          isCorrect: true,
          label:
            "In the first trial, buses with the new message also had more volunteer presence and drivers with extra guidance.",
        },
        {
          isCorrect: false,
          label:
            "The operator will use majority figures drawn from recent observations.",
        },
        {
          isCorrect: false,
          label:
            "Any message mentioning a majority will certainly change every passenger's behaviour.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pesan norma deskriptif dapat mengubah perilaku, tetapi efeknya harus dipisahkan dari faktor lain dan klaimnya harus akurat.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola dapat memasang lebih banyak larangan tanpa mengubah pesan atau cara pengukuran.",
        },
        {
          isCorrect: true,
          label:
            "Bus dengan pesan baru pada uji awal juga lebih sering didampingi relawan dan memiliki pengemudi yang mendapat pengarahan tambahan.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola akan menggunakan angka mayoritas yang berasal dari pengamatan terbaru.",
        },
        {
          isCorrect: false,
          label:
            "Setiap pesan yang menyebut mayoritas pasti mengubah perilaku semua penumpang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
