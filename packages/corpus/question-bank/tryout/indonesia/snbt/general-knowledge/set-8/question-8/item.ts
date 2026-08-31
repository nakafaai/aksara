import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die Datenbankstruktur kann beeinflussen, wessen Bezeichnung Nutzern am legitimsten erscheint.",
        },
        {
          isCorrect: false,
          label:
            "Jedes Objekt muss ohne Haupttitel erscheinen, damit alle Namen wirklich gleichgestellt sind.",
        },
        {
          isCorrect: false,
          label:
            "Der am häufigsten zitierte Name muss von der Herstellerin stammen.",
        },
        {
          isCorrect: false,
          label: "Ein Name im alten Buch wurde von einem Kurator geschaffen.",
        },
        {
          isCorrect: false,
          label: "Suchergebnisse werden die Quelle jedes Namens anzeigen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Database structure can influence whose name appears most legitimate to users.",
        },
        {
          isCorrect: false,
          label:
            "Every object must be displayed without a primary title for all names to be truly equal.",
        },
        {
          isCorrect: false,
          label:
            "The most frequently cited name must be the one given by the cloth's maker.",
        },
        {
          isCorrect: false,
          label: "One name in an old book was created by a curator.",
        },
        {
          isCorrect: false,
          label: "Search results will display the source of every name.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Struktur basis data dapat memengaruhi nama siapa yang tampak paling sah bagi pengguna.",
        },
        {
          isCorrect: false,
          label:
            "Setiap objek harus ditampilkan tanpa judul utama agar semua nama benar-benar setara.",
        },
        {
          isCorrect: false,
          label:
            "Nama yang paling sering dikutip pasti merupakan nama yang diberikan pembuat kain.",
        },
        {
          isCorrect: false,
          label: "Salah satu nama dalam buku lama dibuat oleh kurator.",
        },
        {
          isCorrect: false,
          label: "Hasil pencarian akan menampilkan sumber setiap nama.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
