import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
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
        {
          isCorrect: true,
          label:
            "Ein Haupttitel kann der Navigation dienen, ohne zur einzigen Wahrheit über ein Objekt zu werden.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
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
        {
          isCorrect: true,
          label:
            "A primary title can support navigation without becoming the sole truth about an object.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
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
        {
          isCorrect: true,
          label:
            "Judul utama dapat dipakai untuk navigasi tanpa dijadikan satu-satunya kebenaran tentang objek.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
