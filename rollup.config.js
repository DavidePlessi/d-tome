import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import sourcemaps from 'rollup-plugin-sourcemaps';
import webapp from "@eusoft/webapp-compiler-rollup";
import scss from "rollup-plugin-scss";
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
      scss({ fileName: 'style.css' }),
      json(),
      resolve(),
      typescript(),

      sourcemaps()
    ]
  }
];