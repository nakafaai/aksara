import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "eine wortgetreue Abschrift ohne Medienwechsel",
        },
        {
          isCorrect: false,
          label: "ein neues Werk, das nur den Titel der Vorlage übernimmt",
        },
        {
          isCorrect: true,
          label:
            "die Umgestaltung eines Werks in eine neue, dem Zweck und Medium entsprechende Form",
        },
        {
          isCorrect: false,
          label: "alle Fassungen ohne Herkunftsangabe der Teile vermischen",
        },
        {
          isCorrect: false,
          label:
            "eine Geschichte ohne Rücksicht auf den Aufführungszweck kürzen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "word-for-word transcription without a change of medium",
        },
        {
          isCorrect: false,
          label: "a new work that borrows only the source's title",
        },
        {
          isCorrect: true,
          label:
            "the reshaping of a work into a new form with changes suited to its purpose and medium",
        },
        {
          isCorrect: false,
          label:
            "merging every version without recording each section's origin",
        },
        {
          isCorrect: false,
          label:
            "shortening a story without considering the performance purpose",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "penyalinan kata demi kata tanpa perubahan medium",
        },
        {
          isCorrect: false,
          label: "karya baru yang hanya meminjam judul sumber",
        },
        {
          isCorrect: true,
          label:
            "pengolahan karya ke bentuk baru dengan perubahan yang sesuai tujuan dan mediumnya",
        },
        {
          isCorrect: false,
          label: "penggabungan semua versi tanpa mencatat asal setiap bagian",
        },
        {
          isCorrect: false,
          label: "pemendekan cerita tanpa mempertimbangkan tujuan pertunjukan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
