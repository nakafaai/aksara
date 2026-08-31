import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "ein Findmittel zum Auffinden von Quellen und kein Ersatz für die Quellen selbst",
        },
        {
          isCorrect: false,
          label:
            "eine endgültige Abschrift als Ersatz für das Originaldokument",
        },
        {
          isCorrect: false,
          label: "eine Rangfolge mit garantiert relevantestem erstem Treffer",
        },
        {
          isCorrect: false,
          label:
            "ein Ersatz für das Originalbild bei maschinell unlesbarem Text",
        },
        {
          isCorrect: false,
          label: "ein Beweis, dass eine nicht gefundene Quelle nicht existiert",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "a finding aid used to locate sources rather than a substitute for the sources themselves",
        },
        {
          isCorrect: false,
          label: "a final transcript that replaces the original document",
        },
        {
          isCorrect: false,
          label:
            "a ranking that guarantees the first result is always most relevant",
        },
        {
          isCorrect: false,
          label:
            "a substitute for the original image when text is machine-unreadable",
        },
        {
          isCorrect: false,
          label: "proof that a source absent from results does not exist",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "sarana penunjuk untuk menemukan sumber, bukan pengganti sumber itu sendiri",
        },
        {
          isCorrect: false,
          label: "salinan final yang menggantikan dokumen asli",
        },
        {
          isCorrect: false,
          label:
            "peringkat hasil yang menjamin dokumen pertama selalu paling relevan",
        },
        {
          isCorrect: false,
          label: "pengganti gambar asli ketika teks tidak dapat dibaca mesin",
        },
        {
          isCorrect: false,
          label: "bukti bahwa sumber yang tidak muncul benar-benar tidak ada",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
