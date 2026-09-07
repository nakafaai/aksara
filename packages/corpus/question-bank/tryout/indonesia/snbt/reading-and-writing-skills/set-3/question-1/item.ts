import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Ausgangsbeobachtungen vor dem Test neuer Evakuierungszeichen",
        },
        {
          isCorrect: false,
          label: "Gleichzeitiger Test mehrerer Änderungen am Evakuierungsplan",
        },
        {
          isCorrect: false,
          label:
            "Rückmeldungen zur dauerhaften Neugestaltung eines Evakuierungsplans",
        },
        {
          isCorrect: false,
          label:
            "Vollständige Bewertung aller Bestandteile eines Evakuierungsplans",
        },
        {
          isCorrect: true,
          label: "Kontrastreichere Sammelpunktsymbole im Test",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Baseline Observations Before Testing Evacuation Symbols",
        },
        {
          isCorrect: false,
          label: "Testing Several Simultaneous Changes to an Evacuation Map",
        },
        {
          isCorrect: false,
          label:
            "Participant Reactions to a Permanent Redesign of an Evacuation Map",
        },
        {
          isCorrect: false,
          label: "A Complete Evaluation of Every Feature of an Evacuation Map",
        },
        {
          isCorrect: true,
          label: "Testing Higher-Contrast Assembly-Point Symbols",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Catatan Awal Sebelum Pengujian Simbol Evakuasi",
        },
        {
          isCorrect: false,
          label: "Pengujian Beberapa Perubahan Serentak pada Peta Evakuasi",
        },
        {
          isCorrect: false,
          label:
            "Tanggapan Peserta terhadap Perancangan Ulang Permanen Peta Evakuasi",
        },
        {
          isCorrect: false,
          label: "Evaluasi Menyeluruh atas Semua Unsur Peta Evakuasi",
        },
        {
          isCorrect: true,
          label: "Pengujian Simbol Titik Kumpul yang Lebih Kontras",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
