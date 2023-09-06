import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://graphql.anilist.co",
  documents: ["app/**/*.tsx", "components/**/*.tsx", "components/**/*.ts"],
  generates: {
    "lib/aniList/": {
      preset: "client",
    },
  },
};

export default config;
