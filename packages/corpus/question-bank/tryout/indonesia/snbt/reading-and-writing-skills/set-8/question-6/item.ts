import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Im Kontext öffentliche Laborführung verursachte die Änderung Fragekarten an jedem Demonstrationstisch den höheren Testwert.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext öffentliche Laborführung verbesserten sich sämtliche Teilnehmenden um denselben Wert.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext öffentliche Laborführung waren die beiden Vergleichswerte identisch.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext öffentliche Laborführung belegte der kurze Test das langfristige Ergebnis.",
        },
        {
          isCorrect: true,
          label:
            "Der Versuchswert lag im Kontext Tag der offenen Labortür über den beiden anderen Werten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "In this setting (open laboratory tour), question cards at each demonstration table caused the higher trial value.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (open laboratory tour), each participant improved by the same amount.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (open laboratory tour), the two comparison values were identical.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (open laboratory tour), the short trial established the long-term result.",
        },
        {
          isCorrect: true,
          label:
            "In this setting (open laboratory tour), the trial value exceeded both other values.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dalam konteks tur laboratorium terbuka, kartu pertanyaan di setiap meja demonstrasi menyebabkan nilai uji menjadi lebih tinggi.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks tur laboratorium terbuka, setiap peserta mengalami peningkatan yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks tur laboratorium terbuka, kedua nilai pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks tur laboratorium terbuka, uji singkat menetapkan hasil jangka panjang.",
        },
        {
          isCorrect: true,
          label:
            "Di tur laboratorium terbuka, nilai hari uji melampaui dua nilai lainnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
