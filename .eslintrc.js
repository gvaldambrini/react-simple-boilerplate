module.exports = {
    "env": {
      "browser": true,
      "node": true,
      "jest": true,
      "es6": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      },
      "project": "./tsconfig.json",
      "tsconfigRootDir": "."
    },
    "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "react-app",
      "prettier/@typescript-eslint",
      "plugin:prettier/recommended"
    ],
    "plugins": [
        "react",
        "react-hooks",
        "@typescript-eslint"
    ],
    "rules": {
      "prettier/prettier": "error",
      "no-param-reassign": "error",
      "dot-notation": "error",
      "eqeqeq": "error",
      "no-implied-eval": "error",
      "no-invalid-this": "error",
      "no-var": "error",
      "no-use-before-define": "error",
      "spaced-comment": ["error", "always", {"markers": ["/"]}],
      "no-useless-constructor": "error",
      "prefer-const": "error",
      "max-depth": "error",
      // Disable the explicit function return type until the pr gets integrated:
      // https://github.com/typescript-eslint/typescript-eslint/issues/149
      "@typescript-eslint/explicit-function-return-type": ["off", {
        "allowTypedFunctionExpressions": true
      }],
      "react/no-string-refs": "error",
      "react/jsx-key": "error",
      "react/jsx-pascal-case": "error",
      "react/sort-comp": "error",
      "react/prefer-stateless-function": "error",
      "react/prefer-es6-class": "error",
      "react/no-direct-mutation-state": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
};