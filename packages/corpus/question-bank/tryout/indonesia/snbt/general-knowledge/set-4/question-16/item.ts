import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Gebietsgrenzen zeichnen, ohne örtliche Namen zu untersuchen",
        },
        {
          isCorrect: false,
          label: "Reiseentfernungen zwischen zwei Orten messen",
        },
        {
          isCorrect: true,
          label:
            "die Untersuchung und Erfassung von Ortsnamen samt Herkunft und Verwendungskontext",
        },
        {
          isCorrect: false,
          label: "alle Ortsnamen auf eine amtliche Form vereinheitlichen",
        },
        {
          isCorrect: false,
          label: "neue Namen ohne Herkunft und Verwendungskontext auflisten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "drawing territorial boundaries without examining community place names",
        },
        {
          isCorrect: false,
          label: "measuring travel distance between two locations",
        },
        {
          isCorrect: true,
          label:
            "the study and recording of place names, including their origins and contexts of use",
        },
        {
          isCorrect: false,
          label: "standardising every place name into one official form",
        },
        {
          isCorrect: false,
          label: "a list of new names without their origin or context of use",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "penggambaran batas wilayah tanpa memeriksa nama yang dipakai masyarakat",
        },
        {
          isCorrect: false,
          label: "pengukuran jarak perjalanan antara dua lokasi",
        },
        {
          isCorrect: true,
          label:
            "kajian dan pencatatan nama tempat beserta asal serta konteks pemakaiannya",
        },
        {
          isCorrect: false,
          label: "penyeragaman seluruh nama tempat menjadi satu bentuk resmi",
        },
        {
          isCorrect: false,
          label: "daftar nama baru tanpa riwayat asal dan konteks pemakaiannya",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
