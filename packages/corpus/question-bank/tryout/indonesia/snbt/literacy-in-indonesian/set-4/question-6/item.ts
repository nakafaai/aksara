import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Model daur air dalam kotak transparan menyederhanakan proses agar dapat diperiksa sambil tetap memiliki batas representasi.",
        },
        {
          correct: false,
          label:
            "Model daur air dalam kotak transparan membuktikan bahwa pengulangan yang sama sudah mencakup seluruh kondisi atmosfer nyata.",
        },
        {
          correct: false,
          label:
            "Model daur air dalam kotak transparan hanya berguna untuk menghafal istilah kondensasi tanpa mengamati perubahan wujud air.",
        },
        {
          correct: false,
          label:
            "Model daur air dalam kotak transparan menggantikan pengamatan lapangan karena lampu dan es meniru atmosfer secara lengkap.",
        },
        {
          correct: false,
          label:
            "Model daur air dalam kotak transparan tidak dapat membantu memeriksa proses apa pun karena tidak sama persis dengan alam.",
        },
      ],
    },
  },
};

export default item;
