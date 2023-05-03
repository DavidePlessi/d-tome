import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import sourcemaps from 'rollup-plugin-sourcemaps';
import webapp from "@eusoft/webapp-compiler-rollup";
import sass from "rollup-plugin-sass";
import path from "path";

const outPath = "public/build";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: outPath + "/app.js",
        format: "esm",
        sourcemap: true,
        sourcemapPathTransform: (relativeSourcePath, sourcemapPath) => {
          return path.resolve(path.dirname(sourcemapPath), relativeSourcePath)
        },
      },
    ],
    plugins: [
      webapp(),
      sass(),
      json(),
      resolve(),
      typescript(),

      sourcemaps()
    ]
  }
];