import { FlatCompat } from "@eslint/eslintrc";
import { rules } from "eslint-plugin-prettier";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier", "plugin:@typescript-eslint/recommended", "plugin:react/recommended", "plugin:react/jsx-runtime"],
    settings: {
      rules: {
        indent: ["error", 2],
        quotes: ["error", "single"],
        semi: ["error", "always"],
        "prettier/prettier": "error",
        "react/display-name": "off",
        "react/no-unescaped-entities": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "@typescript-eslint/no-explicit-any": "warn",
      },
    },
    plugins: ["@typescript-eslint/eslint-plugin", "react", "prettier"],
  }),
];

export default eslintConfig;
