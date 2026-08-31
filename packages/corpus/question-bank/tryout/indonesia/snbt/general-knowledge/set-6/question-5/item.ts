import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Ein Pfand kann Abfall senken, muss aber zusammen mit Zugang und Kosten für verschiedene Gruppen bewertet werden.",
        },
        {
          isCorrect: false,
          label:
            "Einige Händler meinen, Sauberkeit solle aus dem Veranstaltungsbudget finanziert werden, ohne Behälterpreise zu ändern.",
        },
        {
          isCorrect: false,
          label:
            "Die Abschlussbewertung wird Reinigungskosten und verlorene Behälter berücksichtigen.",
        },
        {
          isCorrect: false,
          label:
            "Die Rückgabequote des ersten Abends beweist, dass das System unverändert dauerhaft eingeführt werden sollte.",
        },
        {
          isCorrect: true,
          label:
            "Nach verbessertem Zugang wurde der Unterschied der Rückgabequoten kleiner.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "A deposit can reduce waste, but success must be judged alongside service access and costs for different groups.",
        },
        {
          isCorrect: false,
          label:
            "Some vendors argue that cleanliness should be funded from the event budget without changing container prices.",
        },
        {
          isCorrect: false,
          label:
            "The final evaluation will include washing costs and lost containers.",
        },
        {
          isCorrect: false,
          label:
            "The first-night return rate proves the system should become permanent without revision.",
        },
        {
          isCorrect: true,
          label:
            "After desk access improved, the return-rate gap across the site narrowed.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Uang jaminan dapat mengurangi sampah, tetapi keberhasilannya harus dinilai bersama akses layanan dan biaya bagi berbagai pihak.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian pedagang menilai kebersihan seharusnya dibiayai dari anggaran acara tanpa mengubah harga wadah.",
        },
        {
          isCorrect: false,
          label:
            "Evaluasi akhir akan memasukkan biaya pencucian dan kehilangan wadah.",
        },
        {
          isCorrect: false,
          label:
            "Tingkat pengembalian malam pertama membuktikan sistem harus diterapkan permanen tanpa perubahan.",
        },
        {
          isCorrect: true,
          label:
            "Setelah akses loket diperbaiki, selisih tingkat pengembalian antarbagian area mengecil.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
