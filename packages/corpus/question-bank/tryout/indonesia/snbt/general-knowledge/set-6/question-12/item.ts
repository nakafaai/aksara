import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Rückgabequote des ersten Abends beweist, dass das System unverändert dauerhaft eingeführt werden sollte.",
        },
        {
          isCorrect: false,
          label:
            "Weil Beschwerden auftraten, kann ein Pfand das Verhalten nicht beeinflussen.",
        },
        {
          isCorrect: false,
          label: "Eine Rückgabestelle wurde verlegt und länger geöffnet.",
        },
        {
          isCorrect: true,
          label:
            "Ein Anreiz wirkt über einen konkreten Dienst; die einfache Pfanderstattung beeinflusst daher das Ergebnis.",
        },
        {
          isCorrect: false,
          label:
            "Ein Pfand kann Abfall senken, muss aber zusammen mit Zugang und Kosten für verschiedene Gruppen bewertet werden.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The first-night return rate proves the system should become permanent without revision.",
        },
        {
          isCorrect: false,
          label:
            "Because complaints occurred, a deposit cannot influence visitor behaviour.",
        },
        {
          isCorrect: false,
          label: "One return desk was moved and its hours were extended.",
        },
        {
          isCorrect: true,
          label:
            "An incentive operates through a concrete service, so ease of receiving the refund helps determine the outcome.",
        },
        {
          isCorrect: false,
          label:
            "A deposit can reduce waste, but success must be judged alongside service access and costs for different groups.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tingkat pengembalian malam pertama membuktikan sistem harus diterapkan permanen tanpa perubahan.",
        },
        {
          isCorrect: false,
          label:
            "Karena ada keluhan, uang jaminan tidak mungkin memengaruhi perilaku pengunjung.",
        },
        {
          isCorrect: false,
          label: "Satu loket dipindahkan dan jam layanannya diperpanjang.",
        },
        {
          isCorrect: true,
          label:
            "Insentif bekerja melalui layanan yang konkret, sehingga kemudahan memperoleh pengembalian dana ikut menentukan hasil.",
        },
        {
          isCorrect: false,
          label:
            "Uang jaminan dapat mengurangi sampah, tetapi keberhasilannya harus dinilai bersama akses layanan dan biaya bagi berbagai pihak.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
