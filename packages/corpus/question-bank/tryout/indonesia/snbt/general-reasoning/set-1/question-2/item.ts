import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Örtliche Landwirte erzeugten Agri Gardina 45 ausschließlich durch Selektion.",
        },
        {
          isCorrect: false,
          label:
            "Denarum Agrihorti wurde aus kommerziellen Mangos in Kalifornien selektiert.",
        },
        {
          isCorrect: true,
          label:
            "Die Forschenden nutzen sowohl Selektion als auch Kreuzung, um die Mango-Genressourcensammlung weiterzuentwickeln.",
        },
        {
          isCorrect: false,
          label:
            "Denarum Agrihorti besitzt einen hohen Anteil grober Fruchtfasern.",
        },
        {
          isCorrect: false,
          label: "Jede Akzession der Cukurgondang-Sammlung ist exportreif.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Local farmers created Agri Gardina 45 through selection alone.",
        },
        {
          isCorrect: false,
          label:
            "Denarum Agrihorti was selected from commercial mangoes grown in California.",
        },
        {
          isCorrect: true,
          label:
            "Researchers use both selection and crossbreeding to develop the mango germplasm collection.",
        },
        {
          isCorrect: false,
          label:
            "Denarum Agrihorti is characterized by a high amount of coarse fruit fiber.",
        },
        {
          isCorrect: false,
          label:
            "Every accession in the Cukurgondang collection is ready for export.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Petani setempat menghasilkan Agri Gardina 45 hanya melalui metode seleksi.",
        },
        {
          isCorrect: false,
          label:
            "Denarum Agrihorti diseleksi dari mangga komersial yang ditanam di California.",
        },
        {
          isCorrect: true,
          label:
            "Periset menggunakan metode seleksi dan persilangan untuk mengembangkan koleksi plasma nutfah mangga.",
        },
        {
          isCorrect: false,
          label:
            "Denarum Agrihorti memiliki serat buah kasar dalam jumlah tinggi.",
        },
        {
          isCorrect: false,
          label:
            "Setiap aksesi dalam koleksi Cukurgondang sudah siap diekspor.",
        },
      ],
    },
  },
};

export default item;
