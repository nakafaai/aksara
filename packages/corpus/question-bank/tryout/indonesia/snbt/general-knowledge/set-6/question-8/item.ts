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
          isCorrect: true,
          label:
            "Die erste Rückgabequote kann sowohl den Pfandanreiz als auch die Nähe zur Rückgabestelle widerspiegeln.",
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
          isCorrect: false,
          label:
            "Die Abschlussbewertung wird Reinigungskosten und verlorene Behälter berücksichtigen.",
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
          isCorrect: true,
          label:
            "The initial return rate may combine the effect of the incentive with the effect of desk proximity.",
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
          isCorrect: false,
          label:
            "The final evaluation will include washing costs and lost containers.",
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
          isCorrect: true,
          label:
            "Tingkat pengembalian awal mungkin mencampurkan pengaruh insentif dan kedekatan loket.",
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
          isCorrect: false,
          label:
            "Evaluasi akhir akan memasukkan biaya pencucian dan kehilangan wadah.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
