import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Namen nach der Häufigkeit ihrer Suche ordnen",
        },
        {
          isCorrect: false,
          label: "alle Bezeichnungen zu einem Standardnamen zusammenführen",
        },
        {
          isCorrect: false,
          label: "das Alter eines Objekts aus der Motivform schätzen",
        },
        {
          isCorrect: false,
          label:
            "anonym klassifizieren, ohne die auskunftgebende Person zu nennen",
        },
        {
          isCorrect: true,
          label:
            "die Angabe der Person oder Quelle, von der ein Name, Werk oder eine Beschreibung stammt",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "ranking names by how often users search for them",
        },
        {
          isCorrect: false,
          label: "merging every term into one standard name",
        },
        {
          isCorrect: false,
          label: "estimating an object's age from the form of its motif",
        },
        {
          isCorrect: false,
          label:
            "anonymous classification without recording who supplied a description",
        },
        {
          isCorrect: true,
          label:
            "the identification of the person or source responsible for a name, work, or description",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "peringkat nama berdasarkan seberapa sering dicari pengguna",
        },
        {
          isCorrect: false,
          label: "penyatuan semua sebutan menjadi satu nama baku",
        },
        {
          isCorrect: false,
          label: "perkiraan umur objek dari bentuk motifnya",
        },
        {
          isCorrect: false,
          label: "pengelompokan anonim tanpa mencatat pemberi keterangan",
        },
        {
          isCorrect: true,
          label:
            "pencantuman pihak atau sumber yang bertanggung jawab atas suatu nama, karya, atau keterangan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
