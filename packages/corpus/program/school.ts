import { LEARNING_PROGRAM_KEYS } from "#corpus/program/keys";

/** Exact official school-program rows preserved from Nakafa's source registry. */
export const schoolProgramSources = [
  {
    defaultCoverageStatus: "partial",
    displayOrder: 10,
    iconKey: "school",
    key: LEARNING_PROGRAM_KEYS.merdeka,
    kind: "school-curriculum",
    navigation: {
      levels: ["stage", "class", "subject", "topic"],
      model: "curriculum-tree",
    },
    provider: {
      homeCountry: "ID",
      kind: "official",
      name: "Kemendikdasmen",
    },
    recommendedCountry: "ID",
    sources: [
      {
        label: "Capaian Pembelajaran dan ATP",
        retrievedAt: "2026-06-14",
        reviewAfter: "2027-01-01",
        type: "official-policy",
        url: "https://guru.kemendikdasmen.go.id/kurikulum/referensi-penerapan/capaian-pembelajaran/",
      },
    ],
    translations: {
      en: { publicSlug: "merdeka", title: "Kurikulum Merdeka" },
      id: { publicSlug: "merdeka", title: "Kurikulum Merdeka" },
    },
    version: { label: "Indonesia" },
  },
  {
    defaultCoverageStatus: "planned",
    displayOrder: 20,
    iconKey: "global-education",
    key: LEARNING_PROGRAM_KEYS.cambridgeInternational,
    kind: "school-curriculum",
    navigation: {
      levels: ["stage", "course", "unit", "lesson"],
      model: "curriculum-tree",
    },
    provider: {
      homeCountry: "GB",
      kind: "official",
      name: "Cambridge International Education",
    },
    sources: [
      {
        label: "Cambridge Pathway programmes",
        retrievedAt: "2026-06-16",
        reviewAfter: "2027-12-31",
        type: "official-portal",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/",
      },
      {
        label: "Cambridge IGCSE Mathematics 0580",
        retrievedAt: "2026-06-16",
        reviewAfter: "2027-12-31",
        type: "official-portal",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-mathematics-0580/",
      },
      {
        label: "Cambridge IGCSE Mathematics 0580 syllabus 2025-2027",
        retrievedAt: "2026-06-16",
        reviewAfter: "2027-12-31",
        type: "official-blueprint",
        url: "https://www.cambridgeinternational.org/Images/662466-2025-2027-syllabus.pdf",
      },
      {
        label: "Cambridge IGCSE Biology 0610 syllabus 2026-2028",
        retrievedAt: "2026-06-16",
        reviewAfter: "2028-01-01",
        type: "official-blueprint",
        url: "https://www.cambridgeinternational.org/Images/697203-2026-2028-syllabus.pdf",
      },
      {
        label: "Cambridge IGCSE Chemistry 0620 syllabus 2026-2028",
        retrievedAt: "2026-06-16",
        reviewAfter: "2028-01-01",
        type: "official-blueprint",
        url: "https://www.cambridgeinternational.org/Images/697205-2026-2028-syllabus.pdf",
      },
      {
        label: "Cambridge IGCSE Physics 0625 syllabus 2026-2028",
        retrievedAt: "2026-06-16",
        reviewAfter: "2028-01-01",
        type: "official-blueprint",
        url: "https://www.cambridgeinternational.org/Images/697209-2026-2028-syllabus.pdf",
      },
    ],
    translations: {
      en: {
        publicSlug: "cambridge-international",
        title: "Cambridge International",
      },
      id: {
        publicSlug: "cambridge-international",
        title: "Cambridge International",
      },
    },
    version: {
      endsAt: "2027-12-31",
      label: "Cambridge Pathway",
      startsAt: "2025-01-01",
    },
  },
  {
    defaultCoverageStatus: "planned",
    displayOrder: 30,
    iconKey: "state",
    key: LEARNING_PROGRAM_KEYS.singaporeMoe,
    kind: "school-curriculum",
    navigation: {
      levels: ["stage", "course", "unit", "lesson"],
      model: "curriculum-tree",
    },
    provider: {
      homeCountry: "SG",
      kind: "official",
      name: "Ministry of Education Singapore",
    },
    recommendedCountry: "SG",
    sources: [
      {
        label: "Singapore Primary School Education",
        retrievedAt: "2026-06-16",
        reviewAfter: "2028-01-01",
        type: "official-portal",
        url: "https://www.moe.gov.sg/primary",
      },
      {
        label: "Singapore Secondary School Education",
        retrievedAt: "2026-06-16",
        reviewAfter: "2028-01-01",
        type: "official-portal",
        url: "https://www.moe.gov.sg/secondary",
      },
      {
        label: "Singapore G2/G3 Mathematics syllabuses",
        retrievedAt: "2026-06-16",
        reviewAfter: "2028-01-01",
        type: "official-blueprint",
        url: "https://www.moe.gov.sg/api/media/d415c25d-cf29-4b05-83da-9713f38edd14/2020-G2-and-G3-Mathematics-Syllabuses.pdf",
      },
      {
        label: "Singapore G2/G3 Additional Mathematics syllabuses",
        retrievedAt: "2026-06-16",
        reviewAfter: "2028-01-01",
        type: "official-blueprint",
        url: "https://www.moe.gov.sg/api/media/2155cce5-f6b4-4532-897c-c5a8fa1852c6/2020-G2-and-G3-Additional-Mathematics-Syllabuses.pdf",
      },
      {
        label: "Singapore G2/G3 Lower Secondary Science syllabus",
        retrievedAt: "2026-06-16",
        reviewAfter: "2028-01-01",
        type: "official-blueprint",
        url: "https://www.moe.gov.sg/api/media/b6d63789-2ad0-4630-b847-42fd380ec404/G2-3-Lower-Secondary-Science-Teaching-and-Learning-Syllabus.pdf",
      },
      {
        label: "Singapore Pre-university Education",
        retrievedAt: "2026-06-16",
        reviewAfter: "2028-01-01",
        type: "official-portal",
        url: "https://www.moe.gov.sg/post-secondary/a-level-curriculum-and-subject-syllabuses",
      },
    ],
    translations: {
      en: { publicSlug: "singapore-moe", title: "Singapore MOE" },
      id: { publicSlug: "singapore-moe", title: "Singapore MOE" },
    },
    version: { label: "Singapore MOE" },
  },
  {
    defaultCoverageStatus: "planned",
    displayOrder: 40,
    iconKey: "standards",
    key: LEARNING_PROGRAM_KEYS.unitedStates,
    kind: "school-curriculum",
    navigation: {
      levels: ["stage", "course", "unit", "lesson"],
      model: "curriculum-tree",
    },
    provider: {
      homeCountry: "US",
      kind: "official",
      name: "CCSSO / NGSS Lead States",
    },
    sources: [
      {
        label: "Common Core State Standards for Mathematics",
        retrievedAt: "2026-06-16",
        reviewAfter: "2028-01-01",
        type: "official-blueprint",
        url: "https://learning.ccsso.org/wp-content/uploads/2022/11/ADA-Compliant-Math-Standards.pdf",
      },
      {
        label: "Next Generation Science Standards",
        retrievedAt: "2026-06-16",
        reviewAfter: "2028-01-01",
        type: "official-portal",
        url: "https://www.nextgenscience.org/",
      },
    ],
    translations: {
      en: {
        publicSlug: "united-states",
        title: "United States Standards-Aligned Pathway",
      },
      id: {
        publicSlug: "amerika-serikat",
        title: "United States Standards-Aligned Pathway",
      },
    },
    version: { label: "K-12 standards-aligned pathway" },
  },
] as const;
