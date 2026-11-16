import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "inheritance",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Embryos with two yellow alleles die before birth, so every yellow mouse born is heterozygous",
        },
        {
          correct: false,
          label:
            "Yellow is recessive to grey, which gives two yellow pups for every grey pup",
        },
        {
          correct: false,
          label: "One quarter of the yellow pups die soon after birth",
        },
        {
          correct: false,
          label:
            "Some of the yellow parents are homozygous, which changes the ratio",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Embrio dengan dua alel kuning mati sebelum lahir, jadi setiap tikus kuning yang dilahirkan adalah heterozigot",
        },
        {
          correct: false,
          label:
            "Kuning adalah resesif terhadap kelabu, dan ini menghasilkan dua anak kuning bagi setiap anak kelabu",
        },
        {
          correct: false,
          label:
            "Satu perempat daripada anak kuning mati sejurus selepas lahir",
        },
        {
          correct: false,
          label:
            "Sebahagian induk kuning adalah homozigot, dan ini mengubah nisbah",
        },
      ],
    },
  },
};

export default item;
