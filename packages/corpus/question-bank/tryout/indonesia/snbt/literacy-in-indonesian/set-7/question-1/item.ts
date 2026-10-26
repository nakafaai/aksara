import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Simulasi membandingkan pengaruh air bersuhu $$35$$ derajat Celsius terhadap produksi gas pada campuran ragi, sambil mengendalikan faktor yang disebutkan tetapi menjadikan satu uji singkat sebagai bukti yang berlaku umum.",
        },
        {
          correct: false,
          label:
            "Simulasi membandingkan pengaruh air bersuhu $$35$$ derajat Celsius terhadap produksi gas pada campuran ragi, sambil menyebut keterbatasan tetapi mengeluarkan kondisi pembanding dari penafsiran hasil.",
        },
        {
          correct: false,
          label:
            "Simulasi membandingkan pengaruh air bersuhu $$35$$ derajat Celsius terhadap produksi gas pada campuran ragi, sambil menjadikan definisi istilah ilmiah sebagai hasil ukur yang menutup penelitian.",
        },
        {
          correct: false,
          label:
            "Simulasi membandingkan pengaruh air bersuhu $$35$$ derajat Celsius terhadap produksi gas pada campuran ragi, sambil memakai pembanding hanya untuk mengukuhkan hipotesis awal dan menghapus ketidakpastian yang tersisa.",
        },
        {
          correct: true,
          label:
            "Percobaan membandingkan keliling balon pada tiga suhu dengan faktor lain terkontrol, lalu membatasi simpulan karena keliling hanya menjadi petunjuk kasar jumlah gas.",
        },
      ],
    },
  },
};

export default item;
