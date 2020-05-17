/* @flow */

/**
 * compiler 目录包含 Vue.js 所有编译相关的代码。
 * 它包括把模板解析成 ast 语法树，ast 语法树优化，代码生成等功能。
 * 编译的工作可以在构建时做（借助 webpack、vue-loader 等辅助插件），也可以在运行时做。
 * 编译是一项耗性能的工作，所以更推荐前者——离线编译。
 */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
