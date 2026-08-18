import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label:
        "Many young workers prefer a room near work even when its rent is slightly higher.",
      value: false,
    },
    {
      label:
        "Low rent and a short commute make a rented room more attractive to prospective tenants.",
      value: false,
    },
    {
      label:
        "In many office districts, the rent premium near work is larger than the extra transport cost from a more distant room, so the distant option has a lower total monthly cost.",
      value: true,
    },
    {
      label:
        "Young workers compare rent and transport when estimating their total monthly cost.",
      value: false,
    },
    {
      label:
        "A shorter commute reduces both travel time and the number of transport fares paid.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Banyak pekerja muda memilih kos dekat tempat kerja meskipun sewanya sedikit lebih tinggi.",
      value: false,
    },
    {
      label:
        "Sewa murah dan perjalanan singkat membuat kamar kos lebih menarik bagi calon penghuni.",
      value: false,
    },
    {
      label:
        "Di banyak kawasan perkantoran, selisih sewa kos dekat tempat kerja lebih besar daripada tambahan ongkos transportasi dari kos yang lebih jauh, sehingga biaya bulanan total kos jauh justru lebih rendah.",
      value: true,
    },
    {
      label:
        "Pekerja muda membandingkan biaya sewa dan transportasi saat menghitung biaya bulanan total.",
      value: false,
    },
    {
      label:
        "Perjalanan yang lebih singkat mengurangi waktu tempuh dan jumlah ongkos transportasi yang dibayar.",
      value: false,
    },
  ],
};

export default choices;
