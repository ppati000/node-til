import { AsyncLocalStorage } from 'node:async_hooks'

export const asyncLocalStorage = new AsyncLocalStorage()

function logInfo(message) {
  console.log(asyncLocalStorage.getStore()?.flowStateId ?? null, message)
}

async function foo() {
  logInfo('foo start')
  await fetch('https://example.com')
  bar()
  logInfo('foo done')
}

async function bar() {
  setTimeout(() => {
    logInfo('bar done')
  }, 1000)
}

async function run(context) {
  await asyncLocalStorage.run(context, foo)
  logInfo('run done')
}

run({ flowStateId: '1234' })

run({ flowStateId: '5678' })
