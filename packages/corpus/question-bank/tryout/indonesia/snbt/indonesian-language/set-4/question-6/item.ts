import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Model daur air dalam kotak transparan menyederhanakan proses agar dapat diperiksa sambil tetap memiliki batas representasi.",
        },
        {
          isCorrect: false,
          label:
            "Model daur air dalam kotak transparan membuktikan bahwa pengulangan yang sama sudah mencakup seluruh kondisi atmosfer nyata.",
        },
        {
          isCorrect: false,
          label:
            "Model daur air dalam kotak transparan hanya berguna untuk menghafal istilah kondensasi tanpa mengamati perubahan wujud air.",
        },
        {
          isCorrect: false,
          label:
            "Model daur air dalam kotak transparan menggantikan pengamatan lapangan karena lampu dan es meniru atmosfer secara lengkap.",
        },
        {
          isCorrect: false,
          label:
            "Model daur air dalam kotak transparan tidak dapat membantu memeriksa proses apa pun karena tidak sama persis dengan alam.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
