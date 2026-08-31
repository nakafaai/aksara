import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Ein nachvollziehbarer Katalog muss mehrere Namen samt Quellen bewahren, damit Suchkomfort keine Zuschreibung löscht.",
        },
        {
          isCorrect: false,
          label:
            "Die Verantwortlichen könnten den am leichtesten auffindbaren Namen wählen und alle anderen löschen.",
        },
        {
          isCorrect: true,
          label:
            "Ein Foto ohne Herstellername verbreitete sich, während das Kuratorenlabel häufiger zitiert wurde als die Familienangabe.",
        },
        {
          isCorrect: false,
          label: "Suchergebnisse werden die Quelle jedes Namens anzeigen.",
        },
        {
          isCorrect: false,
          label:
            "Jedes Objekt muss ohne Haupttitel erscheinen, damit alle Namen wirklich gleichgestellt sind.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "A traceable catalogue must preserve multiple names and their sources so search convenience does not erase attribution.",
        },
        {
          isCorrect: false,
          label:
            "The managers could choose the easiest name to search and remove the others.",
        },
        {
          isCorrect: true,
          label:
            "A photograph without the maker's name circulated widely, while the curator's label was cited more often than the family's account.",
        },
        {
          isCorrect: false,
          label: "Search results will display the source of every name.",
        },
        {
          isCorrect: false,
          label:
            "Every object must be displayed without a primary title for all names to be truly equal.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Katalog yang dapat ditelusuri perlu menjaga berbagai nama beserta sumbernya agar kemudahan pencarian tidak menghapus atribusi.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola dapat memilih satu nama yang paling mudah dicari dan menghapus sebutan lainnya.",
        },
        {
          isCorrect: true,
          label:
            "Foto tanpa nama pembuat beredar luas, sedangkan label kurator lebih sering dikutip daripada keterangan keluarga.",
        },
        {
          isCorrect: false,
          label: "Hasil pencarian akan menampilkan sumber setiap nama.",
        },
        {
          isCorrect: false,
          label:
            "Setiap objek harus ditampilkan tanpa judul utama agar semua nama benar-benar setara.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
